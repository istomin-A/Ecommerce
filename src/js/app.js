// *Проверка поддержки Webp
import * as andreyFunctions from "./modules/functions.js";

andreyFunctions.isWebp();
// =======================================================================================================
// * Меню бургер
const burger = document.querySelector('.burger');

if (burger) {
    const menuBody = document.querySelector('.menu__body');
    burger.addEventListener('click', (e) => {
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Открыть меню');
        document.body.classList.toggle('_lock');
        burger.classList.toggle('_active');
        menuBody.classList.toggle('_active');

        if (burger.classList.contains('_active')) {
            burger.setAttribute('aria-expanded', 'true');
            burger.setAttribute('aria-label', 'Закрыть меню');
            const menuLinks = document.querySelectorAll('.menu__link');

            menuLinks.forEach(link => link.addEventListener('click', (e) => {
                document.body.classList.remove('_lock');
                burger.classList.remove('_active');
                menuBody.classList.remove('_active');
                burger.setAttribute('aria-expanded', 'false');
                burger.setAttribute('aria-label', 'Открыть меню');
            }));
        }
    });
}

// * Фиксация шапки
/*const header = document.querySelector('.header');
const headerBody = document.querySelector('.header__body');

window.addEventListener("scroll", (e) => {
    const scrollPos = window.scrollY;

    if (scrollPos >= 50) {
        header.classList.add('_active');
        headerBody.classList.add('_active');
    } else {
        header.classList.remove('_active');
        headerBody.classList.remove('_active');
    }
});*/

// =======================================================================================================
// * Swiper
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// init Swiper:
if (document.querySelector('.product-slider__slider')) {
    new Swiper('.product-slider__slider', {
        modules: [Pagination],
        // about
        speed: 1000,
        spaceBetween: 50,
        slidesPerView: 4,

        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            479.98: {
                slidesPerView: 2,
            },
            767.98: {
                slidesPerView: 3,
            },
            991.98: {
                slidesPerView: 4,
            },
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

if (document.querySelector('.product-main__slider')) {
    new Swiper('.product-main__slider', {
        modules: [Pagination],
        // about
        speed: 1000,
        spaceBetween: 50,
        slidesPerView: 1,

        // breakpoints: {
        //     320: {
        //         slidesPerView: 1,
        //     },
        //     479.98: {
        //         slidesPerView: 2,
        //     },
        //     767.98: {
        //         slidesPerView: 3,
        //     },
        //     991.98: {
        //         slidesPerView: 4,
        //     },
        // },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

// https://swiperjs.com/ - документация

// =======================================================================================================
// * noUiSlider
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const mainRangeSlider = document.getElementById('filter-price');

if (mainRangeSlider) {
    noUiSlider.create(mainRangeSlider, {
        start: [30, 1500],
        step: 20,
        connect: true,
        tooltips: [true, true],
        range: {
            'min': 30,
            'max': 1500
        }
    });
}

// https://refreshless.com/nouislider/ - документация

// =======================================================================================================
// * Spoller
const spollerButtons = document.querySelectorAll('._spoller-button');
const spollerBody = document.querySelectorAll('._spoller-body');
const spollerArrow = document.querySelectorAll('._spoller-arrow');
const spollerLinks = document.querySelectorAll('._spoller-link');

spollerButtons.forEach(i => {
    spollerBody.forEach(j => {
        if (i.getAttribute('data-spoller-button') === j.getAttribute('data-spoller-path')) {
            i.addEventListener('click', (e) => {
                i.classList.toggle('_active');
                j.classList.toggle('_active');

                if (i.classList.contains('_active')) {
                    i.setAttribute('aria-expanded', 'true');
                    j.setAttribute('aria-hidden', 'false');

                    if (j.querySelector('[data-spoller-link]')) {
                        spollerLinks.forEach(p => {
                            if (i.getAttribute('data-spoller-button') === p.getAttribute('data-spoller-link')) {
                                p.setAttribute('tabindex', '0');
                            }
                        });
                    }
                } else {
                    i.setAttribute('aria-expanded', 'false');
                    j.setAttribute('aria-hidden', 'true');

                    if (j.querySelector('[data-spoller-link]')) {
                        spollerLinks.forEach(p => {
                            if (i.getAttribute('data-spoller-button') === p.getAttribute('data-spoller-link')) {
                                p.setAttribute('tabindex', '-1');
                            }
                        });
                    }
                }

                if (i.nextElementSibling.hasAttribute('data-spoller-arrow')) {
                    spollerArrow.forEach(k => {
                        if (k.getAttribute('data-spoller-arrow') === i.getAttribute('data-spoller-button')) {
                            k.classList.toggle('_active');
                        }
                    });
                }
            });
        }
    });
});

// =======================================================================================================
// * Modal
const modal = document.querySelectorAll('.modal');
const modalOpen = document.querySelectorAll('._modal-open');
const modalClose = document.querySelectorAll('._modal-close');

modalOpen.forEach(item => item.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-modal-path');
    document.querySelector(`[data-modal-target="${path}"]`).classList.add('_active');

    modal.forEach(item => {
        if (item.classList.contains('_active')) {
            item.showModal();
            document.body.classList.add('_lock');
        }
    });
}));

modalClose.forEach(item => item.addEventListener('click', (e) => {
    if (e.target == item) {
        modal.forEach(item => {
            item.close();
            item.classList.remove('_active');
        });
        document.body.classList.remove('_lock');
    }
}));

modal.forEach(item => item.addEventListener('click', ({ currentTarget, target }) => {
    const dialog = currentTarget;
    const isOnOverlayClick = target === dialog;
    if (isOnOverlayClick) {
        modal.forEach(item => {
            item.close();
            item.classList.remove('_active');
        });
        document.body.classList.remove('_lock');
    }
}));

modal.forEach(item => item.addEventListener('cancel', () => {
    if (item.classList.contains('_active')) {
        item.close();
        item.classList.remove('_active');
        document.body.classList.remove('_lock');
    }
}));

// =======================================================================================================
// *tab
const tab = document.querySelectorAll('._tab');

tab.forEach(tab => {
    const tabButtons = tab.querySelectorAll('._tab-button');
    const tabContents = tab.querySelectorAll('._tab-content');

    tabButtons.forEach(tabButton => {
        tabButton.addEventListener('click', e => {
            // 1. Убираю класс _active у кнопки и у контента таба и выключаем aria-selected на false
            tabButtons.forEach(tabButton => {
                tabButton.classList.remove('_active');
                tabButton.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(tabContent => {
                tabContent.classList.remove('_active')
            });

            // 2 Добавление класса _active кнопки и меняем значение у aria-selected на true
            e.currentTarget.classList.add('_active');
            e.currentTarget.setAttribute('aria-selected', 'true');

            // 3 Показываем нужный контент в табе
            let valueTabButtons = e.currentTarget.getAttribute('data-tab-path');
            let valueAttrTabContent = tab.querySelector(`[data-tab-target="${valueTabButtons}"]`).getAttribute('data-tab-target');
            let objectTabContent = tab.querySelector(`[data-tab-target="${valueTabButtons}"]`);

            console.log(valueTabButtons);
            console.log(valueAttrTabContent);
            console.log(objectTabContent);

            if (valueTabButtons === valueAttrTabContent) {
                objectTabContent.classList.add('_active');
            }
        });
    });
});

// =======================================================================================================
// *imask
// import IMask from 'imask';

// объект который нужен
// const phoneInput = document.getElementById('phone');

// заполнение маски
/*IMask(
    phoneInput,
    { mask: '+{380} (00) 00-00-000' }
);*/

// =======================================================================================================
// *just validate
// import JustValidate from 'just-validate';

// Пример валидации формы
/*const validation = new JustValidate('#form');
validation
    .addField('#name-input', [
        {
            rule: 'required',
            errorMessage: 'Имя обязательно',
        },
        {
            rule: 'minLength',
            value: 5,
            errorMessage: 'Минимум 5 символов',
        },
        {
            rule: 'maxLength',
            value: 15,
            errorMessage: 'Максимум 15 символов',
        },
    ])
    .addField('#tel-input', [
        {
            rule: 'required',
            errorMessage: 'Номер обязателен',
        },
    ])*/

// =======================================================================================================
// * quantity
const quantity = document.querySelector('.quantity');
const quantityButtonMinus = document.querySelector('.quantity__button_minus');
const quantityButtonPlus = document.querySelector('.quantity__button_plus');
const quantityCurrent = document.querySelector('.quantity__input');

if (quantity) {
    let textQuantityCurrent = Number(quantityCurrent.getAttribute('value'));

    function quantityMinus() {
        if (textQuantityCurrent > 1) {
            let quantityMinus = textQuantityCurrent -= 1;
            quantityCurrent.setAttribute('value', quantityMinus);
        }
    }

    function quantityPlus() {
        if (textQuantityCurrent < 30) {
            let quantityPlus = textQuantityCurrent += 1;
            quantityCurrent.setAttribute('value', quantityPlus);
        }
    }

    quantityButtonMinus.addEventListener('click', quantityMinus);
    quantityButtonPlus.addEventListener('click', quantityPlus);
}

// =======================================================================================================
// *share__copy
const shareCopy = document.querySelector('.share__copy');
const shareOut = document.querySelector('.share__out');

if (shareCopy) {
    shareCopy.addEventListener('click', e => {
        navigator.clipboard.writeText('https://devcut.io/ecommerce/product/num#1234567?query=!less/123')
            .then(() => {
                shareOut.classList.remove('_active');
                shareOut.innerHTML = '';
                setTimeout(() => {
                    shareOut.classList.add('_active');
                    shareOut.innerHTML = 'Copy';
                }, 500);
                setTimeout(() => {
                    shareOut.classList.remove('_active');
                    shareOut.innerHTML = '';
                }, 2000);
            });
    });
}