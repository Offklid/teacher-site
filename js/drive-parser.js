// Google Drive API Parser для GitHub Pages
// API ключ ограничен по домену и работает только на вашем сайте

const GOOGLE_API_KEY = 'AIzaSyDlN8OCFlV6z-1AnoGsn4NRU9KbIfOWHoY';

const DRIVE_FOLDERS = {
  chemistry: {
    grade8:  '1jvcI2BwZh-PPCJoG6Umzb9bJU0xh-shg',
    grade9:  '1A1cFzpty0pZCYiIdFhXL4fL9VcXWbs-5',
    grade10: '1dxT_hnoAW30Iiw7nrM1L4oeXPV4izUGF',
    grade11: '1IO7Unkcnnsg5kf1J7F3j0N6GwCDQ7aip'
  },
  biology: {
    grade8:  '1vQ7idsW0paox9hm-DFUVXJ0LyOuNO9T0',
    grade9:  '10QFgcpmel8yXIJBsCTjEEn-r_3pnbAcz',
    grade10: '1PKPKoPERgwZl-y6DfkiRaTqNO1cyWQqy',
    grade11: '1itBW8up3oQt6ssv_vV_4-34tKu5VjLiW'
  }
};

// ─── Утилиты ────────────────────────────────────────────────────────────────

// Русское склонение: plural(3, 'файл', 'файла', 'файлов')
function plural(n, one, few, many) {
  var mod10  = n % 10;
  var mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11)                           return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}


function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase();
  if (['pptx','ppt'].includes(ext))            return 'presentation';
  if (['pdf','docx','doc','txt'].includes(ext)) return 'document';
  if (['xlsx','xls'].includes(ext))             return 'chart';
  return 'document';
}

function getIconSVG(type) {
  const icons = {
    presentation: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>`,
    document: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="12" y1="9" x2="8" y2="9"/>
    </svg>`,
    chart: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>`
  };
  return icons[type] || icons.document;
}

// ─── Загрузка данных из Drive ────────────────────────────────────────────────

async function fetchFolderContents(folderId) {
  const url = 'https://www.googleapis.com/drive/v3/files'
    + '?q=' + encodeURIComponent("'" + folderId + "' in parents and trashed=false")
    + '&fields=files(id,name,mimeType,modifiedTime,webViewLink)'
    + '&key=' + GOOGLE_API_KEY
    + '&orderBy=name';

  const res = await fetch(url);
  if (!res.ok) throw new Error('Drive API error: ' + res.status);
  const data = await res.json();
  return data.files || [];
}

// Рекурсивная загрузка: возвращает массив {isFolder, title, driveId, items?, icon?, date?, ...}
async function loadFilesFromDrive(folderId) {
  const files = await fetchFolderContents(folderId);

  const folders = files.filter(f => f.mimeType === 'application/vnd.google-apps.folder');
  const docs    = files.filter(f => f.mimeType !== 'application/vnd.google-apps.folder');

  // Загружаем содержимое подпапок параллельно
  const subfolderData = await Promise.all(
    folders.map(async f => ({
      isFolder: true,
      title: f.name,
      driveId: f.id,
      date: f.modifiedTime,
      items: await loadFilesFromDrive(f.id)
    }))
  );

  const fileData = docs.map(f => ({
    isFolder: false,
    title: f.name.replace(/\.[^/.]+$/, ''),
    description: 'Обновлено: ' + formatDate(f.modifiedTime),
    icon: getFileIcon(f.name),
    driveId: f.id,
    date: f.modifiedTime,
    webViewLink: f.webViewLink
  }));

  // Папки сверху, файлы снизу
  return [...subfolderData, ...fileData];
}

// ─── Рендер ──────────────────────────────────────────────────────────────────

// Переключение папки (доступна глобально — вызывается из onclick)
window.toggleDriveFolder = function(id) {
  var content = document.getElementById(id);
  var chevron = document.getElementById('chev-' + id);
  var folder  = content && content.closest('.material-folder');
  if (!content) return;

  var isOpen = content.style.display !== 'none';

  if (isOpen) {
    content.style.display = 'none';
    if (chevron) chevron.style.transform = '';
    if (folder)  folder.classList.remove('is-open');
  } else {
    content.style.display = 'block';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
    if (folder)  folder.classList.add('is-open');
  }
};

// Рендер одного файла
function renderFileCard(item) {
  var view     = 'https://drive.google.com/file/d/' + item.driveId + '/view';
  var download = 'https://drive.google.com/uc?export=download&id=' + item.driveId;
  return '<div class="material-card" data-aos="fade-up">'
    + '<div class="material-card-icon">' + getIconSVG(item.icon) + '</div>'
    + '<div class="material-card-body">'
    + '<h4>' + item.title + '</h4>'
    + '<p class="material-description">' + item.description + '</p>'
    + '<div class="material-actions">'
    + '<a href="' + view + '" target="_blank" rel="noopener noreferrer" class="material-btn material-btn-view">'
    + '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">'
    + '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>'
    + '<circle cx="12" cy="12" r="3"/>'
    + '</svg>Просмотр</a>'
    + '<a href="' + download + '" class="material-btn material-btn-download">'
    + '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">'
    + '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>'
    + '<polyline points="7 10 12 15 17 10"/>'
    + '<line x1="12" y1="15" x2="12" y2="3"/>'
    + '</svg>Скачать</a>'
    + '</div></div></div>';
}

// Считаем общее кол-во ФАЙЛОВ (не папок) рекурсивно
function countFiles(items) {
  var total = 0;
  items.forEach(function(item) {
    if (item.isFolder) total += countFiles(item.items);
    else total += 1;
  });
  return total;
}

// Рендер папки
function renderFolderBlock(item) {
  var contentId  = 'drv-' + item.driveId;
  var totalFiles = countFiles(item.items);
  var foldersInside = item.items.filter(function(i) { return i.isFolder; }).length;

  // Подпись: «3 файла» или «2 папки · 5 файлов»
  var metaParts = [];
  if (foldersInside) metaParts.push(foldersInside + ' ' + plural(foldersInside, 'папка','папки','папок'));
  metaParts.push(totalFiles + ' ' + plural(totalFiles, 'файл','файла','файлов'));
  var meta = metaParts.join(' &middot; ');

  var inner = item.items.length
    ? renderItemsList(item.items)
    : '<div class="folder-empty">'
      + '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">'
      + '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>'
      + '<polyline points="13 2 13 9 20 9"/>'
      + '</svg>В папке пока нет файлов</div>';

  return '<div class="material-folder" data-aos="fade-up">'
    + '<div class="material-folder-header" onclick="toggleDriveFolder(\'' + contentId + '\')" role="button" tabindex="0" aria-expanded="false">'

    // Icon
    + '<div class="folder-icon-wrap">'
    + '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">'
    + '<path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>'
    + '</svg></div>'

    // Text
    + '<div class="folder-text">'
    + '<span class="folder-title">' + item.title + '</span>'
    + '<span class="folder-meta">' + meta + '</span>'
    + '</div>'

    // Badge
    + '<span class="folder-badge">'
    + '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">'
    + '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>'
    + '<polyline points="14 2 14 8 20 8"/>'
    + '</svg>' + totalFiles
    + '</span>'

    // Chevron
    + '<svg id="chev-' + contentId + '" class="folder-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">'
    + '<polyline points="6 9 12 15 18 9"/>'
    + '</svg>'

    + '</div>'
    + '<div class="material-folder-content" id="' + contentId + '" style="display:none;">'
    + inner
    + '</div>'
    + '</div>';
}


function renderItemsList(items) {
  // Папки внутри папки — в виде вложенной сетки
  return '<div class="materials-grid materials-grid--nested">'
    + items.map(function(item) {
        return item.isFolder ? renderFolderBlock(item) : renderFileCard(item);
      }).join('')
    + '</div>';
}

// ─── Главная функция ─────────────────────────────────────────────────────────

async function displayMaterialsFromDrive(subject, grade, containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  // Спиннер
  container.innerHTML = '<div class="loading-materials">'
    + '<div class="loading-spinner"></div>'
    + '<p>Загрузка материалов...</p>'
    + '</div>';

  var folderId = (DRIVE_FOLDERS[subject] || {})[('grade' + grade)];
  if (!folderId) {
    container.innerHTML = '<div class="no-materials"><p>Папка не настроена</p></div>';
    return;
  }

  try {
    var items = await loadFilesFromDrive(folderId);

    if (!items.length) {
      container.innerHTML = '<div class="no-materials"><p>Материалы скоро появятся</p></div>';
      return;
    }

    // Вставляем напрямую в materials-grid (без лишней обёртки)
    container.innerHTML = items.map(function(item) {
      return item.isFolder ? renderFolderBlock(item) : renderFileCard(item);
    }).join('');

  } catch (err) {
    console.error('Drive error:', err);
    container.innerHTML = '<div class="no-materials"><p>Ошибка загрузки: ' + err.message + '</p></div>';
  }
}
