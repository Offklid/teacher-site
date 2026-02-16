// Данные кроссвордов
// Правильно составленные кроссворды с пересечениями

const crosswordsData = [
  {
    id: 1,
    title: "Периодическая таблица",
    description: "Основные химические элементы",
    subject: "chemistry",
    grade: 8,
    difficulty: "easy",
    size: { rows: 12, cols: 12 },
    words: [
      { word: "АЗОТ", clue: "Составляет 78% атмосферы Земли", direction: "across", row: 1, col: 5, number: 1 },
      { word: "НАТРИЙ", clue: "Мягкий металл, бурно реагирует с водой", direction: "down", row: 0, col: 5, number: 2 },
      { word: "ЗОЛОТО", clue: "Драгоценный металл желтого цвета", direction: "down", row: 0, col: 7, number: 3 },
      { word: "КАЛИЙ", clue: "Щелочной металл, необходим для работы сердца", direction: "down", row: 3, col: 3, number: 4 },
      { word: "ЖЕЛЕЗО", clue: "Металл, из которого делают сталь", direction: "down", row: 2, col: 4, number: 5 },
      { word: "ВОДОРОД", clue: "Первый элемент таблицы Менделеева, самый легкий газ", direction: "across", row: 7, col: 1, number: 7 },
      { word: "УГЛЕРОД", clue: "Основа всех органических соединений", direction: "down", row: 3, col: 1, number: 8 },
      { word: "ФОСФОР", clue: "Светится в темноте, используется в спичках", direction: "across", row: 9, col: 3, number: 9 },
      { word: "МЕДЬ", clue: "Металл красноватого цвета, хороший проводник", direction: "across", row: 6, col: 1, number: 10 },
      { word: "СЕРА", clue: "Желтое вещество, горит синим пламенем", direction: "down", row: 7, col: 9, number: 11 }
    ]
  },
  {
    id: 2,
    title: "Строение клетки",
    description: "Органоиды и их функции",
    subject: "biology",
    grade: 8,
    difficulty: "easy",
    size: { rows: 15, cols: 15 },
    words: [
      { word: "ХРОМОСОМА", clue: "Структура, содержащая ДНК в ядре клетки", direction: "across", row: 9, col: 2, number: 1 },
      { word: "ВАКУОЛЬ", clue: "Резервуар для хранения веществ в клетке", direction: "across", row: 7, col: 5, number: 2 },
      { word: "ДНК", clue: "Молекула наследственности", direction: "down", row: 7, col: 2, number: 12 },
      { word: "МИТОХОНДРИЯ", clue: "Энергетическая станция клетки, вырабатывает АТФ", direction: "across", row: 11, col: 5, number: 4 },
      { word: "МЕМБРАНА", clue: "Оболочка, окружающая клетку", direction: "across", row: 3, col: 2, number: 5 },
      { word: "ОБОЛОЧКА", clue: "Внешняя структура клетки", direction: "across", row: 4, col: 4, number: 6 },
      { word: "МЕМБРАНА", clue: "Оболочка, окружающая клетку", direction: "across", row: 3, col: 2, number: 7 },
      { word: "БЕЛОК", clue: "Основной строительный материал клетки", direction: "down", row: 2, col: 8, number: 8 },
      { word: "ОРГАН", clue: "Часть организма, выполняющая определенную функцию", direction: "down", row: 0, col: 5, number: 9 },
      { word: "ХЛОРОПЛАСТ", clue: "Органоид фотосинтеза у растений", direction: "across", row: 6, col: 1, number: 10 },
      { word: "КЛЕТКА", clue: "Основная единица жизни", direction: "down", row: 5, col: 2, number: 11 },
      { word: "ЦИТОПЛАЗМА", clue: "Внутренняя среда клетки", direction: "down", row: 4, col: 10, number: 13 },
      { word: "ТКАНЬ", clue: "Группа клеток с одинаковой функцией", direction: "across", row: 5, col: 10, number: 14 }
    ]
  },
  {
    id: 3,
    title: "Химические реакции",
    description: "Типы и признаки химических реакций",
    subject: "chemistry",
    grade: 9,
    difficulty: "medium",
    size: { rows: 12, cols: 12 },
    words: [
      { word: "ОКИСЛЕНИЕ", clue: "Процесс отдачи электронов атомом", direction: "across", row: 0, col: 0, number: 1 },
      { word: "ИОНЫ", clue: "Заряженные частицы", direction: "down", row: 0, col: 2, number: 2 },
      { word: "РЕАГЕНТ", clue: "Исходное вещество в химической реакции", direction: "across", row: 5, col: 0, number: 3 },
      { word: "АТОМ", clue: "Наименьшая частица химического элемента", direction: "down", row: 5, col: 2, number: 4 },
      { word: "СИНТЕЗ", clue: "Реакция соединения веществ", direction: "across", row: 7, col: 2, number: 5 },
      { word: "ЭНЕРГИЯ", clue: "Выделяется или поглощается в реакции", direction: "down", row: 5, col: 4, number: 6 },
      { word: "ПРОДУКТ", clue: "Вещество, образующееся в результате реакции", direction: "down", row: 0, col: 8, number: 7 },
      { word: "АНАЛИЗ", clue: "Реакция разложения вещества", direction: "across", row: 3, col: 6, number: 8 }
    ]
  },
  {
    id: 4,
    title: "Пищеварение",
    description: "Органы и процессы пищеварительной системы",
    subject: "biology",
    grade: 9,
    difficulty: "medium",
    size: { rows: 12, cols: 12 },
    words: [
      { word: "ЖЕЛУДОК", clue: "Орган, где происходит переваривание белков", direction: "across", row: 0, col: 0, number: 1 },
      { word: "КИШЕЧНИК", clue: "Орган, где всасываются питательные вещества", direction: "down", row: 0, col: 2, number: 2 },
      { word: "ПЕЧЕНЬ", clue: "Орган, вырабатывающий желчь", direction: "across", row: 5, col: 0, number: 3 },
      { word: "ЖЕЛЧЬ", clue: "Жидкость, расщепляющая жиры", direction: "down", row: 5, col: 2, number: 4 },
      { word: "ФЕРМЕНТ", clue: "Вещество, ускоряющее переваривание пищи", direction: "across", row: 8, col: 1, number: 5 },
      { word: "СЛЮНА", clue: "Жидкость, начинающая переваривание углеводов", direction: "down", row: 0, col: 7, number: 6 },
      { word: "ПИЩЕВОД", clue: "Трубка, соединяющая рот и желудок", direction: "across", row: 3, col: 5, number: 7 }
    ]
  },
  {
    id: 5,
    title: "Органическая химия",
    description: "Углеводороды и их производные",
    subject: "chemistry",
    grade: 10,
    difficulty: "medium",
    size: { rows: 12, cols: 12 },
    words: [
      { word: "МЕТАН", clue: "Простейший углеводород, болотный газ", direction: "across", row: 0, col: 0, number: 1 },
      { word: "ЭТАН", clue: "Углеводород с двумя атомами углерода", direction: "down", row: 0, col: 1, number: 2 },
      { word: "БЕНЗОЛ", clue: "Ароматический углеводород с формулой C6H6", direction: "across", row: 4, col: 1, number: 3 },
      { word: "НЕФТЬ", clue: "Природная смесь углеводородов", direction: "down", row: 4, col: 3, number: 4 },
      { word: "КИСЛОТА", clue: "Органическое соединение с карбоксильной группой", direction: "across", row: 7, col: 0, number: 5 },
      { word: "АЛКАН", clue: "Насыщенный углеводород", direction: "down", row: 7, col: 6, number: 6 },
      { word: "СПИРТ", clue: "Органическое соединение с гидроксильной группой", direction: "across", row: 3, col: 7, number: 7 }
    ]
  },
  {
    id: 6,
    title: "Генетика",
    description: "Основы наследственности и изменчивости",
    subject: "biology",
    grade: 10,
    difficulty: "medium",
    size: { rows: 12, cols: 12 },
    words: [
      { word: "ГЕН", clue: "Единица наследственной информации", direction: "across", row: 0, col: 0, number: 1 },
      { word: "НАСЛЕДСТВО", clue: "Передача признаков потомству", direction: "down", row: 0, col: 2, number: 2 },
      { word: "МУТАЦИЯ", clue: "Внезапное изменение в генетическом материале", direction: "across", row: 4, col: 0, number: 3 },
      { word: "АЛЛЕЛЬ", clue: "Различные формы одного гена", direction: "down", row: 4, col: 3, number: 4 },
      { word: "ГЕНОТИП", clue: "Совокупность всех генов организма", direction: "across", row: 8, col: 1, number: 5 },
      { word: "ФЕНОТИП", clue: "Совокупность внешних признаков организма", direction: "down", row: 0, col: 9, number: 6 },
      { word: "ХРОМОСОМА", clue: "Структура, содержащая ДНК в ядре клетки", direction: "across", row: 2, col: 5, number: 7 }
    ]
  },
  {
    id: 7,
    title: "Электрохимия",
    description: "Окислительно-восстановительные реакции",
    subject: "chemistry",
    grade: 11,
    difficulty: "hard",
    size: { rows: 15, cols: 11 },
    words: [
      { word: "ЭЛЕКТРОД", clue: "Проводник, через который ток входит или выходит", direction: "across", row: 0, col: 0, number: 1 },
      { word: "КАТОД", clue: "Отрицательный электрод", direction: "down", row: 0, col: 5, number: 2 },
      { word: "АНОД", clue: "Положительный электрод", direction: "across", row: 4, col: 0, number: 3 },
      { word: "ЭЛЕКТРОЛИЗ", clue: "Разложение вещества электрическим током", direction: "down", row: 0, col: 2, number: 4 },
      { word: "ИОНИЗАЦИЯ", clue: "Процесс образования ионов", direction: "across", row: 7, col: 1, number: 5 },
      { word: "ОКИСЛИТЕЛЬ", clue: "Вещество, принимающее электроны", direction: "down", row: 4, col: 8, number: 6 }
    ]
  },
  {
    id: 8,
    title: "Эволюция",
    description: "Теория эволюции и естественный отбор",
    subject: "biology",
    grade: 11,
    difficulty: "hard",
    size: { rows: 13, cols: 13 },
    words: [
      { word: "ДАРВИН", clue: "Автор теории естественного отбора", direction: "across", row: 0, col: 0, number: 1 },
      { word: "АДАПТАЦИЯ", clue: "Приспособление организма к среде обитания", direction: "down", row: 0, col: 1, number: 2 },
      { word: "ОТБОР", clue: "Процесс выживания наиболее приспособленных", direction: "across", row: 4, col: 0, number: 3 },
      { word: "БОРЬБА", clue: "Конкуренция за существование", direction: "down", row: 4, col: 2, number: 4 },
      { word: "ПОПУЛЯЦИЯ", clue: "Группа особей одного вида на определенной территории", direction: "across", row: 8, col: 0, number: 5 },
      { word: "ВИД", clue: "Основная единица систематики живых организмов", direction: "across", row: 2, col: 8, number: 7 }
    ]
  },
  {
    id: 9,
    title: "Кислоты и основания",
    description: "Свойства кислот и оснований",
    subject: "chemistry",
    grade: 8,
    difficulty: "easy",
    size: { rows: 10, cols: 10 },
    words: [
      { word: "КИСЛОТА", clue: "Вещество, отдающее протоны", direction: "across", row: 0, col: 0, number: 1 },
      { word: "ИНДИКАТОР", clue: "Вещество, изменяющее цвет в кислой или щелочной среде", direction: "down", row: 0, col: 1, number: 2 },
      { word: "СОЛЬ", clue: "Продукт реакции кислоты и основания", direction: "across", row: 4, col: 2, number: 3 },
      { word: "ЩЕЛОЧЬ", clue: "Растворимое в воде основание", direction: "down", row: 4, col: 4, number: 4 },
      { word: "ЛАКМУС", clue: "Индикатор, краснеющий в кислоте", direction: "across", row: 7, col: 0, number: 5 },
      { word: "РЕАКЦИЯ", clue: "Процесс взаимодействия веществ", direction: "down", row: 0, col: 6, number: 6 }
    ]
  },
  {
    id: 10,
    title: "Дыхание",
    description: "Органы и процессы дыхательной системы",
    subject: "biology",
    grade: 8,
    difficulty: "easy",
    size: { rows: 16, cols: 9 },
    words: [
      { word: "ЛЕГКИЕ", clue: "Органы, где происходит газообмен", direction: "across", row: 0, col: 0, number: 1 },
      { word: "КИСЛОРОД", clue: "Газ, необходимый для дыхания", direction: "down", row: 0, col: 2, number: 2 },
      { word: "ТРАХЕЯ", clue: "Дыхательная трубка", direction: "across", row: 5, col: 0, number: 3 },
      { word: "АЛЬВЕОЛА", clue: "Пузырек в легких, где происходит газообмен", direction: "down", row: 5, col: 3, number: 4 },
      { word: "БРОНХИ", clue: "Ветви дыхательного горла", direction: "across", row: 8, col: 1, number: 5 },
      { word: "ДИАФРАГМА", clue: "Мышца, участвующая в дыхании", direction: "down", row: 0, col: 7, number: 6 }
    ]
  },
  {
    id: 11,
    title: "Растворы",
    description: "Свойства и типы растворов",
    subject: "chemistry",
    grade: 9,
    difficulty: "medium",
    size: { rows: 15, cols: 15 },
    words: [
      { word: "РАСТВОР", clue: "Однородная смесь веществ", direction: "across", row: 0, col: 0, number: 1 },
      { word: "РАСТВОРИТЕЛЬ", clue: "Вещество, в котором растворяют", direction: "down", row: 0, col: 2, number: 2 },
      { word: "СОЛЬ", clue: "Вещество, которое можно растворить", direction: "across", row: 6, col: 0, number: 3 },
      { word: "КОНЦЕНТРАЦИЯ", clue: "Содержание вещества в растворе", direction: "down", row: 0, col: 7, number: 4 },
      { word: "ОСАДОК", clue: "Нерастворимое вещество, выпавшее на дно", direction: "across", row: 4, col: 4, number: 5 },
      { word: "ФИЛЬТР", clue: "Устройство для очистки раствора", direction: "down", row: 6, col: 4, number: 6 }
    ]
  },
  {
    id: 12,
    title: "Кровообращение",
    description: "Сердце и сосуды",
    subject: "biology",
    grade: 9,
    difficulty: "medium",
    size: { rows: 15, cols: 15 },
    words: [
      { word: "СЕРДЦЕ", clue: "Орган, перекачивающий кровь", direction: "across", row: 0, col: 0, number: 1 },
      { word: "АРТЕРИЯ", clue: "Сосуд, несущий кровь от сердца", direction: "down", row: 0, col: 4, number: 2 },
      { word: "ВЕНА", clue: "Сосуд, несущий кровь к сердцу", direction: "across", row: 5, col: 0, number: 3 },
      { word: "КАПИЛЛЯР", clue: "Мельчайший кровеносный сосуд", direction: "down", row: 0, col: 8, number: 4 },
      { word: "ПУЛЬС", clue: "Ритмичное колебание стенок артерий", direction: "across", row: 8, col: 1, number: 5 },
      { word: "ЭРИТРОЦИТ", clue: "Красная кровяная клетка", direction: "down", row: 5, col: 2, number: 6 }
    ]
  },
  {
    id: 13,
    title: "Полимеры",
    description: "Высокомолекулярные соединения",
    subject: "chemistry",
    grade: 10,
    difficulty: "medium",
    size: { rows: 15, cols: 15 },
    words: [
      { word: "ПОЛИМЕР", clue: "Высокомолекулярное соединение", direction: "across", row: 0, col: 0, number: 1 },
      { word: "МОНОМЕР", clue: "Молекула, из которой образуется полимер", direction: "down", row: 0, col: 4, number: 2 },
      { word: "ПЛАСТИК", clue: "Синтетический полимерный материал", direction: "across", row: 5, col: 0, number: 3 },
      { word: "КАУЧУК", clue: "Эластичный полимер", direction: "down", row: 5, col: 3, number: 4 },
      { word: "ЦЕЛЛЮЛОЗА", clue: "Природный полимер в растениях", direction: "across", row: 8, col: 1, number: 5 },
      { word: "БЕЛОК", clue: "Природный полимер из аминокислот", direction: "down", row: 0, col: 9, number: 6 }
    ]
  },
  {
    id: 14,
    title: "Иммунитет",
    description: "Защитные системы организма",
    subject: "biology",
    grade: 10,
    difficulty: "medium",
    size: { rows: 15, cols: 15 },
    words: [
      { word: "ИММУНИТЕТ", clue: "Способность организма защищаться от болезней", direction: "across", row: 0, col: 0, number: 1 },
      { word: "АНТИТЕЛО", clue: "Белок, борющийся с инфекцией", direction: "down", row: 0, col: 5, number: 2 },
      { word: "ВАКЦИНА", clue: "Препарат для создания иммунитета", direction: "across", row: 5, col: 0, number: 3 },
      { word: "ЛИМФОЦИТ", clue: "Клетка иммунной системы", direction: "down", row: 5, col: 3, number: 4 },
      { word: "ИНФЕКЦИЯ", clue: "Заражение организма микробами", direction: "across", row: 8, col: 1, number: 5 },
      { word: "ФАГОЦИТ", clue: "Клетка, поглощающая бактерии", direction: "down", row: 0, col: 9, number: 6 }
    ]
  },
  {
    id: 15,
    title: "Термодинамика",
    description: "Энергия и тепловые процессы",
    subject: "chemistry",
    grade: 11,
    difficulty: "hard",
    size: { rows: 18, cols: 18 },
    words: [
      { word: "ЭНТАЛЬПИЯ", clue: "Тепловая энергия системы", direction: "across", row: 0, col: 0, number: 1 },
      { word: "ЭНТРОПИЯ", clue: "Мера беспорядка в системе", direction: "down", row: 0, col: 2, number: 2 },
      { word: "ТЕПЛОТА", clue: "Форма передачи энергии", direction: "across", row: 5, col: 0, number: 3 },
      { word: "ЭКЗОТЕРМИЧЕСКИЙ", clue: "Процесс с выделением тепла", direction: "down", row: 0, col: 8, number: 4 },
      { word: "РАБОТА", clue: "Форма передачи энергии", direction: "across", row: 8, col: 1, number: 5 },
      { word: "СИСТЕМА", clue: "Часть пространства, изучаемая в термодинамике", direction: "down", row: 5, col: 4, number: 6 }
    ]
  },
  {
    id: 16,
    title: "Экология",
    description: "Взаимодействие организмов и среды",
    subject: "biology",
    grade: 11,
    difficulty: "hard",
    size: { rows: 15, cols: 15 },
    words: [
      { word: "ЭКОСИСТЕМА", clue: "Сообщество организмов и среда их обитания", direction: "across", row: 0, col: 0, number: 1 },
      { word: "БИОЦЕНОЗ", clue: "Совокупность живых организмов", direction: "down", row: 0, col: 5, number: 2 },
      { word: "ПРОДУЦЕНТ", clue: "Организм, создающий органические вещества", direction: "across", row: 5, col: 0, number: 3 },
      { word: "КОНСУМЕНТ", clue: "Организм, потребляющий готовые органические вещества", direction: "down", row: 5, col: 4, number: 4 },
      { word: "РЕДУЦЕНТ", clue: "Организм, разлагающий органические вещества", direction: "across", row: 8, col: 1, number: 5 },
      { word: "БИОТОП", clue: "Место обитания биоценоза", direction: "down", row: 0, col: 9, number: 6 }
    ]
  }
];

// Функция для получения всех кроссвордов
function getAllCrosswords() {
  return crosswordsData;
}

// Функция для получения кроссворда по ID
function getCrosswordById(id) {
  return crosswordsData.find(c => c.id === id);
}

// Функция для фильтрации кроссвордов
function filterCrosswordsData(subject = 'all', grade = 'all') {
  return crosswordsData.filter(crossword => {
    const subjectMatch = subject === 'all' || crossword.subject === subject;
    const gradeMatch = grade === 'all' || crossword.grade === parseInt(grade);
    return subjectMatch && gradeMatch;
  });
}
