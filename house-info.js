// Общие данные о домах по ул. Назарова из ГИС ЖКХ (кадастр, этажность,
// количество помещений, управляющая компания). Это отдельный источник —
// он не привязан к показаниям счётчиков из house-data.js и может быть
// как у дома с данными по квартирам, так и у дома без них.
//
// Когда появится доступ к настоящей базе, findHouseInfo() в app.js можно
// будет заменить на запрос к API — остальной код не изменится.

window.HOUSE_INFO_DATA = [
  { city: 'Каспийск', street: 'Назарова', house: '1',  houseType: 'Многоквартирный', cadastreNumber: '05:48:000037:4047',  floors: '1', residentialPremises: 170, nonresidentialPremises: 0,    managementOrg: 'ООО "УК МЕРИДИАН ЭКОСЕРВИС"' },
  { city: 'Каспийск', street: 'Назарова', house: '2',  houseType: 'Многоквартирный', cadastreNumber: '05:48:000037:4070',  floors: '3', residentialPremises: 24,  nonresidentialPremises: 0,    managementOrg: 'ООО "УК "МЕРИДИАН"' },
  { city: 'Каспийск', street: 'Назарова', house: '2А', houseType: 'Многоквартирный', cadastreNumber: '05:48:000037:19444', floors: '9', residentialPremises: 34,  nonresidentialPremises: 1,    managementOrg: 'ООО УК "ПРИОРИТЕТ"' },
  { city: 'Каспийск', street: 'Назарова', house: '3А', houseType: 'Жилой',           cadastreNumber: '05:48:000037:19268', floors: '2', residentialPremises: null, nonresidentialPremises: null, managementOrg: null },
  { city: 'Каспийск', street: 'Назарова', house: '4',  houseType: 'Многоквартирный', cadastreNumber: '05:48:000037:4106',  floors: '3', residentialPremises: 54,  nonresidentialPremises: 3,    managementOrg: 'ООО "УК "МЕРИДИАН"' },
  { city: 'Каспийск', street: 'Назарова', house: '5',  houseType: 'Многоквартирный', cadastreNumber: '05:48:000037:15704', floors: '2', residentialPremises: 15,  nonresidentialPremises: 0,    managementOrg: 'ООО УК "ЕДИНЕНИЕ"' },
  // По д. 6 в исходных данных ГИС ЖКХ две записи с разным числом помещений
  // (46 и 51) — похоже на дублирование записи в самой ГИС ЖКХ. Оставил
  // обе, показываться будет первая совпавшая по адресу.
  { city: 'Каспийск', street: 'Назарова', house: '6',  houseType: 'Многоквартирный', cadastreNumber: '05:48:000037:4019',  floors: '4', residentialPremises: 51,  nonresidentialPremises: 0,    managementOrg: 'ООО УК "КОЛИБРИ"' },
  { city: 'Каспийск', street: 'Назарова', house: '6',  houseType: 'Многоквартирный', cadastreNumber: null,                 floors: '4', residentialPremises: 46,  nonresidentialPremises: 0,    managementOrg: 'ООО УК "КОЛИБРИ"' },
  { city: 'Каспийск', street: 'Назарова', house: '7',  houseType: 'Многоквартирный', cadastreNumber: '05:48:000037:4118',  floors: '2', residentialPremises: 8,   nonresidentialPremises: 0,    managementOrg: 'ООО УК "ЕДИНЕНИЕ"' },
  { city: 'Каспийск', street: 'Назарова', house: '7А', houseType: 'Жилой',           cadastreNumber: null,                 floors: null, residentialPremises: null, nonresidentialPremises: null, managementOrg: null },
  { city: 'Каспийск', street: 'Назарова', house: '9',  houseType: 'Жилой',           cadastreNumber: '05:48:000037:4137',  floors: '1', residentialPremises: null, nonresidentialPremises: null, managementOrg: null },
];
