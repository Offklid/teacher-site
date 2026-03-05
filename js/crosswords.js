// ============================================================
// Crossword Engine — полностью переработан
// ============================================================

// ---- Global state ------------------------------------------
let currentFilters = { subject: 'all', grade: 'all' };
let currentCrossword = null; // данные из crosswordsData
let placedWords = [];        // размещённые слова после генерации
let gridData = null;         // двумерный массив ячеек
let gridRows = 0;
let gridCols = 0;
let activeCell = null;       // { row, col }
let activeDirection = 'across';

// ---- Helpers -----------------------------------------------
const PADDING = 2; // отступ вокруг сетки

function cloneGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

/**
 * Структура ячейки gridData[r][c]:
 * {
 *   letter: 'А',      // правильная буква
 *   wordIds: Set,     // индексы в placedWords, которым принадлежит ячейка
 *   number: null|n,   // номер слова (авто-нумерация)
 * }
 */

// ============================================================
// АЛГОРИТМ ГЕНЕРАЦИИ
// ============================================================

/**
 * Производит попытку разместить слово на сетке, найдя пересечения.
 * Возвращает { row, col, direction } если удалось, иначе null.
 */
function tryPlace(grid, rows, cols, word, existingWords) {
  const candidates = [];

  for (let wi = 0; wi < existingWords.length; wi++) {
    const ew = existingWords[wi];
    const ewWord = ew.word;
    const ewDir = ew.direction;
    const ewRow = ew.row;
    const ewCol = ew.col;

    // Пробуем разместить новое слово перпендикулярно
    const newDir = ewDir === 'across' ? 'down' : 'across';

    for (let ei = 0; ei < ewWord.length; ei++) {
      for (let ni = 0; ni < word.length; ni++) {
        if (ewWord[ei] !== word[ni]) continue;

        // Точка пересечения на сетке
        let intRow, intCol;
        if (ewDir === 'across') {
          intRow = ewRow;
          intCol = ewCol + ei;
        } else {
          intRow = ewRow + ei;
          intCol = ewCol;
        }

        // Начало нового слова
        let newRow, newCol;
        if (newDir === 'across') {
          newRow = intRow;
          newCol = intCol - ni;
        } else {
          newRow = intRow - ni;
          newCol = intCol;
        }

        if (canPlace(grid, rows, cols, word, newRow, newCol, newDir, intRow, intCol)) {
          // Оцениваем: больше пересечений — лучше
          const score = countNewIntersections(grid, rows, cols, word, newRow, newCol, newDir);
          candidates.push({ row: newRow, col: newCol, direction: newDir, score });
        }
      }
    }
  }

  if (candidates.length === 0) return null;

  // Выбираем кандидата с максимальным количеством (новых) пересечений,
  // при равенстве — первый
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0];
}

function canPlace(grid, rows, cols, word, startRow, startCol, direction, skipIntRow, skipIntCol) {
  const dr = direction === 'down' ? 1 : 0;
  const dc = direction === 'across' ? 1 : 0;

  // Проверяем, что слово помещается в сетку
  const endRow = startRow + dr * (word.length - 1);
  const endCol = startCol + dc * (word.length - 1);
  if (startRow < 0 || startCol < 0 || endRow >= rows || endCol >= cols) return false;

  // Клетка перед началом должна быть пустой (иначе слова «сольются»)
  const prevR = startRow - dr;
  const prevC = startCol - dc;
  if (prevR >= 0 && prevC >= 0 && grid[prevR][prevC] !== null) return false;

  // Клетка после конца должна быть пустой
  const nextR = endRow + dr;
  const nextC = endCol + dc;
  if (nextR < rows && nextC < cols && grid[nextR][nextC] !== null) return false;

  for (let i = 0; i < word.length; i++) {
    const r = startRow + dr * i;
    const c = startCol + dc * i;
    const cell = grid[r][c];
    const isIntersection = r === skipIntRow && c === skipIntCol;

    if (cell === null) {
      // Соседние клетки в перпендикулярном направлении должны быть пустыми,
      // если текущая ячейка не будет пересечением (чтобы не создавать случайных слов)
      if (!isIntersection) {
        const sideR1 = r - dc, sideC1 = c - dr;
        const sideR2 = r + dc, sideC2 = c + dr;
        if (sideR1 >= 0 && sideC1 >= 0 && grid[sideR1][sideC1] !== null) return false;
        if (sideR2 < rows && sideC2 < cols && grid[sideR2][sideC2] !== null) return false;
      }
    } else {
      // Ячейка занята — буква должна совпадать
      if (cell.letter !== word[i]) return false;
      // И это допустимо только в точке пересечения
      if (!isIntersection) return false;
    }
  }
  return true;
}

function countNewIntersections(grid, rows, cols, word, startRow, startCol, direction) {
  const dr = direction === 'down' ? 1 : 0;
  const dc = direction === 'across' ? 1 : 0;
  let count = 0;
  for (let i = 0; i < word.length; i++) {
    const r = startRow + dr * i;
    const c = startCol + dc * i;
    if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] !== null) count++;
  }
  return count;
}

function placeWord(grid, word, startRow, startCol, direction, wordIndex) {
  const dr = direction === 'down' ? 1 : 0;
  const dc = direction === 'across' ? 1 : 0;
  for (let i = 0; i < word.length; i++) {
    const r = startRow + dr * i;
    const c = startCol + dc * i;
    if (grid[r][c] === null) {
      grid[r][c] = { letter: word[i], wordIds: new Set(), number: null };
    }
    grid[r][c].wordIds.add(wordIndex);
  }
}

/**
 * Fallback: найти свободное место для слова, не связанного пересечениями.
 * Ищем строку или столбец, полностью свободный вокруг ограничивающего прямоугольника.
 */
function findFreeSlot(grid, rows, cols, word, placed) {
  if (placed.length === 0) return null;

  // Текущие границы размещённых слов
  let minR = rows, maxR = 0, minC = cols, maxC = 0;
  for (const pw of placed) {
    const dr = pw.direction === 'down' ? 1 : 0;
    const dc = pw.direction === 'across' ? 1 : 0;
    const er = pw.row + dr * (pw.word.length - 1);
    const ec = pw.col + dc * (pw.word.length - 1);
    minR = Math.min(minR, pw.row); maxR = Math.max(maxR, er);
    minC = Math.min(minC, pw.col); maxC = Math.max(maxC, ec);
  }

  const GAP = 2; // зазор между изолированным словом и существующей группой

  // Пробуем разместить горизонтально ниже текущего блока
  const tryRow = maxR + GAP;
  const tryCol = Math.floor((minC + maxC - word.length) / 2);
  if (tryRow < rows && tryCol >= 0 && tryCol + word.length <= cols) {
    // Проверяем соседей
    let ok = true;
    for (let i = 0; i < word.length; i++) {
      if (grid[tryRow][tryCol + i] !== null) { ok = false; break; }
      // строки выше и ниже должны быть пусты
      if (tryRow > 0 && grid[tryRow - 1][tryCol + i] !== null) { ok = false; break; }
      if (tryRow < rows - 1 && grid[tryRow + 1][tryCol + i] !== null) { ok = false; break; }
    }
    // Соседи слева/справа
    if (ok && tryCol > 0 && grid[tryRow][tryCol - 1] !== null) ok = false;
    if (ok && tryCol + word.length < cols && grid[tryRow][tryCol + word.length] !== null) ok = false;
    if (ok) return { row: tryRow, col: tryCol, direction: 'across' };
  }

  // Пробуем разместить вертикально правее текущего блока
  const tryCol2 = maxC + GAP;
  const tryRow2 = Math.floor((minR + maxR - word.length) / 2);
  if (tryCol2 < cols && tryRow2 >= 0 && tryRow2 + word.length <= rows) {
    let ok = true;
    for (let i = 0; i < word.length; i++) {
      if (grid[tryRow2 + i][tryCol2] !== null) { ok = false; break; }
      if (tryCol2 > 0 && grid[tryRow2 + i][tryCol2 - 1] !== null) { ok = false; break; }
      if (tryCol2 < cols - 1 && grid[tryRow2 + i][tryCol2 + 1] !== null) { ok = false; break; }
    }
    if (ok && tryRow2 > 0 && grid[tryRow2 - 1][tryCol2] !== null) ok = false;
    if (ok && tryRow2 + word.length < rows && grid[tryRow2 + word.length][tryCol2] !== null) ok = false;
    if (ok) return { row: tryRow2, col: tryCol2, direction: 'down' };
  }

  return null; // не удалось найти место
}

/**
 * Вспомогательная: одна попытка генерации с конкретным стартовым словом.
 */
function tryGenerate(sorted, startIdx, GRID) {
  let grid = cloneGrid(GRID, GRID);
  const placed = [];

  const firstWord = sorted[startIdx];
  const firstRow = Math.floor(GRID / 2);
  const firstCol = Math.floor((GRID - firstWord.length) / 2);
  placeWord(grid, firstWord, firstRow, firstCol, 'across', 0);
  placed.push({ word: firstWord, row: firstRow, col: firstCol, direction: 'across' });

  for (let i = 0; i < sorted.length; i++) {
    if (i === startIdx) continue;
    const word = sorted[i];
    const pos = tryPlace(grid, GRID, GRID, word, placed);
    if (pos) {
      placeWord(grid, word, pos.row, pos.col, pos.direction, placed.length);
      placed.push({ word, row: pos.row, col: pos.col, direction: pos.direction });
    }
  }
  return { grid, placed };
}

/**
 * Главная функция: размещает слова на сетке и возвращает результат.
 * @param {string[]} wordList — список слов (заглавные буквы)
 * @returns {{ grid, rows, cols, placedWords }}
 */
function generateCrosswordLayout(wordList) {
  // Дедупликация
  const uniqueWords = [...new Set(wordList)];
  // Сортируем: сначала длинные
  const sorted = [...uniqueWords].sort((a, b) => b.length - a.length);

  const GRID = 50;

  // Пробуем несколько стартовых слов; выбираем лучший результат
  let bestGrid = null, bestPlaced = [];
  const attempts = Math.min(sorted.length, 4);
  for (let si = 0; si < attempts; si++) {
    const { grid, placed } = tryGenerate(sorted, si, GRID);
    if (placed.length > bestPlaced.length) {
      bestGrid = grid;
      bestPlaced = placed;
    }
    if (bestPlaced.length === sorted.length) break; // идеально
  }

  const grid = bestGrid;
  const placed = bestPlaced;

  // Fallback: пытаемся разместить пропущенные слова рядом с уже существующими
  const placedWords_set = new Set(placed.map(p => p.word));
  for (const word of sorted) {
    if (placedWords_set.has(word)) continue;
    // Ищем свободную строку или колонку (полное размещение без пересечений)
    const fb = findFreeSlot(grid, GRID, GRID, word, placed);
    if (fb) {
      placeWord(grid, word, fb.row, fb.col, fb.direction, placed.length);
      placed.push({ word, row: fb.row, col: fb.col, direction: fb.direction });
      placedWords_set.add(word);
    }
  }

  // ----- Обрезаем пустые края и добавляем PADDING
  let minR = GRID, maxR = 0, minC = GRID, maxC = 0;
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (grid[r][c] !== null) {
        minR = Math.min(minR, r);
        maxR = Math.max(maxR, r);
        minC = Math.min(minC, c);
        maxC = Math.max(maxC, c);
      }
    }
  }

  const usedRows = maxR - minR + 1;
  const usedCols = maxC - minC + 1;
  const newRows = usedRows + PADDING * 2;
  const newCols = usedCols + PADDING * 2;
  const offsetR = PADDING - minR;
  const offsetC = PADDING - minC;

  const finalGrid = cloneGrid(newRows, newCols);
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (grid[r][c] !== null) {
        finalGrid[r + offsetR][c + offsetC] = grid[r][c];
      }
    }
  }

  // Сдвигаем координаты слов
  const finalPlaced = placed.map(pw => ({
    ...pw,
    row: pw.row + offsetR,
    col: pw.col + offsetC,
  }));

  // Карта: слово → оригинальный объект из crosswordsData
  return { grid: finalGrid, rows: newRows, cols: newCols, placedWords: finalPlaced };
}

/**
 * Авто-нумерация: сканируем сетку сверху вниз, слева направо.
 * Ячейка получает номер, если в ней начинается хотя бы одно слово.
 */
function autoNumber(finalGrid, finalRows, finalCols, finalPlaced) {
  let n = 1;
  // Для каждой размещённой линии слов фиксируем, что она начинается в (row, col)
  const wordStartSet = new Map(); // ключ "r,c,dir" → индекс слова в finalPlaced

  finalPlaced.forEach((pw, idx) => {
    wordStartSet.set(`${pw.row},${pw.col},${pw.direction}`, idx);
  });

  // Нумерация по порядку обхода сетки
  for (let r = 0; r < finalRows; r++) {
    for (let c = 0; c < finalCols; c++) {
      if (finalGrid[r][c] === null) continue;

      const acrossStart = wordStartSet.has(`${r},${c},across`);
      const downStart = wordStartSet.has(`${r},${c},down`);

      if (acrossStart || downStart) {
        finalGrid[r][c].number = n;

        // Проставляем номер в placedWords
        if (acrossStart) {
          finalPlaced[wordStartSet.get(`${r},${c},across`)].number = n;
        }
        if (downStart) {
          finalPlaced[wordStartSet.get(`${r},${c},down`)].number = n;
        }
        n++;
      }
    }
  }
}

// ============================================================
// UI — список кроссвордов
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  displayCrosswordsList();

  const urlParams = new URLSearchParams(window.location.search);
  const crosswordId = urlParams.get('id');
  if (crosswordId) {
    setTimeout(() => openCrossword(parseInt(crosswordId)), 150);
  }
});

function displayCrosswordsList() {
  const container = document.getElementById('crosswords-list');
  const crosswords = filterCrosswordsData(currentFilters.subject, currentFilters.grade);

  if (crosswords.length === 0) {
    container.innerHTML = `<div class="no-materials"><p>Кроссворды скоро появятся</p></div>`;
    return;
  }

  container.innerHTML = crosswords.map(cw => `
    <div class="crossword-card" onclick="openCrossword(${cw.id})" data-aos="fade-up">
      <div class="crossword-card-header">
        <h3>${cw.title}</h3>
        <span class="crossword-badge badge-${cw.subject}">
          ${cw.subject === 'chemistry' ? 'Химия' : 'Биология'}
        </span>
      </div>
      <p>${cw.description}</p>
      <div class="crossword-meta">
        <div class="crossword-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
          ${cw.grade} класс
        </div>
        <div class="crossword-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          ${cw.words.length} слов
        </div>
        <div class="crossword-meta-item difficulty-${cw.difficulty}">
          ${cw.difficulty === 'easy' ? '⭐ Лёгкий' : cw.difficulty === 'medium' ? '⭐⭐ Средний' : '⭐⭐⭐ Сложный'}
        </div>
      </div>
    </div>
  `).join('');
}

function filterCrosswords(value, type, element) {
  currentFilters[type] = value;
  const groupIndex = type === 'subject' ? 1 : 2;
  document.querySelectorAll(`.filter-group:nth-child(${groupIndex}) .filter-btn`).forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  displayCrosswordsList();
}

// ============================================================
// Открыть / закрыть кроссворд
// ============================================================

function openCrossword(id) {
  currentCrossword = getCrosswordById(id);
  if (!currentCrossword) return;

  document.getElementById('crossword-title').textContent = currentCrossword.title;
  document.getElementById('crossword-description').textContent = currentCrossword.description;

  // Генерируем сетку
  const wordList = currentCrossword.words.map(w => w.word);
  const result = generateCrosswordLayout(wordList);
  gridData = result.grid;
  gridRows = result.rows;
  gridCols = result.cols;
  placedWords = result.placedWords;

  autoNumber(gridData, gridRows, gridCols, placedWords);

  // Восстанавливаем clue для каждого размещённого слова
  placedWords.forEach(pw => {
    const orig = currentCrossword.words.find(w => w.word === pw.word);
    pw.clue = orig ? orig.clue : '';
  });

  activeCell = null;
  activeDirection = 'across';

  renderGrid();
  renderClues();

  document.getElementById('crossword-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCrossword() {
  document.getElementById('crossword-modal').classList.remove('active');
  document.body.style.overflow = '';
  currentCrossword = null;
  gridData = null;
  placedWords = [];
  activeCell = null;

  const url = new URL(window.location);
  url.searchParams.delete('id');
  window.history.replaceState({}, '', url);
}

// ============================================================
// Отрисовка сетки
// ============================================================

function renderGrid() {
  const container = document.getElementById('crossword-grid');
  container.innerHTML = '';

  // Адаптивный размер ячейки: вписываемся в контейнер
  const containerEl = document.getElementById('crossword-grid');
  const containerW = containerEl.clientWidth || 600;
  const containerH = window.innerHeight * 0.6;
  const maxByWidth = Math.floor((containerW - 32) / gridCols);
  const maxByHeight = Math.floor((containerH) / gridRows);
  const cellSize = Math.max(28, Math.min(44, maxByWidth, maxByHeight));

  const grid = document.createElement('div');
  grid.className = 'crossword-grid';
  grid.style.gridTemplateColumns = `repeat(${gridCols}, ${cellSize}px)`;
  grid.style.gridTemplateRows = `repeat(${gridRows}, ${cellSize}px)`;

  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      const cell = document.createElement('div');
      cell.className = 'crossword-cell';
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;

      if (gridData[r][c] !== null) {
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.maxLength = 1;
        inp.autocomplete = 'off';
        inp.autocorrect = 'off';
        inp.autocapitalize = 'characters';
        inp.spellcheck = false;
        inp.dataset.answer = gridData[r][c].letter;

        // --- Events ---
        inp.addEventListener('focus', () => handleFocus(r, c));
        inp.addEventListener('click', () => handleClick(r, c));
        inp.addEventListener('keydown', e => handleKeydown(e, r, c));
        inp.addEventListener('input', e => handleInput(e, r, c));

        cell.appendChild(inp);

        if (gridData[r][c].number) {
          const num = document.createElement('span');
          num.className = 'crossword-cell-number';
          num.textContent = gridData[r][c].number;
          cell.appendChild(num);
        }
      } else {
        cell.classList.add('black');
      }

      grid.appendChild(cell);
    }
  }

  container.appendChild(grid);
}

// ============================================================
// Обработчики событий ячеек
// ============================================================

function handleFocus(r, c) {
  // Если та же ячейка — направление уже переключено в handleClick
  // Если новая — выбираем первое доступное направление для ячейки
  if (!activeCell || activeCell.row !== r || activeCell.col !== c) {
    const cell = gridData[r][c];
    const dirs = getAvailableDirections(r, c);
    if (dirs.length > 0 && !dirs.includes(activeDirection)) {
      activeDirection = dirs[0];
    }
    activeCell = { row: r, col: c };
  }
  updateHighlight();
  updateClueHighlight();
}

function handleClick(r, c) {
  if (activeCell && activeCell.row === r && activeCell.col === c) {
    // Клик по той же ячейке — переключаем направление
    const dirs = getAvailableDirections(r, c);
    if (dirs.length > 1) {
      activeDirection = activeDirection === 'across' ? 'down' : 'across';
      updateHighlight();
      updateClueHighlight();
    }
  }
  activeCell = { row: r, col: c };
}

function handleInput(e, r, c) {
  const inp = e.target;
  // Отсекаем и нормализуем символ
  const raw = inp.value.replace(/[^а-яёА-ЯЁa-zA-Z]/g, '');
  if (!raw) { inp.value = ''; return; }

  inp.value = raw[raw.length - 1].toUpperCase();

  // Снимаем correct/incorrect при изменении
  inp.parentElement.classList.remove('correct', 'incorrect');

  // Переходим к следующей ячейке в текущем направлении
  moveInWord(r, c, 1);
}

function handleKeydown(e, r, c) {
  switch (e.key) {
    case 'Backspace': {
      const inp = e.target;
      if (inp.value) {
        inp.value = '';
        inp.parentElement.classList.remove('correct', 'incorrect');
      } else {
        e.preventDefault();
        moveInWord(r, c, -1);
        // Очищаем предыдущую ячейку
        const prev = getPrevCellInWord(r, c);
        if (prev) {
          const prevInp = getInput(prev.row, prev.col);
          if (prevInp) {
            prevInp.value = '';
            prevInp.parentElement.classList.remove('correct', 'incorrect');
          }
        }
      }
      break;
    }
    case 'ArrowRight':
      e.preventDefault();
      if (activeDirection !== 'across') { activeDirection = 'across'; updateHighlight(); updateClueHighlight(); }
      else navigateTo(r, c + 1);
      break;
    case 'ArrowLeft':
      e.preventDefault();
      if (activeDirection !== 'across') { activeDirection = 'across'; updateHighlight(); updateClueHighlight(); }
      else navigateTo(r, c - 1);
      break;
    case 'ArrowDown':
      e.preventDefault();
      if (activeDirection !== 'down') { activeDirection = 'down'; updateHighlight(); updateClueHighlight(); }
      else navigateTo(r + 1, c);
      break;
    case 'ArrowUp':
      e.preventDefault();
      if (activeDirection !== 'down') { activeDirection = 'down'; updateHighlight(); updateClueHighlight(); }
      else navigateTo(r - 1, c);
      break;
    case 'Tab':
      e.preventDefault();
      jumpToNextWord(e.shiftKey);
      break;
  }
}

// ============================================================
// Навигация
// ============================================================

function navigateTo(r, c) {
  if (r < 0 || r >= gridRows || c < 0 || c >= gridCols) return;
  if (!gridData[r][c]) return;
  const inp = getInput(r, c);
  if (inp) inp.focus();
}

function getInput(r, c) {
  return document.querySelector(`.crossword-cell[data-row="${r}"][data-col="${c}"] input`);
}

function getAvailableDirections(r, c) {
  const dirs = [];
  const cell = gridData[r][c];
  if (!cell) return dirs;

  for (const pw of placedWords) {
    const dr = pw.direction === 'down' ? 1 : 0;
    const dc = pw.direction === 'across' ? 1 : 0;
    for (let i = 0; i < pw.word.length; i++) {
      if (pw.row + dr * i === r && pw.col + dc * i === c) {
        if (!dirs.includes(pw.direction)) dirs.push(pw.direction);
        break;
      }
    }
  }
  return dirs;
}

/** Найти слово, которому принадлежит ячейка в текущем направлении */
function getActiveWord(r, c) {
  for (const pw of placedWords) {
    if (pw.direction !== activeDirection) continue;
    const dr = pw.direction === 'down' ? 1 : 0;
    const dc = pw.direction === 'across' ? 1 : 0;
    for (let i = 0; i < pw.word.length; i++) {
      if (pw.row + dr * i === r && pw.col + dc * i === c) return pw;
    }
  }
  // Если нет слова в этом направлении — берём любое
  for (const pw of placedWords) {
    const dr = pw.direction === 'down' ? 1 : 0;
    const dc = pw.direction === 'across' ? 1 : 0;
    for (let i = 0; i < pw.word.length; i++) {
      if (pw.row + dr * i === r && pw.col + dc * i === c) return pw;
    }
  }
  return null;
}

function moveInWord(r, c, delta) {
  const pw = getActiveWord(r, c);
  if (!pw) return;
  const dr = pw.direction === 'down' ? 1 : 0;
  const dc = pw.direction === 'across' ? 1 : 0;
  let pos = -1;
  for (let i = 0; i < pw.word.length; i++) {
    if (pw.row + dr * i === r && pw.col + dc * i === c) { pos = i; break; }
  }
  const nextPos = pos + delta;
  if (nextPos >= 0 && nextPos < pw.word.length) {
    const inp = getInput(pw.row + dr * nextPos, pw.col + dc * nextPos);
    if (inp) inp.focus();
  }
}

function getPrevCellInWord(r, c) {
  const pw = getActiveWord(r, c);
  if (!pw) return null;
  const dr = pw.direction === 'down' ? 1 : 0;
  const dc = pw.direction === 'across' ? 1 : 0;
  for (let i = 0; i < pw.word.length; i++) {
    if (pw.row + dr * i === r && pw.col + dc * i === c) {
      if (i > 0) return { row: pw.row + dr * (i - 1), col: pw.col + dc * (i - 1) };
    }
  }
  return null;
}

function jumpToNextWord(backwards) {
  // Найдём все слова, отсортированные по номеру
  const sorted = [...placedWords].filter(pw => pw.number != null).sort((a, b) => {
    if (a.number !== b.number) return a.number - b.number;
    // across до down, если номер одинаковый
    return a.direction === 'across' ? -1 : 1;
  });

  if (sorted.length === 0) return;

  const pw = getActiveWord(activeCell ? activeCell.row : 0, activeCell ? activeCell.col : 0);
  let idx = pw ? sorted.findIndex(w => w === pw) : -1;
  idx = (idx + (backwards ? -1 : 1) + sorted.length) % sorted.length;
  const nextPw = sorted[idx];
  activeDirection = nextPw.direction;
  const inp = getInput(nextPw.row, nextPw.col);
  if (inp) inp.focus();
}

// ============================================================
// Подсветка
// ============================================================

function updateHighlight() {
  // Снимаем все
  document.querySelectorAll('.crossword-cell').forEach(el => {
    el.classList.remove('active-cell', 'active-word');
  });

  if (!activeCell) return;
  const { row, col } = activeCell;

  // Подсвечиваем текущую ячейку
  const cellEl = document.querySelector(`.crossword-cell[data-row="${row}"][data-col="${col}"]`);
  if (cellEl) cellEl.classList.add('active-cell');

  // Подсвечиваем всё слово
  const pw = getActiveWord(row, col);
  if (!pw) return;
  const dr = pw.direction === 'down' ? 1 : 0;
  const dc = pw.direction === 'across' ? 1 : 0;
  for (let i = 0; i < pw.word.length; i++) {
    const r = pw.row + dr * i;
    const c = pw.col + dc * i;
    const el = document.querySelector(`.crossword-cell[data-row="${r}"][data-col="${c}"]`);
    if (el && !(r === row && c === col)) el.classList.add('active-word');
  }
}

function updateClueHighlight() {
  document.querySelectorAll('.clue-item').forEach(el => el.classList.remove('active'));
  const pw = activeCell ? getActiveWord(activeCell.row, activeCell.col) : null;
  if (!pw || pw.number == null) return;
  const id = `clue-${pw.direction}-${pw.number}`;
  const clueEl = document.getElementById(id);
  if (clueEl) {
    clueEl.classList.add('active');
    clueEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

// ============================================================
// Подсказки (clues)
// ============================================================

function renderClues() {
  const acrossWords = placedWords.filter(pw => pw.direction === 'across' && pw.number != null)
    .sort((a, b) => a.number - b.number);
  const downWords = placedWords.filter(pw => pw.direction === 'down' && pw.number != null)
    .sort((a, b) => a.number - b.number);

  document.getElementById('clues-across').innerHTML = acrossWords.length
    ? acrossWords.map(pw => clueHTML(pw)).join('')
    : '<p class="no-clues">Нет горизонтальных слов</p>';

  document.getElementById('clues-down').innerHTML = downWords.length
    ? downWords.map(pw => clueHTML(pw)).join('')
    : '<p class="no-clues">Нет вертикальных слов</p>';
}

function clueHTML(pw) {
  return `
    <div class="clue-item" id="clue-${pw.direction}-${pw.number}"
         onclick="focusWord(${pw.number}, '${pw.direction}')">
      <span class="clue-number">${pw.number}.</span>
      <span class="clue-text">${pw.clue}</span>
    </div>`;
}

function focusWord(number, direction) {
  const pw = placedWords.find(w => w.number === number && w.direction === direction);
  if (!pw) return;
  activeDirection = direction;
  activeCell = { row: pw.row, col: pw.col };
  const inp = getInput(pw.row, pw.col);
  if (inp) inp.focus();
}

// ============================================================
// Очистить / проверить
// ============================================================

function clearCrossword() {
  document.querySelectorAll('.crossword-cell input').forEach(inp => {
    inp.value = '';
    inp.parentElement.classList.remove('correct', 'incorrect');
  });
  activeCell = null;
  updateHighlight();
}

function checkCrossword() {
  const inputs = document.querySelectorAll('.crossword-cell input');
  let correct = 0, filled = 0, total = inputs.length;

  inputs.forEach(inp => {
    const answer = inp.dataset.answer;
    const value = inp.value.toUpperCase();

    inp.parentElement.classList.remove('correct', 'incorrect');

    if (value) {
      filled++;
      if (value === answer) {
        inp.parentElement.classList.add('correct');
        correct++;
      } else {
        inp.parentElement.classList.add('incorrect');
      }
    }
  });

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  let emoji, msg;
  if (filled === 0) {
    emoji = '✏️'; msg = 'Заполните хотя бы одну ячейку!';
  } else if (percentage === 100) {
    emoji = '🎉'; msg = 'Отлично! Всё правильно!';
  } else if (percentage >= 80) {
    emoji = '👍'; msg = `Хорошо! ${correct} из ${total} (${percentage}%)`;
  } else if (percentage >= 50) {
    emoji = '📚'; msg = `Неплохо! ${correct} из ${total} (${percentage}%)`;
  } else {
    emoji = '💪'; msg = `Продолжай! ${correct} из ${total} (${percentage}%)`;
  }

  showToast(`${emoji} ${msg}`, percentage === 100 ? 'success' : 'info');
}

function showToast(message, type = 'info') {
  let toast = document.getElementById('cw-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cw-toast';
    document.body.appendChild(toast);
  }
  toast.className = `cw-toast cw-toast-${type} visible`;
  toast.textContent = message;
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('visible'), 3500);
}

// ============================================================
// Закрытие модалки
// ============================================================

document.addEventListener('click', e => {
  const modal = document.getElementById('crossword-modal');
  if (e.target === modal) closeCrossword();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCrossword();
});
