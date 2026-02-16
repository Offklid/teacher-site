// Google Drive API Parser для GitHub Pages
// API ключ ограничен по домену и работает только на вашем сайте
// См. GITHUB_PAGES_SOLUTION.md для информации о безопасности

const GOOGLE_API_KEY = 'AIzaSyDlN8OCFlV6z-1AnoGsn4NRU9KbIfOWHoY';

const DRIVE_FOLDERS = {
  chemistry: {
    grade8: '1jvcI2BwZh-PPCJoG6Umzb9bJU0xh-shg',
    grade9: '1A1cFzpty0pZCYiIdFhXL4fL9VcXWbs-5',
    grade10: '1dxT_hnoAW30Iiw7nrM1L4oeXPV4izUGF',
    grade11: '1IO7Unkcnnsg5kf1J7F3j0N6GwCDQ7aip'
  },
  biology: {
    grade8: '1vQ7idsW0paox9hm-DFUVXJ0LyOuNO9T0',
    grade9: '10QFgcpmel8yXIJBsCTjEEn-r_3pnbAcz',
    grade10: '1PKPKoPERgwZl-y6DfkiRaTqNO1cyWQqy',
    grade11: '1itBW8up3oQt6ssv_vV_4-34tKu5VjLiW'
  }
};

// Определение типа файла по расширению
function getFileType(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  const typeMap = {
    'pptx': 'presentation',
    'ppt': 'presentation',
    'pdf': 'document',
    'docx': 'document',
    'doc': 'document',
    'xlsx': 'chart',
    'xls': 'chart',
    'txt': 'document'
  };
  return typeMap[ext] || 'document';
}

// Определение иконки по типу файла
function getFileIcon(fileName) {
  const type = getFileType(fileName);
  const iconMap = {
    'presentation': 'presentation',
    'document': 'document',
    'chart': 'chart'
  };
  return iconMap[type] || 'document';
}

// Загрузка файлов из папки Google Drive
async function loadFilesFromDrive(folderId) {
  if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'ВСТАВЬТЕ_ВАШ_API_КЛЮЧ_СЮДА') {
    console.error('Google API ключ не настроен');
    return [];
  }

  if (!folderId || folderId.startsWith('ВСТАВЬТЕ_ID_ПАПКИ')) {
    console.warn('ID папки не настроен');
    return [];
  }

  try {
    const url = `https://www.googleapis.com/drive/v3/files?` +
      `q='${folderId}'+in+parents+and+trashed=false` +
      `&fields=files(id,name,mimeType,modifiedTime,webViewLink)` +
      `&key=${GOOGLE_API_KEY}` +
      `&orderBy=modifiedTime desc`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Преобразуем файлы в формат для отображения
    return data.files.map(file => ({
      title: file.name.replace(/\.[^/.]+$/, ''), // Убираем расширение
      description: `Обновлено: ${formatDate(file.modifiedTime)}`,
      type: getFileType(file.name),
      driveId: file.id,
      date: file.modifiedTime,
      icon: getFileIcon(file.name),
      webViewLink: file.webViewLink
    }));
  } catch (error) {
    console.error('Ошибка загрузки файлов из Google Drive:', error);
    return [];
  }
}

// Отображение материалов с автозагрузкой из Drive
async function displayMaterialsFromDrive(subject, grade, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Показываем индикатор загрузки
  container.innerHTML = `
    <div class="loading-materials">
      <div class="loading-spinner"></div>
      <p>Загрузка материалов...</p>
    </div>
  `;

  const folderId = DRIVE_FOLDERS[subject]?.[`grade${grade}`];

  
  const materialsData = await loadFilesFromDrive(folderId);
  
  if (materialsData.length === 0) {
    container.innerHTML = `
      <div class="no-materials">
        <p>Материалы скоро появятся</p>
      </div>
    `;
    return;
  }

  container.innerHTML = materialsData.map(material => {
    const viewLink = `https://drive.google.com/file/d/${material.driveId}/view`;
    const downloadLink = `https://drive.google.com/uc?export=download&id=${material.driveId}`;
    
    return `
      <div class="material-card" data-aos="fade-up">
        <div class="material-card-icon">
          ${getIconSVG(material.icon)}
        </div>
        <div class="material-card-body">
          <h4>${material.title}</h4>
          <p class="material-description">${material.description}</p>
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

// Функция для получения SVG иконок (копия из materials.js)
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
