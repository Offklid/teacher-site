// Интерактивная 3D анатомия
document.addEventListener('DOMContentLoaded', function() {
  const systemBtns = document.querySelectorAll('.anatomy-system-btn');
  const anatomyDetails = document.getElementById('anatomyDetails');
  const canvas = document.getElementById('anatomyCanvas');
  
  // 3D модель полной анатомии человека из Sketchfab
  const fullBodyModel = 'https://sketchfab.com/models/9b0b079953b840bc9a13f524b60041e4/embed';
  let modelLoaded = false;
  
  // Информация о системах
  const systemInfo = {
    skeletal: {
      title: 'Скелетная система',
      description: 'Скелет взрослого человека состоит из 206 костей. Он выполняет опорную, защитную и двигательную функции. Самая длинная кость - бедренная (46 см), самая маленькая - стремечко в ухе (2.5 мм).',
      facts: ['Череп: 22 кости', 'Позвоночник: 33-34 позвонка', 'Грудная клетка: 25 костей', 'Конечности: 126 костей']
    },
    muscular: {
      title: 'Мышечная система',
      description: 'В теле человека около 640 скелетных мышц, которые составляют 40-45% массы тела. Мышцы обеспечивают движение, поддержание позы и выработку тепла.',
      facts: ['Самая сильная: жевательная мышца', 'Самая большая: большая ягодичная', 'Самая маленькая: стременная (в ухе)', 'Самая активная: глазные мышцы']
    },
    circulatory: {
      title: 'Кровеносная система',
      description: 'Сердце перекачивает кровь по артериям и венам, доставляя кислород и питательные вещества ко всем клеткам. За сутки сердце совершает около 100 000 ударов и перекачивает 7 000 литров крови.',
      facts: ['Длина сосудов: ~100 000 км', 'Объем крови: 5-6 литров', 'Скорость крови: до 40 км/ч', 'Сердце весит: 250-350 грамм']
    },
    nervous: {
      title: 'Нервная система',
      description: 'Головной и спинной мозг образуют центральную нервную систему. Мозг содержит 86 миллиардов нейронов, которые передают сигналы со скоростью до 120 м/с.',
      facts: ['Вес мозга: ~1.4 кг', 'Нейронов: 86 миллиардов', 'Скорость сигнала: до 120 м/с', 'Энергопотребление: 20% от всего тела']
    },
    digestive: {
      title: 'Пищеварительная система',
      description: 'Пищеварительный тракт длиной около 9 метров перерабатывает пищу, извлекая питательные вещества. Процесс пищеварения занимает 24-72 часа.',
      facts: ['Длина тракта: ~9 метров', 'Желудок вмещает: 1-1.5 литра', 'Тонкий кишечник: 6-7 метров', 'Печень весит: 1.5 кг']
    },
    respiratory: {
      title: 'Дыхательная система',
      description: 'Легкие обеспечивают газообмен: поглощают кислород и выводят углекислый газ. В среднем человек делает 20 000 вдохов в день, пропуская через легкие около 10 000 литров воздуха.',
      facts: ['Вдохов в день: ~20 000', 'Объем воздуха: ~10 000 л/день', 'Площадь легких: ~70 м²', 'Альвеол: ~300 миллионов']
    }
  };

  // Функция для отображения 3D модели (загружается только один раз)
  function displaySystem(system) {
    if (!canvas) return;
    
    const info = systemInfo[system];
    
    if (!modelLoaded) {
      canvas.innerHTML = `
        <div class="model-3d-container" style="opacity: 0; transform: scale(0.95);">
          <iframe 
            id="anatomy-iframe"
            src="${fullBodyModel}?autostart=1&preload=1&ui_theme=dark&ui_hint=0&ui_infos=0&ui_controls=1&ui_stop=0&transparent=0&autospin=0&start=12" 
            frameborder="0" 
            allow="autoplay; fullscreen; xr-spatial-tracking" 
            allowfullscreen
            style="width: 100%; height: 550px; border-radius: 16px;"
          ></iframe>
          <div class="model-label">
            <h3 id="system-title">${info.title}</h3>
            <p style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.5rem;">
              🖱️ Вращайте модель • 🔍 Масштаб колесиком • 📱 Полноэкранный режим
            </p>
            <p style="font-size: 0.8rem; opacity: 0.6; margin-top: 0.5rem;">
              Интерактивная 3D модель со всеми системами органов
            </p>
          </div>
        </div>
      `;
      
      modelLoaded = true;
      
      const container = canvas.querySelector('.model-3d-container');
      if (container) {
        setTimeout(() => {
          container.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          container.style.opacity = '1';
          container.style.transform = 'scale(1)';
        }, 100);
      }
    } else {
      const titleElement = document.getElementById('system-title');
      if (titleElement) {
        titleElement.style.transition = 'opacity 0.3s ease';
        titleElement.style.opacity = '0';
        setTimeout(() => {
          titleElement.textContent = info.title;
          titleElement.style.opacity = '1';
        }, 150);
      }
    }
    
    updateDetails(system);
  }
  
  function updateDetails(system) {
    if (!anatomyDetails) return;
    
    const info = systemInfo[system];
    const factsHTML = info.facts.map(fact => `<li>${fact}</li>`).join('');
    
    anatomyDetails.style.transition = 'opacity 0.2s ease';
    anatomyDetails.style.opacity = '0';
    
    setTimeout(() => {
      anatomyDetails.innerHTML = `
        <h4>${info.title}</h4>
        <p>${info.description}</p>
        <ul>${factsHTML}</ul>
      `;
      anatomyDetails.style.opacity = '1';
    }, 200);
  }
  
  systemBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const system = this.getAttribute('data-system');
      systemBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      displaySystem(system);
    });
  });
  
  setTimeout(() => displaySystem('skeletal'), 300);
});
