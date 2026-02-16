// Учебные материалы - Google Drive
// Инструкция для учителя:
// 1. Загрузите файл на Google Drive
// 2. Нажмите правой кнопкой → "Получить ссылку" → "Доступ для всех, у кого есть ссылка"
// 3. Скопируйте ID файла из ссылки (часть между /d/ и /view)
// 4. Добавьте информацию о файле в соответствующий раздел ниже

const materials = {
  chemistry: {
    grade8: [
      {
        title: "Периодическая система элементов",
        description: "Презентация по теме с таблицей Менделеева",
        type: "presentation",
        driveId: "ВСТАВЬТЕ_ID_ФАЙЛА_СЮДА", // Пример: 1abc2def3ghi4jkl5mno
        date: "2025-02-15",
        icon: "presentation"
      },
      {
        title: "Химические реакции",
        description: "Конспект урока с примерами реакций",
        type: "document",
        driveId: "ВСТАВЬТЕ_ID_ФАЙЛА_СЮДА",
        date: "2025-02-10",
        icon: "document"
      },
      {
        title: "Тест: Строение атома",
        description: "Проверочная работа по теме",
        type: "test",
        driveId: "ВСТАВЬТЕ_ID_ФАЙЛА_СЮДА",
        date: "2025-02-08",
        icon: "chart"
      },
      {
        title: "Лабораторная работа №1",
        description: "Изучение свойств кислот и оснований",
        type: "lab",
        driveId: "ВСТАВЬТЕ_ID_ФАЙЛА_СЮДА",
        date: "2025-02-05",
        icon: "flask"
      }
      // Добавляйте новые материалы здесь
    ],
    grade9: [
      // Материалы для 9 класса
    ],
    grade10: [
      // Материалы для 10 класса
    ],
    grade11: [
      // Материалы для 11 класса
    ]
  },
  biology: {
    grade8: [
      {
        title: "Строение клетки",
        description: "Презентация с иллюстрациями",
        type: "presentation",
        driveId: "ВСТАВЬТЕ_ID_ФАЙЛА_СЮДА",
        date: "2025-02-12",
        icon: "presentation"
      }
      // Добавляйте новые материалы здесь
    ],
    grade9: [
      // Материалы для 9 класса
    ],
    grade10: [
      // Материалы для 10 класса
    ],
    grade11: [
      // Материалы для 11 класса
    ]
  }
};

// Функция для получения ссылки на просмотр файла
function getViewLink(driveId) {
  return `https://drive.google.com/file/d/${driveId}/view`;
}

// Функция для получения ссылки на скачивание файла
function getDownloadLink(driveId) {
  return `https://drive.google.com/uc?export=download&id=${driveId}`;
}

// Функция для получения иконки по типу
function getIconSVG(iconType) {
  const icons = {
    presentation: `
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    `,
    document: `
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="12" y1="9" x2="8" y2="9"/>
      </svg>
    `,
    chart: `
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    `,
    flask: `
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 3v6l-3 9h12l-3-9V3"/>
        <path d="M6 18h12"/>
        <path d="M7 21h10"/>
      </svg>
    `
  };
  return icons[iconType] || icons.document;
}

// Функция для отображения материалов на странице
function displayMaterials(subject, grade, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const materialsData = materials[subject]?.[`grade${grade}`] || [];
  
  if (materialsData.length === 0) {
    container.innerHTML = `
      <div class="no-materials">
        <p>Материалы скоро появятся</p>
      </div>
    `;
    return;
  }

  container.innerHTML = materialsData.map(material => {
    const viewLink = getViewLink(material.driveId);
    const downloadLink = getDownloadLink(material.driveId);
    
    return `
      <div class="material-card" data-aos="fade-up">
        <div class="material-card-icon">
          ${getIconSVG(material.icon)}
        </div>
        <div class="material-card-body">
          <h4>${material.title}</h4>
          <p class="material-description">${material.description}</p>
          <p class="material-date">${formatDate(material.date)}</p>
          <div class="material-actions">
            <a href="${viewLink}" target="_blank" class="material-btn material-btn-view">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Просмотр
            </a>
            <a href="${downloadLink}" class="material-btn material-btn-download">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Скачать
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Функция для форматирования даты
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('ru-RU', options);
}

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { materials, displayMaterials };
}
