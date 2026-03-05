// Периодическая таблица Менделеева - короткая форма (8 групп)
// row - период (1-7), col - группа (1-8)
// Ряды 8-9 - лантаноиды и актиноиды

const allElements = [
  // Период 1
  {n:1,sym:'H',name:'Водород',mass:'1.008',type:'nonmetal',row:1,col:1,fact:'Самый лёгкий элемент во Вселенной'},
  {n:2,sym:'He',name:'Гелий',mass:'4.003',type:'noble',row:1,col:8,fact:'Обнаружен сначала на Солнце'},
  
  // Период 2
  {n:3,sym:'Li',name:'Литий',mass:'6.94',type:'metal',row:2,col:1,fact:'Самый лёгкий металл'},
  {n:4,sym:'Be',name:'Бериллий',mass:'9.012',type:'metal',row:2,col:2,fact:'Токсичен, используется в аэрокосмике'},
  {n:5,sym:'B',name:'Бор',mass:'10.81',type:'semi',row:2,col:3,fact:'Важен для растений'},
  {n:6,sym:'C',name:'Углерод',mass:'12.011',type:'nonmetal',row:2,col:4,fact:'Основа жизни'},
  {n:7,sym:'N',name:'Азот',mass:'14.007',type:'nonmetal',row:2,col:5,fact:'78% атмосферы Земли'},
  {n:8,sym:'O',name:'Кислород',mass:'15.999',type:'nonmetal',row:2,col:6,fact:'21% воздуха'},
  {n:9,sym:'F',name:'Фтор',mass:'18.998',type:'nonmetal',row:2,col:7,fact:'Самый реактивный элемент'},
  {n:10,sym:'Ne',name:'Неон',mass:'20.180',type:'noble',row:2,col:8,fact:'Красно-оранжевое свечение'},
  
  // Период 3
  {n:11,sym:'Na',name:'Натрий',mass:'22.990',type:'metal',row:3,col:1,fact:'Реагирует с водой со взрывом'},
  {n:12,sym:'Mg',name:'Магний',mass:'24.305',type:'metal',row:3,col:2,fact:'Горит белым пламенем'},
  {n:13,sym:'Al',name:'Алюминий',mass:'26.982',type:'metal',row:3,col:3,fact:'Самый распространённый металл'},
  {n:14,sym:'Si',name:'Кремний',mass:'28.085',type:'semi',row:3,col:4,fact:'Основа электроники'},
  {n:15,sym:'P',name:'Фосфор',mass:'30.974',type:'nonmetal',row:3,col:5,fact:'Светится в темноте'},
  {n:16,sym:'S',name:'Сера',mass:'32.06',type:'nonmetal',row:3,col:6,fact:'Горючий камень'},
  {n:17,sym:'Cl',name:'Хлор',mass:'35.45',type:'nonmetal',row:3,col:7,fact:'Обеззараживает воду'},
  {n:18,sym:'Ar',name:'Аргон',mass:'39.948',type:'noble',row:3,col:8,fact:'Инертный газ'},
  
  // Период 4 - ряд 1
  {n:19,sym:'K',name:'Калий',mass:'39.098',type:'metal',row:4,col:1,fact:'Важен для клеток'},
  {n:20,sym:'Ca',name:'Кальций',mass:'40.078',type:'metal',row:4,col:2,fact:'Основа костей'},
  {n:21,sym:'Sc',name:'Скандий',mass:'44.956',type:'metal',row:4,col:3,fact:'Лёгкий и прочный'},
  {n:22,sym:'Ti',name:'Титан',mass:'47.867',type:'metal',row:4,col:4,fact:'Прочный как сталь'},
  {n:23,sym:'V',name:'Ванадий',mass:'50.942',type:'metal',row:4,col:5,fact:'Красивые соединения'},
  {n:24,sym:'Cr',name:'Хром',mass:'51.996',type:'metal',row:4,col:6,fact:'Блеск нержавейки'},
  {n:25,sym:'Mn',name:'Марганец',mass:'54.938',type:'metal',row:4,col:7,fact:'Для стали'},
  {n:26,sym:'Fe',name:'Железо',mass:'55.845',type:'metal',row:4,col:8,fact:'Ядро Земли'},
  {n:27,sym:'Co',name:'Кобальт',mass:'58.933',type:'metal',row:4,col:8,fact:'Синий цвет'},
  {n:28,sym:'Ni',name:'Никель',mass:'58.693',type:'metal',row:4,col:8,fact:'В метеоритах'},

  // Период 4 - ряд 2
  {n:29,sym:'Cu',name:'Медь',mass:'63.546',type:'metal',row:5,col:1,fact:'Антибактериальный'},
  {n:30,sym:'Zn',name:'Цинк',mass:'65.38',type:'metal',row:5,col:2,fact:'В 300 ферментах'},
  {n:31,sym:'Ga',name:'Галлий',mass:'69.723',type:'metal',row:5,col:3,fact:'Плавится в руке'},
  {n:32,sym:'Ge',name:'Германий',mass:'72.630',type:'semi',row:5,col:4,fact:'Предсказан Менделеевым'},
  {n:33,sym:'As',name:'Мышьяк',mass:'74.922',type:'semi',row:5,col:5,fact:'Известный яд'},
  {n:34,sym:'Se',name:'Селен',mass:'78.971',type:'nonmetal',row:5,col:6,fact:'Антиоксидант'},
  {n:35,sym:'Br',name:'Бром',mass:'79.904',type:'nonmetal',row:5,col:7,fact:'Жидкий неметалл'},
  {n:36,sym:'Kr',name:'Криптон',mass:'83.798',type:'noble',row:5,col:8,fact:'Эталон метра'},
  
  // Период 5 - ряд 1
  {n:37,sym:'Rb',name:'Рубидий',mass:'85.468',type:'metal',row:6,col:1,fact:'Атомные часы'},
  {n:38,sym:'Sr',name:'Стронций',mass:'87.62',type:'metal',row:6,col:2,fact:'Красный цвет фейерверков'},
  {n:39,sym:'Y',name:'Иттрий',mass:'88.906',type:'metal',row:6,col:3,fact:'В лазерах'},
  {n:40,sym:'Zr',name:'Цирконий',mass:'91.224',type:'metal',row:6,col:4,fact:'Заменитель алмаза'},
  {n:41,sym:'Nb',name:'Ниобий',mass:'92.906',type:'metal',row:6,col:5,fact:'Сверхпроводник'},
  {n:42,sym:'Mo',name:'Молибден',mass:'95.95',type:'metal',row:6,col:6,fact:'Прочность стали'},
  {n:43,sym:'Tc',name:'Технеций',mass:'98',type:'metal',row:6,col:7,fact:'Первый искусственный'},
  {n:44,sym:'Ru',name:'Рутений',mass:'101.07',type:'metal',row:6,col:8,fact:'Платиноид'},
  {n:45,sym:'Rh',name:'Родий',mass:'102.91',type:'metal',row:6,col:8,fact:'Самый дорогой'},
  {n:46,sym:'Pd',name:'Палладий',mass:'106.42',type:'metal',row:6,col:8,fact:'Поглощает водород'},
  
  // Период 5 - ряд 2
  {n:47,sym:'Ag',name:'Серебро',mass:'107.87',type:'metal',row:7,col:1,fact:'Лучший проводник'},
  {n:48,sym:'Cd',name:'Кадмий',mass:'112.41',type:'metal',row:7,col:2,fact:'Токсичен'},
  {n:49,sym:'In',name:'Индий',mass:'114.82',type:'metal',row:7,col:3,fact:'Сенсорные экраны'},
  {n:50,sym:'Sn',name:'Олово',mass:'118.71',type:'metal',row:7,col:4,fact:'Оловянная чума'},
  {n:51,sym:'Sb',name:'Сурьма',mass:'121.76',type:'semi',row:7,col:5,fact:'Древняя косметика'},
  {n:52,sym:'Te',name:'Теллур',mass:'127.60',type:'semi',row:7,col:6,fact:'Чесночный запах'},
  {n:53,sym:'I',name:'Йод',mass:'126.90',type:'nonmetal',row:7,col:7,fact:'Сублимируется'},
  {n:54,sym:'Xe',name:'Ксенон',mass:'131.29',type:'noble',row:7,col:8,fact:'Образует соединения'},
  
  // Период 6 - ряд 1
  {n:55,sym:'Cs',name:'Цезий',mass:'132.91',type:'metal',row:8,col:1,fact:'Самый реактивный'},
  {n:56,sym:'Ba',name:'Барий',mass:'137.33',type:'metal',row:8,col:2,fact:'Зелёный цвет'},
  {n:57,sym:'La',name:'Лантан',mass:'138.91',type:'metal',row:8,col:3,fact:'Первый лантаноид'},
  {n:72,sym:'Hf',name:'Гафний',mass:'178.49',type:'metal',row:8,col:4,fact:'Поглощает нейтроны'},
  {n:73,sym:'Ta',name:'Тантал',mass:'180.95',type:'metal',row:8,col:5,fact:'Устойчив к коррозии'},
  {n:74,sym:'W',name:'Вольфрам',mass:'183.84',type:'metal',row:8,col:6,fact:'Самая высокая Tпл'},
  {n:75,sym:'Re',name:'Рений',mass:'186.21',type:'metal',row:8,col:7,fact:'Очень редкий'},
  {n:76,sym:'Os',name:'Осмий',mass:'190.23',type:'metal',row:8,col:8,fact:'Самый плотный'},
  {n:77,sym:'Ir',name:'Иридий',mass:'192.22',type:'metal',row:8,col:8,fact:'Астероид-убийца'},
  {n:78,sym:'Pt',name:'Платина',mass:'195.08',type:'metal',row:8,col:8,fact:'Благородный металл'},
  
  // Период 6 - ряд 2
  {n:79,sym:'Au',name:'Золото',mass:'196.97',type:'metal',row:9,col:1,fact:'Куб 22 метра'},
  {n:80,sym:'Hg',name:'Ртуть',mass:'200.59',type:'metal',row:9,col:2,fact:'Жидкий металл'},
  {n:81,sym:'Tl',name:'Таллий',mass:'204.38',type:'metal',row:9,col:3,fact:'Очень токсичен'},
  {n:82,sym:'Pb',name:'Свинец',mass:'207.2',type:'metal',row:9,col:4,fact:'6000 лет истории'},
  {n:83,sym:'Bi',name:'Висмут',mass:'208.98',type:'metal',row:9,col:5,fact:'Диамагнитный'},
  {n:84,sym:'Po',name:'Полоний',mass:'209',type:'metal',row:9,col:6,fact:'Открыт Кюри'},
  {n:85,sym:'At',name:'Астат',mass:'210',type:'semi',row:9,col:7,fact:'Самый редкий'},
  {n:86,sym:'Rn',name:'Радон',mass:'222',type:'noble',row:9,col:8,fact:'Радиоактивный газ'},
  
  // Период 7 - ряд 1
  {n:87,sym:'Fr',name:'Франций',mass:'223',type:'metal',row:10,col:1,fact:'~30 г в природе'},
  {n:88,sym:'Ra',name:'Радий',mass:'226',type:'metal',row:10,col:2,fact:'Светится в темноте'},
  {n:89,sym:'Ac',name:'Актиний',mass:'227',type:'metal',row:10,col:3,fact:'Первый актиноид'},
  {n:104,sym:'Rf',name:'Резерфордий',mass:'267',type:'metal',row:10,col:4,fact:'В честь Резерфорда'},
  {n:105,sym:'Db',name:'Дубний',mass:'268',type:'metal',row:10,col:5,fact:'Дубна, Россия'},
  {n:106,sym:'Sg',name:'Сиборгий',mass:'269',type:'metal',row:10,col:6,fact:'В честь Сиборга'},
  {n:107,sym:'Bh',name:'Борий',mass:'270',type:'metal',row:10,col:7,fact:'В честь Бора'},
  {n:108,sym:'Hs',name:'Хассий',mass:'277',type:'metal',row:10,col:8,fact:'Земля Гессен'},
  {n:109,sym:'Mt',name:'Мейтнерий',mass:'278',type:'metal',row:10,col:8,fact:'Лиза Мейтнер'},
  {n:110,sym:'Ds',name:'Дармштадтий',mass:'281',type:'metal',row:10,col:8,fact:'Дармштадт'},
  
  // Период 7 - ряд 2
  {n:111,sym:'Rg',name:'Рентгений',mass:'282',type:'metal',row:11,col:1,fact:'Рентген'},
  {n:112,sym:'Cn',name:'Коперниций',mass:'285',type:'metal',row:11,col:2,fact:'Коперник'},
  {n:113,sym:'Nh',name:'Нихоний',mass:'286',type:'metal',row:11,col:3,fact:'Япония'},
  {n:114,sym:'Fl',name:'Флеровий',mass:'289',type:'metal',row:11,col:4,fact:'Флёров'},
  {n:115,sym:'Mc',name:'Московий',mass:'290',type:'metal',row:11,col:5,fact:'Московская область'},
  {n:116,sym:'Lv',name:'Ливерморий',mass:'293',type:'metal',row:11,col:6,fact:'Ливермор, США'},
  {n:117,sym:'Ts',name:'Теннессин',mass:'294',type:'semi',row:11,col:7,fact:'Теннесси, США'},
  {n:118,sym:'Og',name:'Оганесон',mass:'294',type:'noble',row:11,col:8,fact:'Юрий Оганесян'},
  
  // Лантаноиды (ряд 12)
  {n:58,sym:'Ce',name:'Церий',mass:'140.12',type:'metal',row:12,col:1,fact:'Самый распространённый РЗЭ'},
  {n:59,sym:'Pr',name:'Празеодим',mass:'140.91',type:'metal',row:12,col:2,fact:'Жёлто-зелёное стекло'},
  {n:60,sym:'Nd',name:'Неодим',mass:'144.24',type:'metal',row:12,col:3,fact:'Мощные магниты'},
  {n:61,sym:'Pm',name:'Прометий',mass:'145',type:'metal',row:12,col:4,fact:'Не встречается в природе'},
  {n:62,sym:'Sm',name:'Самарий',mass:'150.36',type:'metal',row:12,col:5,fact:'Поглотитель нейтронов'},
  {n:63,sym:'Eu',name:'Европий',mass:'151.96',type:'metal',row:12,col:6,fact:'В евробанкнотах'},
  {n:64,sym:'Gd',name:'Гадолиний',mass:'157.25',type:'metal',row:12,col:7,fact:'Контраст для МРТ'},
  {n:65,sym:'Tb',name:'Тербий',mass:'158.93',type:'metal',row:12,col:8,fact:'Энергосберегающие лампы'},
  {n:66,sym:'Dy',name:'Диспрозий',mass:'162.50',type:'metal',row:13,col:1,fact:'Труднодоступный'},
  {n:67,sym:'Ho',name:'Гольмий',mass:'164.93',type:'metal',row:13,col:2,fact:'Сильный магнетизм'},
  {n:68,sym:'Er',name:'Эрбий',mass:'167.26',type:'metal',row:13,col:3,fact:'Розовое стекло'},
  {n:69,sym:'Tm',name:'Тулий',mass:'168.93',type:'metal',row:13,col:4,fact:'Самый редкий РЗЭ'},
  {n:70,sym:'Yb',name:'Иттербий',mass:'173.05',type:'metal',row:13,col:5,fact:'Атомные часы'},
  {n:71,sym:'Lu',name:'Лютеций',mass:'174.97',type:'metal',row:13,col:6,fact:'Последний лантаноид'},
  
  // Актиноиды (ряд 13)
  {n:90,sym:'Th',name:'Торий',mass:'232.04',type:'metal',row:14,col:1,fact:'Ядерное топливо'},
  {n:91,sym:'Pa',name:'Протактиний',mass:'231.04',type:'metal',row:14,col:2,fact:'Очень редкий'},
  {n:92,sym:'U',name:'Уран',mass:'238.03',type:'metal',row:14,col:3,fact:'Ядерное топливо'},
  {n:93,sym:'Np',name:'Нептуний',mass:'237',type:'metal',row:14,col:4,fact:'Первый трансуран'},
  {n:94,sym:'Pu',name:'Плутоний',mass:'244',type:'metal',row:14,col:5,fact:'Ядерное оружие'},
  {n:95,sym:'Am',name:'Америций',mass:'243',type:'metal',row:14,col:6,fact:'В детекторах дыма'},
  {n:96,sym:'Cm',name:'Кюрий',mass:'247',type:'metal',row:14,col:7,fact:'В честь Кюри'},
  {n:97,sym:'Bk',name:'Берклий',mass:'247',type:'metal',row:14,col:8,fact:'Беркли, США'},
  {n:98,sym:'Cf',name:'Калифорний',mass:'251',type:'metal',row:15,col:1,fact:'27 млн $ за грамм'},
  {n:99,sym:'Es',name:'Эйнштейний',mass:'252',type:'metal',row:15,col:2,fact:'В честь Эйнштейна'},
  {n:100,sym:'Fm',name:'Фермий',mass:'257',type:'metal',row:15,col:3,fact:'В честь Ферми'},
  {n:101,sym:'Md',name:'Менделевий',mass:'258',type:'metal',row:15,col:4,fact:'В честь Менделеева'},
  {n:102,sym:'No',name:'Нобелий',mass:'259',type:'metal',row:15,col:5,fact:'В честь Нобеля'},
  {n:103,sym:'Lr',name:'Лоуренсий',mass:'266',type:'metal',row:15,col:6,fact:'Последний актиноид'}
];
