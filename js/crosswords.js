// Логика кроссвордов

let currentFilters = {
  subject: 'all',
  grade: 'all'
};

let currentCrossword = null;
let currentGrid = [];
let currentDirection = 'across'; // Текущее направление ввода
let currentWord = null; // Текущее слово, которое заполняется

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  displayCrosswordsList();
});

// Отображение списка кроссвордов
function displayCrosswordsList() {
  const container = document.getElementById('crosswords-list');
  const crosswords = filterCrosswordsData(currentFilters.subject, currentFilters.grade);
  
  if (crosswords.length === 0) {
    container.innerHTML = `
      <div class="no-materials">
        <p>Кроссворды скоро появятся</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = crosswords.map(crossword => `
    <div class="crossword-card" onclick="openCrossword(${crossword.id})" data-aos="fade-up">
      <div class="crossword-card-header">
        <h3>${crossword.title}</h3>
        <span class="crossword-badge badge-${crossword.subject}">
          ${crossword.subject === 'chemistry' ? 'Химия' : 'Биология'}
        </span>
      </div>
      <p>${crossword.description}</p>
      <div class="crossword-meta">
        <div class="crossword-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
          ${crossword.grade} класс
        </div>
        <div class="crossword-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          ${crossword.words.length} слов
        </div>
      </div>
    </div>
  `).join('');
}

// Фильтрация кроссвордов
function filterCrosswords(value, type, element) {
  currentFilters[type] = value;
  
  // Обновляем активные кнопки
  const buttons = document.querySelectorAll(`.filter-group:nth-child(${type === 'subject' ? 1 : 2}) .filter-btn`);
  buttons.forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  
  displayCrosswordsList();
}

// Открыть кроссворд
function openCrossword(id) {
  currentCrossword = getCrosswordById(id);
  if (!currentCrossword) return;
  
  // Заполняем заголовок
  document.getElementById('crossword-title').textContent = currentCrossword.title;
  document.getElementById('crossword-description').textContent = currentCrossword.description;
  
  // Создаем сетку
  createCrosswordGrid();
  
  // Создаем подсказки
  createClues();
  
  // Показываем модальное окно
  document.getElementById('crossword-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Закрыть кроссворд
function closeCrossword() {
  document.getElementById('crossword-modal').classList.remove('active');
  document.body.style.overflow = '';
  currentCrossword = null;
  currentGrid = [];
  currentDirection = 'across';
  currentWord = null;
}

// Создать сетку кроссворда
function createCrosswordGrid() {
  const { rows, cols } = currentCrossword.size;
  const gridContainer = document.getElementById('crossword-grid');
  
  // Инициализируем пустую сетку
  currentGrid = Array(rows).fill(null).map(() => Array(cols).fill(null));
  
  // Заполняем сетку словами
  currentCrossword.words.forEach(wordData => {
    const { word, direction, row, col, number } = wordData;
    
    for (let i = 0; i < word.length; i++) {
      const r = direction === 'across' ? row : row + i;
      const c = direction === 'across' ? col + i : col;
      
      if (!currentGrid[r][c]) {
        currentGrid[r][c] = {
          letter: word[i],
          number: i === 0 ? number : null,
          words: [],
          directions: []
        };
      }
      
      currentGrid[r][c].words.push({ direction, number, position: i });
      if (!currentGrid[r][c].directions.includes(direction)) {
        currentGrid[r][c].directions.push(direction);
      }
    }
  });
  
  // Создаем HTML сетки
  const gridHTML = document.createElement('div');
  gridHTML.className = 'crossword-grid';
  gridHTML.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
  gridHTML.style.gridTemplateRows = `repeat(${rows}, 40px)`;
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.className = 'crossword-cell';
      cell.dataset.row = r;
      cell.dataset.col = c;
      
      if (currentGrid[r][c]) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.dataset.answer = currentGrid[r][c].letter;
        input.dataset.directions = currentGrid[r][c].directions.join(',');
        
        input.addEventListener('input', (e) => {
          e.target.value = e.target.value.toUpperCase();
          if (e.target.value) {
            // Определяем слово, которое заполняется
            if (!currentWord) {
              // Если слово не выбрано, используем первое доступное направление
              const cellData = currentGrid[r][c];
              const wordInfo = cellData.words[0];
              currentWord = currentCrossword.words.find(w => 
                w.number === wordInfo.number && w.direction === wordInfo.direction
              );
            }
            moveToNextCell(r, c);
          }
        });
        
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !e.target.value) {
            moveToPrevCell(r, c);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            currentDirection = 'across';
            currentWord = null;
            moveInDirection(r, c, 'right');
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            currentDirection = 'across';
            currentWord = null;
            moveInDirection(r, c, 'left');
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentDirection = 'down';
            currentWord = null;
            moveInDirection(r, c, 'down');
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentDirection = 'down';
            currentWord = null;
            moveInDirection(r, c, 'up');
          }
        });
        
        input.addEventListener('focus', () => {
          cell.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
          cell.classList.remove('active');
        });
        
        // Переключение направления при клике на ячейку с пересечением
        input.addEventListener('click', () => {
          const cellData = currentGrid[r][c];
          if (cellData.directions.length > 1) {
            // Переключаем направление
            currentDirection = currentDirection === 'across' ? 'down' : 'across';
          } else {
            currentDirection = cellData.directions[0];
          }
          
          // Находим слово для текущего направления
          const wordInfo = cellData.words.find(w => w.direction === currentDirection);
          if (wordInfo) {
            currentWord = currentCrossword.words.find(w => 
              w.number === wordInfo.number && w.direction === wordInfo.direction
            );
          }
        });
        
        cell.appendChild(input);
        
        if (currentGrid[r][c].number) {
          const numberSpan = document.createElement('span');
          numberSpan.className = 'crossword-cell-number';
          numberSpan.textContent = currentGrid[r][c].number;
          cell.appendChild(numberSpan);
        }
      } else {
        cell.classList.add('black');
      }
      
      gridHTML.appendChild(cell);
    }
  }
  
  gridContainer.innerHTML = '';
  gridContainer.appendChild(gridHTML);
}

// Переход к следующей ячейке с учетом направления
function moveToNextCell(row, col) {
  if (!currentWord) return;
  
  const direction = currentWord.direction;
  const wordRow = currentWord.row;
  const wordCol = currentWord.col;
  const wordLength = currentWord.word.length;
  
  // Вычисляем позицию в слове
  let positionInWord;
  if (direction === 'across') {
    positionInWord = col - wordCol;
  } else {
    positionInWord = row - wordRow;
  }
  
  // Если это не последняя буква в слове, переходим к следующей
  if (positionInWord < wordLength - 1) {
    let nextRow = row;
    let nextCol = col;
    
    if (direction === 'across') {
      nextCol++;
    } else {
      nextRow++;
    }
    
    const input = document.querySelector(`.crossword-cell[data-row="${nextRow}"][data-col="${nextCol}"] input`);
    if (input) {
      input.focus();
      return;
    }
  }
  
  // Если дошли до конца слова, сбрасываем текущее слово
  currentWord = null;
}

// Переход к предыдущей ячейке с учетом направления
function moveToPrevCell(row, col) {
  if (!currentWord) {
    // Если слово не выбрано, используем текущее направление
    const cellData = currentGrid[row][col];
    const direction = cellData.directions.includes(currentDirection) ? currentDirection : cellData.directions[0];
    
    if (direction === 'across') {
      for (let c = col - 1; c >= 0; c--) {
        if (currentGrid[row][c]) {
          const input = document.querySelector(`.crossword-cell[data-row="${row}"][data-col="${c}"] input`);
          if (input) {
            input.focus();
            return;
          }
        }
      }
    } else {
      for (let r = row - 1; r >= 0; r--) {
        if (currentGrid[r][col]) {
          const input = document.querySelector(`.crossword-cell[data-row="${r}"][data-col="${col}"] input`);
          if (input) {
            input.focus();
            return;
          }
        }
      }
    }
    return;
  }
  
  const direction = currentWord.direction;
  const wordRow = currentWord.row;
  const wordCol = currentWord.col;
  
  // Вычисляем позицию в слове
  let positionInWord;
  if (direction === 'across') {
    positionInWord = col - wordCol;
  } else {
    positionInWord = row - wordRow;
  }
  
  // Если это не первая буква в слове, переходим к предыдущей
  if (positionInWord > 0) {
    let prevRow = row;
    let prevCol = col;
    
    if (direction === 'across') {
      prevCol--;
    } else {
      prevRow--;
    }
    
    const input = document.querySelector(`.crossword-cell[data-row="${prevRow}"][data-col="${prevCol}"] input`);
    if (input) {
      input.focus();
    }
  }
}

// Движение в указанном направлении стрелками
function moveInDirection(row, col, direction) {
  let newRow = row;
  let newCol = col;
  
  switch(direction) {
    case 'right':
      newCol++;
      currentDirection = 'across';
      break;
    case 'left':
      newCol--;
      currentDirection = 'across';
      break;
    case 'down':
      newRow++;
      currentDirection = 'down';
      break;
    case 'up':
      newRow--;
      currentDirection = 'down';
      break;
  }
  
  if (newRow >= 0 && newRow < currentCrossword.size.rows && 
      newCol >= 0 && newCol < currentCrossword.size.cols &&
      currentGrid[newRow][newCol]) {
    const input = document.querySelector(`.crossword-cell[data-row="${newRow}"][data-col="${newCol}"] input`);
    if (input) {
      input.focus();
    }
  }
}

// Создать подсказки
function createClues() {
  const acrossClues = currentCrossword.words.filter(w => w.direction === 'across');
  const downClues = currentCrossword.words.filter(w => w.direction === 'down');
  
  document.getElementById('clues-across').innerHTML = acrossClues.map(clue => `
    <div class="clue-item" onclick="focusWord(${clue.number}, 'across')">
      <span class="clue-number">${clue.number}.</span>
      <span class="clue-text">${clue.clue}</span>
    </div>
  `).join('');
  
  document.getElementById('clues-down').innerHTML = downClues.map(clue => `
    <div class="clue-item" onclick="focusWord(${clue.number}, 'down')">
      <span class="clue-number">${clue.number}.</span>
      <span class="clue-text">${clue.clue}</span>
    </div>
  `).join('');
}

// Фокус на слове
function focusWord(number, direction) {
  const word = currentCrossword.words.find(w => w.number === number && w.direction === direction);
  if (!word) return;
  
  currentDirection = direction;
  currentWord = word;
  
  const firstCell = document.querySelector(
    `.crossword-cell[data-row="${word.row}"][data-col="${word.col}"] input`
  );
  
  if (firstCell) {
    firstCell.focus();
  }
}

// Очистить кроссворд
function clearCrossword() {
  const inputs = document.querySelectorAll('.crossword-cell input');
  inputs.forEach(input => {
    input.value = '';
    input.parentElement.classList.remove('correct', 'incorrect');
  });
  currentWord = null;
}

// Проверить кроссворд
function checkCrossword() {
  const inputs = document.querySelectorAll('.crossword-cell input');
  let correct = 0;
  let total = 0;
  
  inputs.forEach(input => {
    total++;
    const answer = input.dataset.answer;
    const value = input.value.toUpperCase();
    
    if (value === answer) {
      input.parentElement.classList.add('correct');
      input.parentElement.classList.remove('incorrect');
      correct++;
    } else if (value) {
      input.parentElement.classList.add('incorrect');
      input.parentElement.classList.remove('correct');
    }
  });
  
  // Показываем результат
  const percentage = Math.round((correct / total) * 100);
  let message = '';
  
  if (percentage === 100) {
    message = '🎉 Отлично! Все правильно!';
  } else if (percentage >= 80) {
    message = `👍 Хорошо! Правильно ${correct} из ${total} (${percentage}%)`;
  } else if (percentage >= 50) {
    message = `📚 Неплохо! Правильно ${correct} из ${total} (${percentage}%)`;
  } else {
    message = `💪 Продолжай учиться! Правильно ${correct} из ${total} (${percentage}%)`;
  }
  
  setTimeout(() => {
    alert(message);
  }, 500);
}

// Закрытие модального окна по клику вне его
document.addEventListener('click', (e) => {
  const modal = document.getElementById('crossword-modal');
  if (e.target === modal) {
    closeCrossword();
  }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCrossword();
  }
});
