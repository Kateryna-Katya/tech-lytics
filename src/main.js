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
// ==========================================================================
    // 6. JS Логика Формы Контактов и CAPTCHA (Этап 4)
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const captchaDisplay = document.getElementById('captchaDisplay');
    const captchaInput = document.getElementById('captchaInput');
    const captchaMessage = document.getElementById('captchaMessage');
    const submissionMessage = document.getElementById('submissionMessage');
    const policyAccept = document.getElementById('policyAccept');
    
    let correctAnswer = 0;

    /**
     * Генерирует простой математический пример (CAPTCHA).
     */
    function generateCaptcha() {
        const operator = Math.random() < 0.5 ? '+' : '-';
        let num1 = Math.floor(Math.random() * 15) + 5;
        let num2 = Math.floor(Math.random() * 10) + 1;
        
        if (operator === '-' && num1 < num2) {
            [num1, num2] = [num2, num1];
        }

        correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;
        captchaDisplay.textContent = `${num1} ${operator} ${num2} = ?`;
        captchaMessage.textContent = ''; 
        captchaInput.value = ''; 
    }

    /**
     * Валидирует ответ CAPTCHA.
     * @returns {boolean} True, если ответ верный.
     */
    function validateCaptcha() {
        if (!captchaInput.value.trim()) {
            captchaMessage.textContent = 'Пожалуйста, решите пример.';
            captchaMessage.style.color = '#FF4545'; 
            return false;
        }

        const userAnswer = parseInt(captchaInput.value.trim());
        if (userAnswer === correctAnswer) {
            captchaMessage.textContent = 'Капча успешно пройдена!';
            captchaMessage.style.color = '#007BFF'; // Синий
            return true;
        } else {
            captchaMessage.textContent = 'Неверный ответ. Попробуйте еще раз.';
            captchaMessage.style.color = '#FF4545'; 
            generateCaptcha(); 
            return false;
        }
    }

    // Инициализация CAPTCHA при загрузке страницы
    generateCaptcha();

    // Обработчик отправки формы
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        submissionMessage.style.display = 'none'; 

        const isCaptchaValid = validateCaptcha();
        const isPolicyAccepted = policyAccept.checked;

        if (isCaptchaValid && isPolicyAccepted) {
            
            // Имитация успешной отправки данных
            console.log('Form Submitted and Validated:', {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                policy: isPolicyAccepted
            });

            // Показываем сообщение об успехе ТОЛЬКО после успешной валидации
            submissionMessage.style.display = 'block';
            
            // Сброс формы и генерация новой капчи
            contactForm.reset();
            generateCaptcha();
            
            // Автоматически скрываем сообщение через 5 секунд
            setTimeout(() => {
                submissionMessage.style.display = 'none';
            }, 5000);

        } else if (!isPolicyAccepted) {
            alert('Пожалуйста, примите условия использования и политику конфиденциальности.');
            policyAccept.focus();
        } 
    });

    // ==========================================================================
    // Конец JS Логики Формы Контактов
    // ==========================================================================