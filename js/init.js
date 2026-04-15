// Unified initialization file for all external libraries
// This file loads after DOM is ready due to defer attribute

(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        disable: 'mobile' // Disable on mobile for better performance
      });
    }

    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#667eea' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#667eea',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          }
        },
        retina_detect: true
      });
    }

    // Initialize Typed.js
    if (typeof Typed !== 'undefined' && document.querySelector('.typed-text')) {
      new Typed('.typed-text', {
        strings: [
          'Добро пожаловать на сайт!',
          'Изучаем химию и биологию',
          'Готовимся к ОГЭ и ЕГЭ',
          'Познаём мир науки вместе'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false
      });
    }
  }
})();
