// "База данных" для тестового прототипа.
//
// Пока нет доступа к настоящей базе, данные по домам лежат прямо здесь,
// в виде массива. Когда доступ к реальной базе появится, в app.js нужно
// будет заменить функцию findHouseRecord() на запрос к вашему API
// (fetch по адресу дома) — вся остальная логика (карта, клик, извлечение
// адреса) останется без изменений.

window.HOUSE_DATA = [
  {
    city: 'Каспийск',
    street: 'Назарова',
    house: '2',

    // Договор на общедомовой прибор учёта (ОДПУ) — расход по всему дому,
    // отдельно от показаний квартирных счётчиков ниже.
    contract: {
      number: '0501563002248/3049',
      odpuNumber: '19450710',
      ktt: '60',
    },

    // Показания ОДПУ по расчётным периодам.
    commonMeterReadings: [
      {
        date: '01.09.2026',
        periodStart: '01.08.2026',
        reading: 13385,
        consumption: 249,
        extraConsumption: 0,
        totalConsumption: 14940,
      },
      {
        date: '30.06.2026',
        periodStart: '01.06.2026',
        reading: 13136,
        consumption: 165,
        extraConsumption: -13373.0,
        totalConsumption: -3473,
      },
    ],

    apartments: [
      { apt: 1,  account: '0000012169', code: '501160013554', meterType: 'Меркурий 201.6', meterNumber: '27361911', coef: 1, seal: '',         reading: 30423 },
      { apt: 2,  account: '0000012170', code: '501160013555', meterType: 'Меркурий 201.6', meterNumber: '27361904', coef: 1, seal: '',         reading: 30580 },
      { apt: 3,  account: '0000012171', code: '501160013556', meterType: 'Меркурий 201.6', meterNumber: '32890378', coef: 1, seal: '',         reading: 34422 },
      { apt: 4,  account: '0000012172', code: '501160013557', meterType: 'Меркурий 201.6', meterNumber: '32890413', coef: 1, seal: '',         reading: 26843 },
      { apt: 5,  account: '0000012173', code: '501160013558', meterType: 'Меркурий 201.6', meterNumber: '27362011', coef: 1, seal: '',         reading: 60275 },
      { apt: 6,  account: '0000012174', code: '501160013559', meterType: 'Меркурий 201.6', meterNumber: '27363074', coef: 1, seal: '0409761',  reading: 26157 },
      { apt: 7,  account: '0000012175', code: '501160013560', meterType: 'Меркурий 201.6', meterNumber: '27363068', coef: 1, seal: '',         reading: 55324 },
      { apt: 8,  account: '0000012176', code: '501160013561', meterType: 'Меркурий 201.6', meterNumber: '27361998', coef: 1, seal: '',         reading: 25762 },
      { apt: 9,  account: '0000012177', code: '501160013563', meterType: 'Меркурий 201.6', meterNumber: '27362172', coef: 1, seal: '',         reading: 8738  },
      { apt: 10, account: '0000012178', code: '501160013564', meterType: 'Меркурий 201.6', meterNumber: '27361997', coef: 1, seal: '',         reading: 15939 },
      { apt: 11, account: '0000012179', code: '501160013565', meterType: 'Меркурий 201.6', meterNumber: '27361905', coef: 1, seal: '',         reading: 17180 },
      { apt: 12, account: '0000012180', code: '501160013566', meterType: 'Меркурий 201.6', meterNumber: '27361993', coef: 1, seal: '',         reading: 22149 },
      { apt: 13, account: '0000012181', code: '501160013567', meterType: 'Меркурий 201.6', meterNumber: '27360735', coef: 1, seal: '',         reading: 23359 },
      { apt: 14, account: '0000012182', code: '501160013568', meterType: 'Меркурий 201.6', meterNumber: '27361994', coef: 1, seal: '',         reading: 25848 },
      { apt: 15, account: '0000012183', code: '501160013569', meterType: 'Меркурий 201.6', meterNumber: '27361983', coef: 1, seal: '',         reading: 35125 },
      { apt: 16, account: '0000012184', code: '501160013570', meterType: 'Меркурий 201.6', meterNumber: '27363073', coef: 1, seal: '',         reading: 16103 },
      { apt: 17, account: '0000012185', code: '501160013571', meterType: 'Меркурий 201.6', meterNumber: '27361901', coef: 1, seal: '',         reading: 18946 },
      { apt: 18, account: '0000012186', code: '501160013572', meterType: 'Меркурий 201.6', meterNumber: '27361977', coef: 1, seal: '',         reading: 18264 },
      { apt: 19, account: '0000012187', code: '501160013573', meterType: 'Меркурий 201.6', meterNumber: '27362170', coef: 1, seal: '',         reading: 14633 },
      { apt: 20, account: '0000012188', code: '501160013574', meterType: 'Меркурий 201.6', meterNumber: '27361987', coef: 1, seal: '',         reading: 21719 },
      { apt: 21, account: '0000012189', code: '501160013575', meterType: 'Меркурий 201.6', meterNumber: '27363069', coef: 1, seal: '',         reading: 33929 },
      { apt: 22, account: '0000012190', code: '501160013576', meterType: 'Меркурий 201.6', meterNumber: '27361912', coef: 1, seal: '',         reading: 54823 },
      { apt: 23, account: '0000012191', code: '501160013562', meterType: 'Меркурий 201.6', meterNumber: '27362015', coef: 1, seal: '',         reading: 4417  },
      { apt: 24, account: '0000012192', code: '501160013577', meterType: 'Меркурий 201.6', meterNumber: '27361916', coef: 1, seal: '',         reading: 28377 },
    ],
  },
  {
    city: 'Каспийск',
    street: 'Назарова',
    house: '4',

    // Показания квартирных счётчиков (данные с бланка «Объём по
    // показаниям прибора учёта»). Поля отделения, поставщика услуг,
    // насел. пункта и признака «умного» счётчика из бланка не переносим —
    // их нет в схеме этой базы.
    apartments: [
      { apt: 1,     account: '0000012193', code: '501180015331', meterType: 'Меркурий 201.6', meterNumber: '29222647', coef: 1, seal: '', reading: 44112 },
      { apt: '2А',  account: '0000012194', code: '501160015330', meterType: 'Меркурий 201.6', meterNumber: '29489322', coef: 1, seal: '', reading: 12584 },
      { apt: '2Б',  account: '0000012195', code: '501160015329', meterType: 'Меркурий 201.6', meterNumber: '29489363', coef: 1, seal: '', reading: 507   },
      { apt: 3,     account: '0000012196', code: '501160015328', meterType: 'Меркурий 201.6', meterNumber: '29489346', coef: 1, seal: '', reading: 18684 },
      { apt: 4,     account: '0000012197', code: '501160015327', meterType: 'Меркурий 201.6', meterNumber: '29489347', coef: 1, seal: '', reading: 28917 },
      { apt: 5,     account: '0000012198', code: '501160015326', meterType: 'Меркурий 201.6', meterNumber: '29489335', coef: 1, seal: '', reading: 26892 },
      { apt: 6,     account: '0000012199', code: '501160015325', meterType: 'Меркурий 201.6', meterNumber: '29489352', coef: 1, seal: '', reading: 11371 },
      { apt: 7,     account: '0000012200', code: '501160015324', meterType: 'Меркурий 201.6', meterNumber: '42812166', coef: 1, seal: '', reading: 13930 },
      { apt: 8,     account: '0000012201', code: '501160015323', meterType: 'Меркурий 201.6', meterNumber: '42812318', coef: 1, seal: '', reading: 10315 },
      { apt: 11,    account: '0000012204', code: '501160015322', meterType: 'Меркурий 201.6', meterNumber: '43996275', coef: 1, seal: '', reading: 7782  },
      { apt: 12,    account: '0000012205', code: '501160015321', meterType: 'Меркурий 201.6', meterNumber: '43996282', coef: 1, seal: '', reading: 9290  },
      { apt: '13А', account: '0000012206', code: '501160015320', meterType: 'Меркурий 201.6', meterNumber: '42812492', coef: 1, seal: '', reading: 37105 },
      { apt: 14,    account: '0000012207', code: '501160015319', meterType: 'Меркурий 201.6', meterNumber: '42812231', coef: 1, seal: '', reading: 4675  },
      { apt: 15,    account: '0000012208', code: '501160015318', meterType: 'Меркурий 201.6', meterNumber: '42812203', coef: 1, seal: '', reading: 12949 },
      { apt: 16,    account: '0000012209', code: '501160015317', meterType: 'Меркурий 201.6', meterNumber: '29489374', coef: 1, seal: '', reading: 27659 },
      { apt: 17,    account: '0000012210', code: '501160015315', meterType: 'Меркурий 201.6', meterNumber: '29489676', coef: 1, seal: '', reading: 36683 },
      { apt: 18,    account: '0000012211', code: '501160015314', meterType: 'Меркурий 201.6', meterNumber: '29489693', coef: 1, seal: '', reading: 17822 },
      { apt: 19,    account: '0000012212', code: '501160015313', meterType: 'Меркурий 201.6', meterNumber: '29489711', coef: 1, seal: '', reading: 13095 },
      // Показание кв. 20 обрезано снизу на фото ("718..."), нужна проверка.
      { apt: 20,    account: '0000012213', code: '501160015312', meterType: 'Меркурий 201.6', meterNumber: '29489674', coef: 1, seal: '', reading: 718 },
      { apt: 21,    account: '0000012214', code: '501160015311', meterType: 'Меркурий 201.6', meterNumber: '29489689', coef: 1, seal: '', reading: 13906 },
      { apt: 22,    account: '0000012215', code: '501160026091', meterType: 'Меркурий 201.6', meterNumber: '29229763', coef: 1, seal: '', reading: 11862 },
      { apt: 23,    account: '0000012216', code: '501160015310', meterType: 'Меркурий 201.6', meterNumber: '30720435', coef: 1, seal: '', reading: 27966 },
      { apt: 24,    account: '0000012217', code: '501160015309', meterType: 'Меркурий 201.6', meterNumber: '31037062', coef: 1, seal: '', reading: 18679 },
      { apt: 25,    account: '0000012218', code: '501160015308', meterType: 'Меркурий 201.6', meterNumber: '30720516', coef: 1, seal: '', reading: 11979 },
      { apt: 26,    account: '0000012219', code: '501160015307', meterType: 'Меркурий 201.6', meterNumber: '31037114', coef: 1, seal: '', reading: 15556 },
      { apt: 27,    account: '0000012220', code: '501160015305', meterType: 'Меркурий 201.6', meterNumber: '30011503', coef: 1, seal: '', reading: 17997 },
      { apt: 29,    account: '0000012222', code: '501160015306', meterType: 'Меркурий 201.6', meterNumber: '30011525', coef: 1, seal: '', reading: 20213 },
      { apt: 30,    account: '0000012223', code: '501160015304', meterType: 'Меркурий 201.6', meterNumber: '30720412', coef: 1, seal: '', reading: 12174 },
      { apt: 31,    account: '0000012224', code: '501160015303', meterType: 'Меркурий 201.6', meterNumber: '30718903', coef: 1, seal: '', reading: 13608 },
      { apt: 32,    account: '0000012225', code: '501160015302', meterType: 'Меркурий 201.6', meterNumber: '30720418', coef: 1, seal: '', reading: 15152 },
      { apt: 33,    account: '0000012226', code: '501160015301', meterType: 'Меркурий 201.6', meterNumber: '30718908', coef: 1, seal: '', reading: 23827 },
      { apt: 34,    account: '0000012227', code: '501160015300', meterType: 'Меркурий 201.6', meterNumber: '29489945', coef: 1, seal: '', reading: 8525  },
      { apt: 36,    account: '0000012229', code: '501160015299', meterType: 'Меркурий 201.6', meterNumber: '29489974', coef: 1, seal: '', reading: 7287  },
      { apt: 37,    account: '0000012230', code: '501160015298', meterType: 'Меркурий 201.6', meterNumber: '29489989', coef: 1, seal: '', reading: 23899 },
      { apt: 38,    account: '0000012231', code: '501160015297', meterType: 'Меркурий 201.6', meterNumber: '29489980', coef: 1, seal: '', reading: 31682 },
      { apt: 39,    account: '0000012232', code: '501160015296', meterType: 'Меркурий 201.6', meterNumber: '29489714', coef: 1, seal: '', reading: 31255 },
      { apt: 40,    account: '0000012233', code: '501160015295', meterType: 'Меркурий 201.6', meterNumber: '30720355', coef: 1, seal: '', reading: 13157 },
      { apt: 41,    account: '0000012234', code: '501160015294', meterType: 'Меркурий 201.6', meterNumber: '30720410', coef: 1, seal: '', reading: 17303 },
      { apt: '42А', account: '0000012235', code: '501160043021', meterType: 'Меркурий 201.6', meterNumber: '31037045', coef: 1, seal: '', reading: 12203 },
      { apt: '42Б', account: '0000012236', code: '501160043020', meterType: 'Меркурий 201.6', meterNumber: '30720521', coef: 1, seal: '', reading: 11931 },
      { apt: 43,    account: '0000012237', code: '501160015293', meterType: 'Меркурий 201.6', meterNumber: '31037129', coef: 1, seal: '', reading: 7420  },
      { apt: 44,    account: '0000012238', code: '501160015292', meterType: 'Меркурий 201.6', meterNumber: '30720522', coef: 1, seal: '', reading: 9434  },
      { apt: 45,    account: '0000012239', code: '501160015291', meterType: 'Меркурий 201.6', meterNumber: '30719392', coef: 1, seal: '', reading: 13649 },
      { apt: 49,    account: '0000680338', code: '501160015285', meterType: 'Меркурий 201.6', meterNumber: '32890385', coef: 1, seal: '', reading: 4148  },
      { apt: '49Б', account: '0000012242', code: '501160034972', meterType: 'Меркурий 201.6', meterNumber: '07337957', coef: 1, seal: '3745590', reading: 9324 },
      { apt: 50,    account: '0000012243', code: '501160015289', meterType: 'Меркурий 201.6', meterNumber: '32890158', coef: 1, seal: '', reading: 17607 },
      { apt: 51,    account: '0000012244', code: '501160015288', meterType: 'Меркурий 201.6', meterNumber: '32890672', coef: 1, seal: '', reading: 14537 },
      { apt: 52,    account: '0000012245', code: '501160015287', meterType: 'Меркурий 201.6', meterNumber: '29490001', coef: 1, seal: '', reading: 17152 },
      { apt: 53,    account: '0000012246', code: '501160015286', meterType: 'Меркурий 201.6', meterNumber: '29490002', coef: 1, seal: '', reading: 17116 },
      { apt: '54А', account: '0000012247', code: '501160034971', meterType: 'Меркурий 201.6', meterNumber: '29490011', coef: 1, seal: '', reading: 19204 },
    ],

    // Коммерческие помещения (магазины/ИП) с подчинёнными счётчиками —
    // не у каждого дома есть, поэтому это отдельный, необязательный блок.
    commercialUnits: [
      { account: '20511', meterNumber: '42812477', dateFrom: '01.08.2025', dateTo: '09.05.2045', connectionType: 'Счётчик подчинённый', contract: 'Д021346 Салон красоты Эстель' },
      { account: '22762', meterNumber: '36038160', dateFrom: '01.08.2025', dateTo: '09.05.2045', connectionType: 'Счётчик подчинённый', contract: '0501563001823/2031 ИП Ибрагимова Бенисе Хайрбекова' },
      { account: '22543', meterNumber: '28222647', dateFrom: '01.08.2025', dateTo: '09.05.2045', connectionType: 'Счётчик подчинённый', contract: 'Д020825 Магазин Ethnoroom' },
      { account: '19161', meterNumber: '29489995', dateFrom: '01.08.2025', dateTo: '09.05.2045', connectionType: 'Счётчик подчинённый', contract: '0501563001278/1051 ИП Рабаданов Абдурашид Абдурагимович' },
      { account: '20525', meterNumber: '27363070', dateFrom: '01.08.2025', dateTo: '09.05.2045', connectionType: 'Счётчик подчинённый', contract: '0501563001656/1636 ИП Асабутаев Магомедали Разакович' },
      { account: '22791', meterNumber: '36037931', dateFrom: '01.08.2025', dateTo: '09.05.2045', connectionType: 'Счётчик подчинённый', contract: 'Д021913 ИП Ибрагимова Бенисе Хайрбекова' },
    ],
  },
];
