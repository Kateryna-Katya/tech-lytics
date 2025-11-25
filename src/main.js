document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Скрипт для мобильного меню (Header)
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.nav__link');

    const toggleMenu = () => {
        headerNav.classList.toggle('is-open');
        // Обновление иконки
        const iconElement = menuToggle.querySelector('svg');
        if (headerNav.classList.contains('is-open')) {
            iconElement.setAttribute('data-lucide', 'x');
        } else {
            iconElement.setAttribute('data-lucide', 'menu');
        }
        // Переинициализация иконок после смены data-lucide
        lucide.createIcons();
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Закрытие меню при клике на ссылку (только для мобильной версии)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                // Добавляем небольшую задержку для плавности скролла
                setTimeout(() => {
                    if (headerNav.classList.contains('is-open')) {
                        toggleMenu();
                    }
                }, 200); 
            }
        });
    });


    // ==========================================================================
    // 2. Скрипт для Cookie Pop-up (Этап 5)
    // ==========================================================================
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptCookiesButton = document.getElementById('acceptCookies');
    const cookieAccepted = localStorage.getItem('techlytics_cookies_accepted');

    // Функция показа/скрытия
    const showCookiePopup = () => {
        if (!cookieAccepted) {
            cookiePopup.classList.remove('is-hidden');
        }
    }

    const hideCookiePopup = () => {
        cookiePopup.classList.add('is-hidden');
        localStorage.setItem('techlytics_cookies_accepted', 'true');
    }

    // Показываем, если не было принято
    showCookiePopup();

    // Обработчик кнопки "Принять"
    acceptCookiesButton.addEventListener('click', hideCookiePopup);
});