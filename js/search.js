// Современный поиск по сайту с Fuse.js
(function () {
  'use strict';

  // Данные для поиска (можно расширить)
  const searchData = [
    // Страницы
    {
      id: 'home',
      type: 'page',
      title: 'Главная',
      description: 'Добро пожаловать на сайт учителя химии и биологии',
      url: 'index.html',
      keywords: ['главная', 'home', 'начало', 'старт']
    },
    {
      id: 'chemistry',
      type: 'page',
      title: 'Химия',
      description: 'Все материалы по химии: презентации, тесты, лабораторные работы',
      url: 'chemistry.html',
      keywords: ['химия', 'chemistry', 'уроки химии', 'материалы']
    },
    {
      id: 'biology',
      type: 'page',
      title: 'Биология',
      description: 'Все материалы по биологии: схемы, таблицы, видео, тесты',
      url: 'biology.html',
      keywords: ['биология', 'biology', 'уроки биологии', 'материалы']
    },
    {
      id: 'crosswords',
      type: 'page',
      title: 'Кроссворды',
      description: 'Интерактивные кроссворды по химии и биологии',
      url: 'crosswords.html',
      keywords: ['кроссворды', 'кроссворд', 'игры', 'задания']
    },
    {
      id: 'calendar',
      type: 'page',
      title: 'Календарь',
      description: 'Расписание контрольных, олимпиад и важных событий',
      url: 'calendar.html',
      keywords: ['календарь', 'события', 'расписание', 'контрольные']
    },
    {
      id: 'homework',
      type: 'page',
      title: 'Домашние задания',
      description: 'Домашние задания по классам с дедлайнами',
      url: 'homework.html',
      keywords: ['домашние задания', 'дз', 'homework', 'задания']
    },
    {
      id: 'exam',
      type: 'page',
      title: 'ОГЭ и ЕГЭ',
      description: 'Подготовка к экзаменам: варианты, демоверсии, разбор заданий',
      url: 'exam.html',
      keywords: ['огэ', 'егэ', 'экзамены', 'подготовка']
    },
    {
      id: 'reviews',
      type: 'page',
      title: 'Отзывы',
      description: 'Отзывы учеников и родителей',
      url: 'reviews.html',
      keywords: ['отзывы', 'reviews', 'комментарии']
    },
    {
      id: 'schedule',
      type: 'page',
      title: 'Расписание',
      description: 'Расписание уроков по классам',
      url: 'schedule.html',
      keywords: ['расписание', 'уроки', 'schedule']
    },
    {
      id: 'links',
      type: 'page',
      title: 'Полезные ссылки',
      description: 'Ресурсы для изучения химии и биологии',
      url: 'links.html',
      keywords: ['ссылки', 'ресурсы', 'фипи', 'решу егэ']
    },
    {
      id: 'contact',
      type: 'page',
      title: 'Контакты',
      description: 'Как связаться с учителем',
      url: 'contact.html',
      keywords: ['контакты', 'связь', 'email', 'telegram']
    },
    {
      id: 'grading',
      type: 'page',
      title: 'Критерии оценивания',
      description: 'Система оценивания работ',
      url: 'grading.html',
      keywords: ['оценки', 'критерии', 'оценивание']
    },

    // Материалы
    {
      id: 'periodic-table',
      type: 'material',
      title: 'Периодическая система элементов',
      description: 'Презентация по периодической системе Менделеева',
      url: 'chemistry.html#periodic-table',
      category: 'Химия',
      grade: '8',
      keywords: ['периодическая система', 'менделеев', 'элементы', 'таблица', '8 класс']
    },
    {
      id: 'cell-structure',
      type: 'material',
      title: 'Строение клетки',
      description: 'Схема строения клетки с пояснениями',
      url: 'biology.html#cell-structure',
      category: 'Биология',
      grade: '8',
      keywords: ['клетка', 'строение', 'органоиды', 'цитоплазма', '8 класс']
    },
    {
      id: 'anatomy',
      type: 'material',
      title: 'Анатомия человека',
      description: 'Интерактивная 3D модель скелета и систем органов',
      url: 'biology.html#anatomy',
      category: 'Биология',
      keywords: ['анатомия', 'скелет', '3d', 'органы', 'системы']
    },
    {
      id: 'oge-tasks',
      type: 'material',
      title: 'Задания ОГЭ',
      description: 'Варианты заданий ОГЭ с ответами',
      url: 'exam.html#oge',
      category: 'ОГЭ',
      keywords: ['огэ', 'задания', 'варианты', 'ответы', 'экзамен']
    },

    // Кроссворды - Химия
    {
      id: 'crossword-periodic-table',
      type: 'crossword',
      title: 'Периодическая таблица',
      description: 'Кроссворд про химические элементы',
      url: 'crosswords.html?id=1',
      category: 'Химия',
      grade: '8',
      keywords: ['кроссворд', 'химия', 'элементы', 'таблица', 'менделеев', '8 класс']
    },
    {
      id: 'crossword-acids',
      type: 'crossword',
      title: 'Кислоты и основания',
      description: 'Кроссворд про кислоты и щелочи',
      url: 'crosswords.html?id=9',
      category: 'Химия',
      grade: '8',
      keywords: ['кроссворд', 'химия', 'кислоты', 'щелочь', 'индикатор', '8 класс']
    },
    {
      id: 'crossword-reactions',
      type: 'crossword',
      title: 'Химические реакции',
      description: 'Кроссворд про типы химических реакций',
      url: 'crosswords.html?id=3',
      category: 'Химия',
      grade: '9',
      keywords: ['кроссворд', 'химия', 'реакции', 'окисление', 'синтез', '9 класс']
    },
    {
      id: 'crossword-solutions',
      type: 'crossword',
      title: 'Растворы',
      description: 'Кроссворд про растворы и концентрацию',
      url: 'crosswords.html?id=11',
      category: 'Химия',
      grade: '9',
      keywords: ['кроссворд', 'химия', 'растворы', 'концентрация', '9 класс']
    },
    {
      id: 'crossword-organic',
      type: 'crossword',
      title: 'Органическая химия',
      description: 'Кроссворд про углеводороды',
      url: 'crosswords.html?id=5',
      category: 'Химия',
      grade: '10',
      keywords: ['кроссворд', 'химия', 'органика', 'углеводороды', 'метан', '10 класс']
    },
    {
      id: 'crossword-polymers',
      type: 'crossword',
      title: 'Полимеры',
      description: 'Кроссворд про полимеры и пластик',
      url: 'crosswords.html?id=13',
      category: 'Химия',
      grade: '10',
      keywords: ['кроссворд', 'химия', 'полимеры', 'пластик', '10 класс']
    },
    {
      id: 'crossword-electrochemistry',
      type: 'crossword',
      title: 'Электрохимия',
      description: 'Кроссворд про электролиз и электроды',
      url: 'crosswords.html?id=7',
      category: 'Химия',
      grade: '11',
      keywords: ['кроссворд', 'химия', 'электрохимия', 'электролиз', '11 класс']
    },
    {
      id: 'crossword-thermodynamics',
      type: 'crossword',
      title: 'Термодинамика',
      description: 'Кроссворд про энергию и тепловые процессы',
      url: 'crosswords.html?id=15',
      category: 'Химия',
      grade: '11',
      keywords: ['кроссворд', 'химия', 'термодинамика', 'энергия', '11 класс']
    },

    // Кроссворды - Биология
    {
      id: 'crossword-cell',
      type: 'crossword',
      title: 'Строение клетки',
      description: 'Кроссворд про органоиды клетки',
      url: 'crosswords.html?id=2',
      category: 'Биология',
      grade: '8',
      keywords: ['кроссворд', 'биология', 'клетка', 'органоиды', 'днк', '8 класс']
    },
    {
      id: 'crossword-breathing',
      type: 'crossword',
      title: 'Дыхание',
      description: 'Кроссворд про дыхательную систему',
      url: 'crosswords.html?id=10',
      category: 'Биология',
      grade: '8',
      keywords: ['кроссворд', 'биология', 'дыхание', 'легкие', '8 класс']
    },
    {
      id: 'crossword-digestion',
      type: 'crossword',
      title: 'Пищеварение',
      description: 'Кроссворд про пищеварительную систему',
      url: 'crosswords.html?id=4',
      category: 'Биология',
      grade: '9',
      keywords: ['кроссворд', 'биология', 'пищеварение', 'желудок', '9 класс']
    },
    {
      id: 'crossword-circulation',
      type: 'crossword',
      title: 'Кровообращение',
      description: 'Кроссворд про сердце и сосуды',
      url: 'crosswords.html?id=12',
      category: 'Биология',
      grade: '9',
      keywords: ['кроссворд', 'биология', 'кровообращение', 'сердце', '9 класс']
    },
    {
      id: 'crossword-genetics',
      type: 'crossword',
      title: 'Генетика',
      description: 'Кроссворд про наследственность',
      url: 'crosswords.html?id=6',
      category: 'Биология',
      grade: '10',
      keywords: ['кроссворд', 'биология', 'генетика', 'ген', 'днк', '10 класс']
    },
    {
      id: 'crossword-immunity',
      type: 'crossword',
      title: 'Иммунитет',
      description: 'Кроссворд про иммунную систему',
      url: 'crosswords.html?id=14',
      category: 'Биология',
      grade: '10',
      keywords: ['кроссворд', 'биология', 'иммунитет', 'антитело', '10 класс']
    },
    {
      id: 'crossword-evolution',
      type: 'crossword',
      title: 'Эволюция',
      description: 'Кроссворд про теорию эволюции',
      url: 'crosswords.html?id=8',
      category: 'Биология',
      grade: '11',
      keywords: ['кроссворд', 'биология', 'эволюция', 'дарвин', '11 класс']
    },
    {
      id: 'crossword-ecology',
      type: 'crossword',
      title: 'Экология',
      description: 'Кроссворд про экосистемы',
      url: 'crosswords.html?id=16',
      category: 'Биология',
      grade: '11',
      keywords: ['кроссворд', 'биология', 'экология', 'экосистема', '11 класс']
    }
  ];

  // Инициализация Fuse.js
  let fuse = null;
  let currentFilter = 'all';
  let selectedIndex = -1;

  const fuseOptions = {
    keys: [
      { name: 'title', weight: 3 },
      { name: 'keywords', weight: 2 },
      { name: 'description', weight: 1 },
      { name: 'category', weight: 0.5 }
    ],
    threshold: 0.4,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
    useExtendedSearch: false
  };

  // Элементы DOM
  let modal, input, resultsContainer, closeBtn, triggerBtn;

  // Инициализация
  function init() {
    createSearchModal();
    fuse = new Fuse(searchData, fuseOptions);
    attachEventListeners();
  }

  // Создание модального окна
  function createSearchModal() {
    const modalHTML = `
      <div class="search-modal" id="searchModal">
        <div class="search-container">
          <div class="search-input-wrapper">
            <div class="search-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <input 
              type="text" 
              class="search-input" 
              placeholder="Поиск по сайту..." 
              id="searchInput"
              autocomplete="off"
            />
            <button class="search-close" id="searchClose" aria-label="Закрыть">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          
          <div class="search-filters">
            <button class="search-filter-btn active" data-filter="all">Все</button>
            <button class="search-filter-btn" data-filter="page">Страницы</button>
            <button class="search-filter-btn" data-filter="material">Материалы</button>
            <button class="search-filter-btn" data-filter="crossword">Кроссворды</button>
          </div>
          
          <div class="search-results" id="searchResults">
            <div class="search-empty">
              <div class="search-empty-icon">🔍</div>
              <div class="search-empty-text">Начните вводить для поиска</div>
              <div class="search-empty-hint">Попробуйте: "химия", "огэ", "кроссворды"</div>
            </div>
          </div>
          
          <div class="search-footer">
            <div class="search-hints">
              <div class="search-hint">
                <span class="search-hint-key">↑↓</span>
                <span>Навигация</span>
              </div>
              <div class="search-hint">
                <span class="search-hint-key">Enter</span>
                <span>Открыть</span>
              </div>
              <div class="search-hint">
                <span class="search-hint-key">Esc</span>
                <span>Закрыть</span>
              </div>
            </div>
            <div class="search-powered">Powered by Fuse.js</div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    modal = document.getElementById('searchModal');
    input = document.getElementById('searchInput');
    resultsContainer = document.getElementById('searchResults');
    closeBtn = document.getElementById('searchClose');
  }

  // Добавление кнопки поиска в навигацию
  function addSearchTrigger() {
    const nav = document.querySelector('.nav-list');
    if (!nav) return;

    const li = document.createElement('li');
    li.className = 'nav-search-wrap';
    li.innerHTML = `
      <button class="search-trigger" id="searchTrigger" aria-label="Открыть поиск">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <span class="search-trigger-label">Поиск</span>
        <span class="search-shortcut">Ctrl K</span>
      </button>
    `;
    nav.appendChild(li);
    triggerBtn = document.getElementById('searchTrigger');
  }

  // Обработчики событий
  function attachEventListeners() {
    // Добавляем кнопку в навигацию
    addSearchTrigger();

    // Открытие поиска
    if (triggerBtn) {
      triggerBtn.addEventListener('click', openSearch);
    }

    // Закрытие поиска
    closeBtn.addEventListener('click', closeSearch);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSearch();
    });

    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
      // Ctrl+K или Cmd+K для открытия
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }

      // ESC для закрытия
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeSearch();
      }

      // Навигация стрелками
      if (modal.classList.contains('active')) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          navigateResults(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          navigateResults(-1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          selectResult();
        }
      }
    });

    // Поиск при вводе
    input.addEventListener('input', debounce(handleSearch, 200));

    // Фильтры
    document.querySelectorAll('.search-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.search-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        handleSearch();
      });
    });
  }

  // Открытие поиска
  function openSearch() {
    modal.classList.add('active');
    input.focus();
    document.body.style.overflow = 'hidden';
  }

  // Закрытие поиска
  function closeSearch() {
    modal.classList.remove('active');
    input.value = '';
    resultsContainer.innerHTML = `
      <div class="search-empty">
        <div class="search-empty-icon">🔍</div>
        <div class="search-empty-text">Начните вводить для поиска</div>
        <div class="search-empty-hint">Попробуйте: "химия", "огэ", "кроссворды"</div>
      </div>
    `;
    document.body.style.overflow = '';
    selectedIndex = -1;
  }

  // Поиск
  function handleSearch() {
    const query = input.value.trim();

    if (!query) {
      showEmptyState(
        '🔍',
        'Что вы ищете?',
        '"химия" &bull; "кроссворд" &bull; "огэ" &bull; "8 класс"'
      );
      selectedIndex = -1;
      return;
    }

    // Валидация: слишком короткий запрос
    if (query.length < 2) {
      showEmptyState('✏️', 'Введите минимум 2 символа', 'Уточните запрос, чтобы найти нужное');
      shakeInput();
      selectedIndex = -1;
      return;
    }

    let results = fuse.search(query);

    // Фильтрация по типу
    if (currentFilter !== 'all') {
      results = results.filter(r => r.item.type === currentFilter);
    }

    // Сортировка по релевантности (меньший score = лучше)
    results.sort((a, b) => a.score - b.score);

    // Ограничиваем количество результатов
    results = results.slice(0, 10);

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
          <div class="search-empty-icon">😕</div>
          <div class="search-empty-text">Ничего не найдено</div>
          <div class="search-empty-hint">Попробуйте изменить запрос или другой фильтр</div>
        </div>
      `;
      selectedIndex = -1;
      return;
    }

    renderResults(results, query);
    selectedIndex = -1;
  }

  // Вспомогательная: показать пустое состояние
  function showEmptyState(icon, text, hint) {
    resultsContainer.innerHTML = `
      <div class="search-empty">
        <span class="search-empty-icon">${icon}</span>
        <div class="search-empty-text">${text}</div>
        <div class="search-empty-hint">${hint}</div>
      </div>
    `;
  }

  // Анимация встряски поля при коротком запросе
  function shakeInput() {
    const wrapper = input.closest('.search-input-wrapper');
    if (!wrapper) return;
    wrapper.style.animation = 'none';
    wrapper.offsetHeight; // reflow
    wrapper.style.animation = 'search-shake 0.35s ease';
    wrapper.addEventListener('animationend', () => { wrapper.style.animation = ''; }, { once: true });
  }

  // Отображение результатов
  function renderResults(results, query) {
    const html = results.map((result, index) => {
      const item = result.item;
      const icon = getIcon(item.type);

      // Определяем бейдж
      let badge = '';
      if (item.type === 'page') {
        badge = 'Страница';
      } else if (item.type === 'material') {
        badge = item.category || 'Материал';
      } else if (item.type === 'crossword') {
        badge = `${item.category} • ${item.grade} класс`;
      }

      // Подсветка совпадений в заголовке
      let title = item.title;
      if (result.matches) {
        const titleMatch = result.matches.find(m => m.key === 'title');
        if (titleMatch) {
          title = highlightMatches(item.title, titleMatch.indices);
        }
      }

      // Описание без подсветки для читаемости
      const description = item.description;

      return `
        <a href="${item.url}" class="search-result-item" data-index="${index}">
          <div class="search-result-icon ${item.type}">
            ${icon}
          </div>
          <div class="search-result-content">
            <div class="search-result-title">${title}</div>
            ${badge ? `<div class="search-result-badge">${badge}</div>` : ''}
            <div class="search-result-description">${description}</div>
          </div>
          <div class="search-result-arrow">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </a>
      `;
    }).join('');

    resultsContainer.innerHTML = html;
    selectedIndex = -1;
  }

  // Подсветка совпадений
  function highlightMatches(text, indices) {
    let result = '';
    let lastIndex = 0;

    indices.forEach(([start, end]) => {
      result += text.substring(lastIndex, start);
      result += `<span class="search-highlight">${text.substring(start, end + 1)}</span>`;
      lastIndex = end + 1;
    });

    result += text.substring(lastIndex);
    return result;
  }

  // Иконки для типов
  function getIcon(type) {
    const icons = {
      page: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>`,
      material: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>`,
      crossword: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>`
    };
    return icons[type] || icons.page;
  }

  // Навигация по результатам
  function navigateResults(direction) {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (items.length === 0) return;

    // Убираем выделение с текущего
    if (selectedIndex >= 0 && selectedIndex < items.length) {
      items[selectedIndex].classList.remove('selected');
    }

    // Вычисляем новый индекс
    selectedIndex += direction;
    if (selectedIndex < 0) selectedIndex = items.length - 1;
    if (selectedIndex >= items.length) selectedIndex = 0;

    // Выделяем новый
    items[selectedIndex].classList.add('selected');
    items[selectedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // Выбор результата
  function selectResult() {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (selectedIndex >= 0 && selectedIndex < items.length) {
      items[selectedIndex].click();
    }
  }

  // Debounce для оптимизации
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Инициализация при загрузке
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
