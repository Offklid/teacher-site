// Сайт учителя химии и биологии
console.log('Сайт учителя загружен');

// ========== Мобильное бургер-меню ==========
const initMobileMenu = () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-list a');
  
  if (!burgerMenu || !navList) return;
  
  // Открытие/закрытие меню
  burgerMenu.addEventListener('click', () => {
    const isActive = burgerMenu.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Обновление aria-атрибута для доступности
    burgerMenu.setAttribute('aria-expanded', isActive);
    burgerMenu.setAttribute('aria-label', isActive ? 'Закрыть меню' : 'Открыть меню');
  });
  
  // Закрытие меню при клике на ссылку
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navList.classList.remove('active');
      document.body.classList.remove('menu-open');
      burgerMenu.setAttribute('aria-expanded', 'false');
      burgerMenu.setAttribute('aria-label', 'Открыть меню');
    });
  });
  
  // Закрытие меню при клике вне его области
  document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !navList.contains(e.target)) {
      burgerMenu.classList.remove('active');
      navList.classList.remove('active');
      document.body.classList.remove('menu-open');
      burgerMenu.setAttribute('aria-expanded', 'false');
      burgerMenu.setAttribute('aria-label', 'Открыть меню');
    }
  });
  
  // Закрытие меню при нажатии ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('active')) {
      burgerMenu.classList.remove('active');
      navList.classList.remove('active');
      document.body.classList.remove('menu-open');
      burgerMenu.setAttribute('aria-expanded', 'false');
      burgerMenu.setAttribute('aria-label', 'Открыть меню');
    }
  });
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
  initCalendar();
});

// ========== Календарь событий ==========
const initCalendar = () => {
  const calendarContainer = document.querySelector('.calendar-days');
  if (!calendarContainer) return;
  
  // Примерные события (позже можно загружать из JSON или API)
  const events = [
    {
      id: 1,
      title: 'Контрольная работа по химии',
      description: '8 класс - Тема: Периодическая система элементов',
      date: new Date(2025, 1, 20), // Февраль 20, 2025
      type: 'test'
    },
    {
      id: 2,
      title: 'Олимпиада по биологии',
      description: 'Школьный этап для 9-11 классов',
      date: new Date(2025, 1, 25),
      type: 'olympiad'
    },
    {
      id: 3,
      title: 'Экскурсия в музей естествознания',
      description: '10 класс - Выезд в 9:00',
      date: new Date(2025, 1, 28),
      type: 'excursion'
    },
    {
      id: 4,
      title: 'Сдача лабораторных работ',
      description: 'Дедлайн для 9 класса',
      date: new Date(2025, 1, 18),
      type: 'deadline'
    },
    {
      id: 5,
      title: 'Контрольная работа по биологии',
      description: '11 класс - Генетика',
      date: new Date(2025, 1, 22),
      type: 'test'
    }
  ];
  
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  
  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    
    const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Понедельник = 0
    const lastDayDate = lastDay.getDate();
    const prevLastDayDate = prevLastDay.getDate();
    
    // Обновляем заголовок
    const monthDisplay = document.querySelector('.calendar-current-month');
    if (monthDisplay) {
      monthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    let days = '';
    
    // Предыдущий месяц
    for (let i = firstDayIndex; i > 0; i--) {
      days += `<div class="calendar-day other-month">
        <span class="calendar-day-number">${prevLastDayDate - i + 1}</span>
      </div>`;
    }
    
    // Текущий месяц
    for (let i = 1; i <= lastDayDate; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isToday = date.toDateString() === new Date().toDateString();
      
      // Проверяем события на этот день
      const dayEvents = events.filter(event => 
        event.date.toDateString() === date.toDateString()
      );
      
      const hasEvent = dayEvents.length > 0;
      const todayClass = isToday ? 'today' : '';
      const eventClass = hasEvent ? 'has-event' : '';
      
      let eventDots = '';
      if (hasEvent) {
        eventDots = '<div class="calendar-day-events">';
        dayEvents.forEach(event => {
          eventDots += `<span class="calendar-event-dot ${event.type}"></span>`;
        });
        eventDots += '</div>';
      }
      
      days += `<div class="calendar-day ${todayClass} ${eventClass}" data-date="${date.toISOString()}">
        <span class="calendar-day-number">${i}</span>
        ${eventDots}
      </div>`;
    }
    
    // Следующий месяц
    const remainingDays = 42 - (firstDayIndex + lastDayDate); // 6 недель = 42 дня
    for (let i = 1; i <= remainingDays; i++) {
      days += `<div class="calendar-day other-month">
        <span class="calendar-day-number">${i}</span>
      </div>`;
    }
    
    calendarContainer.innerHTML = days;
    
    // Рендерим список событий
    renderEventsList();
  };
  
  const renderEventsList = () => {
    const eventsList = document.querySelector('.events-list-container');
    if (!eventsList) return;
    
    // Фильтруем события текущего месяца
    const monthEvents = events.filter(event => 
      event.date.getMonth() === currentMonth && 
      event.date.getFullYear() === currentYear
    ).sort((a, b) => a.date - b.date);
    
    if (monthEvents.length === 0) {
      eventsList.innerHTML = '<p style="color: var(--color-text-muted); text-align: center;">Нет событий в этом месяце</p>';
      return;
    }
    
    const typeNames = {
      test: 'Контрольная',
      olympiad: 'Олимпиада',
      excursion: 'Экскурсия',
      deadline: 'Дедлайн'
    };
    
    let eventsHTML = '';
    monthEvents.forEach(event => {
      const dateStr = event.date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long' 
      });
      
      eventsHTML += `
        <div class="event-card ${event.type}">
          <div class="event-header">
            <h4 class="event-title">${event.title}</h4>
            <span class="event-date">${dateStr}</span>
          </div>
          <p class="event-description">${event.description}</p>
          <span class="event-type-badge ${event.type}">${typeNames[event.type]}</span>
        </div>
      `;
    });
    
    eventsList.innerHTML = eventsHTML;
  };
  
  // Навигация по месяцам
  const prevBtn = document.querySelector('.calendar-prev');
  const nextBtn = document.querySelector('.calendar-next');
  const todayBtn = document.querySelector('.calendar-today');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  }
  
  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      const today = new Date();
      currentMonth = today.getMonth();
      currentYear = today.getFullYear();
      renderCalendar();
    });
  }
  
  // Первоначальный рендер
  renderCalendar();
};

// ========== Анимации при скролле ==========
const initScrollAnimations = () => {
  // Проверка поддержки Intersection Observer
  if (!('IntersectionObserver' in window)) {
    // Если не поддерживается, показываем все элементы сразу
    document.querySelectorAll('.fade-in-up, .fade-in, .scale-in').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }
  
  // Создаем observer для отслеживания элементов
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Можно отключить наблюдение после появления (для производительности)
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Элемент считается видимым, когда 10% в viewport
    rootMargin: '0px 0px -50px 0px' // Триггер чуть раньше появления в viewport
  });
  
  // Наблюдаем за всеми элементами с классами анимации
  document.querySelectorAll('.fade-in-up, .fade-in, .scale-in').forEach(el => {
    observer.observe(el);
  });
};

// ========== Cusdis комментарии ==========
// Ждём, пока Cusdis загрузится и отрисует комментарии
window.addEventListener('load', function () {
    const iframe = document.querySelector('#cusdis_thread iframe');
    if (!iframe) return;

    // Cusdis отправляет postMessage с высотой
    window.addEventListener('message', function (event) {
      if (event.origin !== 'https://cusdis.com') return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'resize' && data.height) {
          iframe.style.height = data.height + 'px';
        }
      } catch (e) {}
    });

    // Принудительно просим Cusdis отправить текущую высоту
    iframe.contentWindow?.postMessage(JSON.stringify({ action: 'getHeight' }), '*');
  });
