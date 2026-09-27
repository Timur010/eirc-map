(function () {
  'use strict';

  const cfg = window.APP_CONFIG || {};
  const $ = (id) => document.getElementById(id);

  // ---------- Фото домов/счётчиков (Cloudinary + Firestore) ----------

  // Сами фото хранятся в Cloudinary (через unsigned upload preset —
  // загрузка прямо из браузера, без сервера). Firestore хранит только
  // связку "лицевой счёт -> ссылки на фото" (документ на каждый счёт
  // в коллекции "photos", поле urls — массив ссылок).
  let photosCollection = null;
  if (window.firebase && window.FIREBASE_CONFIG) {
    try {
      firebase.initializeApp(window.FIREBASE_CONFIG);
      photosCollection = firebase.firestore().collection('photos');
    } catch (err) {
      console.error('Не удалось инициализировать Firebase:', err);
    }
  }

  const cloudinaryCfg = window.CLOUDINARY_CONFIG || {};

  function photoCellHtml(account) {
    return (
      '<td class="photo-cell">' +
      '<button type="button" class="photo-add-btn" data-account="' + account + '" title="Добавить фото">+ 📷</button>' +
      '<span class="photo-thumbs" data-account-thumbs="' + account + '"></span>' +
      '</td>'
    );
  }

  function renderThumbs(account, urls) {
    const span = document.querySelector('[data-account-thumbs="' + account + '"]');
    if (!span) return;
    span.innerHTML = urls
      .map(
        (url) =>
          '<a href="' + url + '" target="_blank" rel="noopener">' +
          '<img src="' + url + '" class="photo-thumb" alt="Фото">' +
          '</a>'
      )
      .join('');
  }

  // Подгружает миниатюры для уже отрисованных строк (по списку лиц. счетов).
  function loadPhotosForAccounts(accounts) {
    if (!photosCollection) return;
    accounts.forEach((account) => {
      photosCollection
        .doc(String(account))
        .get()
        .then((doc) => {
          const urls = (doc.exists && doc.data().urls) || [];
          renderThumbs(account, urls);
        })
        .catch((err) => {
          console.error('Не удалось получить список фото для счёта ' + account + ':', err);
        });
    });
  }

  function uploadPhoto(account, file) {
    const span = document.querySelector('[data-account-thumbs="' + account + '"]');
    if (span) {
      span.insertAdjacentHTML('beforeend', '<span class="photo-uploading">Загрузка…</span>');
    }

    if (!cloudinaryCfg.cloudName || !cloudinaryCfg.uploadPreset) {
      showNotice('Фото не настроено (нет конфигурации Cloudinary).');
      const uploading = span && span.querySelector('.photo-uploading');
      if (uploading) uploading.remove();
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryCfg.uploadPreset);

    fetch('https://api.cloudinary.com/v1_1/' + cloudinaryCfg.cloudName + '/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((resp) => {
        if (!resp.ok) throw new Error('Cloudinary ответил ' + resp.status);
        return resp.json();
      })
      .then((data) => {
        if (!photosCollection) throw new Error('нет связи с Firestore');
        return photosCollection.doc(String(account)).set(
          { urls: firebase.firestore.FieldValue.arrayUnion(data.secure_url) },
          { merge: true }
        );
      })
      .then(() => {
        loadPhotosForAccounts([account]);
      })
      .catch((err) => {
        console.error(err);
        showNotice('Не удалось загрузить фото: ' + (err && err.message ? err.message : err));
        const uploading = span && span.querySelector('.photo-uploading');
        if (uploading) uploading.remove();
      });
  }

  let pendingPhotoAccount = null;

  function initPhotoUpload() {
    const input = $('photo-file-input');
    if (!input) return;

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.photo-add-btn');
      if (!btn) return;
      pendingPhotoAccount = btn.dataset.account;
      input.click();
    });

    input.addEventListener('change', () => {
      const file = input.files[0];
      const account = pendingPhotoAccount;
      input.value = '';
      if (!file || !account) return;
      uploadPhoto(account, file);
    });
  }

  initPhotoUpload();

  // ---------- Вывод в панель ----------

  function showNotice(text) {
    const el = $('notice');
    el.textContent = text;
    el.hidden = !text;
  }

  function showInfo(address) {
    $('hint').hidden = true;
    $('info').hidden = false;
    $('info-address').textContent = address;
  }

  function setDataStatus(text) {
    $('info-data-status').textContent = text;
  }

  function hideTable() {
    $('info-table-wrap').hidden = true;
    $('info-table-body').innerHTML = '';
  }

  function showTable(apartments) {
    const body = $('info-table-body');
    body.innerHTML = apartments
      .map(
        (a) =>
          '<tr>' +
          '<td>' + a.apt + '</td>' +
          '<td>' + a.account + '</td>' +
          '<td>' + a.code + '</td>' +
          '<td>' + a.meterType + '</td>' +
          '<td>' + a.meterNumber + '</td>' +
          '<td>' + a.reading + '</td>' +
          photoCellHtml(a.account) +
          '</tr>'
      )
      .join('');
    $('info-table-summary').textContent = 'Квартир: ' + apartments.length;
    $('info-table-wrap').hidden = false;
    loadPhotosForAccounts(apartments.map((a) => a.account));
  }

  function hideHouseInfo() {
    $('house-info-block').hidden = true;
  }

  function showHouseInfo(info) {
    if (!info) {
      hideHouseInfo();
      return;
    }

    $('house-info-summary').textContent = info.houseType || '—';
    $('house-info-type').textContent = info.houseType || '—';
    $('house-info-cadastre').textContent = info.cadastreNumber || '—';
    $('house-info-floors').textContent = info.floors || '—';
    $('house-info-premises').textContent =
      (info.residentialPremises != null ? info.residentialPremises : '—') +
      ' / ' +
      (info.nonresidentialPremises != null ? info.nonresidentialPremises : '—');
    $('house-info-management').textContent = info.managementOrg || '—';

    $('house-info-block').hidden = false;
  }

  function hideCommercial() {
    $('commercial-block').hidden = true;
    $('commercial-table-body').innerHTML = '';
  }

  function showCommercial(units) {
    if (!units || !units.length) {
      hideCommercial();
      return;
    }

    $('commercial-summary').textContent = 'Помещений: ' + units.length;

    const body = $('commercial-table-body');
    body.innerHTML = units
      .map(
        (u) =>
          '<tr>' +
          '<td>' + u.account + '</td>' +
          '<td>' + u.meterNumber + '</td>' +
          '<td>' + u.connectionType + '</td>' +
          '<td>' + u.dateFrom + ' — ' + u.dateTo + '</td>' +
          '<td>' + u.contract + '</td>' +
          photoCellHtml(u.account) +
          '</tr>'
      )
      .join('');

    $('commercial-block').hidden = false;
    loadPhotosForAccounts(units.map((u) => u.account));
  }

  function hideContract() {
    $('contract-block').hidden = true;
    $('common-meter-table-body').innerHTML = '';
  }

  // Полный сброс панели к начальному состоянию (используется кнопкой
  // «Сбросить выбор»).
  function resetInfoPanel() {
    $('info').hidden = true;
    $('hint').hidden = false;
    showNotice('');
    hideTable();
    hideContract();
    hideCommercial();
    hideHouseInfo();
  }

  function showContract(contract, readings) {
    if (!contract) {
      hideContract();
      return;
    }

    $('contract-summary').textContent = '№ ' + contract.number;
    $('contract-odpu-number').textContent = contract.odpuNumber;
    $('contract-ktt').textContent = contract.ktt;

    const body = $('common-meter-table-body');
    body.innerHTML = (readings || [])
      .map(
        (r) =>
          '<tr>' +
          '<td>' + r.date + '</td>' +
          '<td>' + r.periodStart + '</td>' +
          '<td>' + r.reading + '</td>' +
          '<td>' + r.consumption + '</td>' +
          '<td>' + r.extraConsumption + '</td>' +
          '<td>' + r.totalConsumption + '</td>' +
          '</tr>'
      )
      .join('');

    $('contract-block').hidden = false;
  }

  // ---------- Поиск дома в (тестовой) базе данных ----------

  // Слова-обозначения ("улица", "дом" и т.п.), которые нужно отбросить при
  // сравнении адресов. Раньше здесь была регулярка с \b — в JS она не видит
  // границ слов в кириллице, поэтому такие слова не отрезались. Фильтруем
  // по отдельным словам вместо этого — так надёжно работает с любым языком.
  const ADDRESS_STOP_WORDS = new Set([
    'город', 'г', 'город.', 'г.',
    'улица', 'ул', 'ул.',
    'дом', 'д', 'д.',
    'корпус', 'корп', 'к', 'к.',
    'строение', 'стр', 'стр.',
  ]);

  function normalizeText(s) {
    return (s || '')
      .toLowerCase()
      .replace(/[«»"']/g, '')
      .split(/[\s,.]+/)
      .filter((word) => word && !ADDRESS_STOP_WORDS.has(word))
      .join(' ')
      .trim();
  }

  function getComponent(components, kind) {
    const found = (components || []).find((c) => c.kind === kind);
    return found ? found.name : '';
  }

  // Ищет дом в window.HOUSE_DATA по городу/улице/номеру дома.
  // Когда появится доступ к настоящей базе, эту функцию можно заменить
  // на async-запрос к API (fetch), а вызывающий код менять не придётся.
  function findHouseRecord(city, street, houseNumber) {
    const nCity = normalizeText(city);
    const nStreet = normalizeText(street);
    const nHouse = normalizeText(houseNumber);
    return (window.HOUSE_DATA || []).find(
      (r) =>
        normalizeText(r.city) === nCity &&
        normalizeText(r.street) === nStreet &&
        normalizeText(r.house) === nHouse
    );
  }

  // Ищет общие данные о доме (ГИС ЖКХ) — источник отдельный от
  // HOUSE_DATA и может найтись даже для дома без показаний счётчиков.
  function findHouseInfo(city, street, houseNumber) {
    const nCity = normalizeText(city);
    const nStreet = normalizeText(street);
    const nHouse = normalizeText(houseNumber);
    return (window.HOUSE_INFO_DATA || []).find(
      (r) =>
        normalizeText(r.city) === nCity &&
        normalizeText(r.street) === nStreet &&
        normalizeText(r.house) === nHouse
    );
  }

  // ---------- Определение адреса по координатам (HTTP Геокодер) ----------

  // Обращаемся к геокодеру напрямую (не через ymaps.geocode), потому что
  // в новом кабинете Яндекса «JavaScript API» и «API Геокодера» — разные
  // продукты с разными ключами, и ключ карты геокодировать не умеет.
  async function geocodeByCoords(coords) {
    const [lat, lon] = coords;
    const url =
      'https://geocode-maps.yandex.ru/1.x/?format=json&kind=house&results=1' +
      '&apikey=' + encodeURIComponent(cfg.YANDEX_GEOCODER_API_KEY) +
      '&geocode=' + lon + ',' + lat; // геокодер ждёт координаты в порядке "долгота,широта"

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error('HTTP Геокодер ответил ' + resp.status);
    }
    const data = await resp.json();
    const member = data.response.GeoObjectCollection.featureMember[0];
    if (!member) return null;

    const geoObject = member.GeoObject;
    const meta = geoObject.metaDataProperty.GeocoderMetaData;
    const pos = geoObject.Point.pos.split(' ').map(Number); // [долгота, широта]

    return {
      address: (meta.Address && meta.Address.formatted) || meta.text || geoObject.name,
      coords: [pos[1], pos[0]], // переводим в [широта, долгота]
      kind: meta.kind,
      precision: meta.precision,
      components: (meta.Address && meta.Address.Components) || [],
    };
  }

  // Прямое геокодирование: текст адреса → координаты (для поля поиска).
  async function geocodeByAddress(text) {
    const url =
      'https://geocode-maps.yandex.ru/1.x/?format=json&results=1' +
      '&apikey=' + encodeURIComponent(cfg.YANDEX_GEOCODER_API_KEY) +
      '&geocode=' + encodeURIComponent(text);

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error('HTTP Геокодер ответил ' + resp.status);
    }
    const data = await resp.json();
    const member = data.response.GeoObjectCollection.featureMember[0];
    if (!member) return null;

    const geoObject = member.GeoObject;
    const meta = geoObject.metaDataProperty.GeocoderMetaData;
    const pos = geoObject.Point.pos.split(' ').map(Number); // [долгота, широта]

    return {
      address: (meta.Address && meta.Address.formatted) || meta.text || geoObject.name,
      coords: [pos[1], pos[0]],
      kind: meta.kind,
      precision: meta.precision,
      components: (meta.Address && meta.Address.Components) || [],
    };
  }

  // ---------- Загрузка API Яндекс.Карт ----------

  const noKey = !cfg.YANDEX_JS_API_KEY || cfg.YANDEX_JS_API_KEY.indexOf('ВСТАВЬТЕ') === 0;
  if (noKey) {
    showNotice('Не указан API-ключ Яндекс.Карт. Откройте config.js и вставьте ключ в YANDEX_JS_API_KEY.');
    return;
  }

  const script = document.createElement('script');
  script.src =
    'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + encodeURIComponent(cfg.YANDEX_JS_API_KEY);
  script.onload = () => ymaps.ready(init);
  script.onerror = () =>
    showNotice('Не удалось загрузить Яндекс.Карты. Проверьте интернет и API-ключ.');
  document.head.appendChild(script);

  // ---------- Карта ----------

  function init() {
    const map = new ymaps.Map(
      'map',
      {
        center: cfg.MAP_CENTER,
        zoom: cfg.MAP_ZOOM,
        controls: ['zoomControl', 'geolocationControl', 'typeSelector'],
      },
      { suppressMapOpenBlock: true }
    );

    let marker = null;
    let lastRequest = 0; // чтобы старый ответ не перезаписал новый при быстрых кликах

    function setMarker(coords) {
      if (marker) {
        marker.geometry.setCoordinates(coords);
      } else {
        marker = new ymaps.Placemark(coords, {}, { preset: 'islands#redDotIcon' });
        map.geoObjects.add(marker);
      }
    }

    // ---------- Сброс выбранного дома ----------

    const clearBtn = $('clear-btn');
    clearBtn.addEventListener('click', () => {
      lastRequest++; // отменяем любой запрос, который ещё выполняется
      if (marker) {
        map.geoObjects.remove(marker);
        marker = null;
      }
      searchInput.value = '';
      resetInfoPanel();
    });

    // ---------- Поиск по адресу (своя форма вместо searchControl) ----------

    const searchForm = $('search-form');
    const searchInput = $('search-input');

    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = searchInput.value.trim();
      if (!text) return;

      const requestId = ++lastRequest;
      showNotice('');
      showInfo('Ищу адрес…');

      try {
        const house = await geocodeByAddress(text);
        if (requestId !== lastRequest) return;

        if (!house) {
          showInfo('Не найдено');
          showNotice('Ничего не нашлось по такому запросу. Попробуйте точнее указать адрес.');
          return;
        }

        map.setCenter(house.coords, house.kind === 'house' ? 17 : 15, { duration: 300 });
        setMarker(house.coords);
        showInfo(house.address);

        if (house.kind !== 'house') {
          showNotice('Это не отдельный дом — приблизьте карту и кликните по нужному зданию.');
        } else {
          showNotice('');
        }

        onHouseSelected(house);
      } catch (err) {
        if (requestId !== lastRequest) return;
        console.error(err);
        showInfo('Ошибка');
        const detail = (err && (err.message || err.toString())) || 'неизвестная ошибка';
        showNotice('Не удалось найти адрес через HTTP Геокодер. Текст ошибки: ' + detail);
      }
    });

    map.events.add('click', async (e) => {
      const clicked = e.get('coords');
      const requestId = ++lastRequest;

      setMarker(clicked);
      showNotice('');
      showInfo('Определяю адрес…');

      try {
        const house = await geocodeByCoords(clicked);
        if (requestId !== lastRequest) return;

        if (!house) {
          showInfo('Адрес не найден');
          showNotice('В этой точке дом не найден. Попробуйте нажать ближе к зданию.');
          return;
        }

        setMarker(house.coords);
        showInfo(house.address);

        if (house.kind !== 'house') {
          showNotice('Найден не дом, а другой объект. Нажмите точнее на здание.');
        } else {
          showNotice('');
        }

        onHouseSelected(house);
      } catch (err) {
        if (requestId !== lastRequest) return;
        console.error(err);
        showInfo('Ошибка');
        const detail = (err && (err.message || err.toString())) || 'неизвестная ошибка';
        showNotice('Не удалось определить адрес через HTTP Геокодер. Текст ошибки: ' + detail);
      }
    });
  }

  // ---------- Точка расширения ----------

  // Сюда позже подключим настоящую базу данных вместо window.HOUSE_DATA:
  // по house.address (или house.components) найти данные дома и показать их на карте.
  function onHouseSelected(house) {
    console.log('Выбран дом:', house);

    const city = getComponent(house.components, 'locality');
    const street = getComponent(house.components, 'street');
    const houseNumber = getComponent(house.components, 'house');

    const record = findHouseRecord(city, street, houseNumber);
    const houseInfo = findHouseInfo(city, street, houseNumber);

    if (record) {
      setDataStatus('Найдено квартир: ' + record.apartments.length);
      showTable(record.apartments);
      showContract(record.contract, record.commonMeterReadings);
      showCommercial(record.commercialUnits);
    } else {
      setDataStatus('В тестовой базе нет показаний счётчиков для этого дома (пока они есть только для Каспийск, ул. Назарова, 2 и 4).');
      hideTable();
      hideContract();
      hideCommercial();
    }

    showHouseInfo(houseInfo);
  }
})();
