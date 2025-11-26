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
// ==========================================================================
    // 3. JS Анимация Hero-секции (Плавное появление контента)
    // ==========================================================================
    const heroContent = document.querySelector('.hero__content');
    
    // Используем простой Intersection Observer для активации анимации, 
    // когда секция появляется в зоне видимости, но для Hero можно просто активировать сразу.
    
    if (heroContent) {
        // Добавляем класс, запускающий CSS-переходы, через небольшой таймаут
        // чтобы убедиться, что DOM полностью прогрузился.
        setTimeout(() => {
            heroContent.classList.add('is-animated');
        }, 50); 
    }
    // ==========================================================================
    // Конец JS Анимации
// ==========================================================================
    // ==========================================================================
    // 4. JS Анимация Секции "Процесс" (Появление шагов при скролле)
    // ==========================================================================
    const processSteps = document.querySelectorAll('.process__step');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.3 // 30% элемента должно быть видно
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Остановить наблюдение после появления
            }
        });
    };

    const processObserver = new IntersectionObserver(observerCallback, observerOptions);

    processSteps.forEach(step => {
        processObserver.observe(step);
    });
    // ==========================================================================
    // Конец JS Анимации Секции "Процесс"
    // ==========================================================================
 // Закрывающий тег для document.addEventListener('DOMContentLoaded', () => { ... });