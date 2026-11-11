
import { $, $$ } from './utils.js';
import { lang, i18n, setLang } from './data.js';

/* ========================================
   1. GREETING
======================================== */

function getGreetingIndex() {

    const hour = new Date().getHours();

    if (hour < 12) return 0;
    if (hour < 17) return 1;
    if (hour < 20) return 2;

    return 3;
}


/* ========================================
   2. APPLY LANGUAGE
======================================== */

export function applyLanguage() {

    const dictionary = i18n[lang];

    if (!dictionary) return;

    // Translate text
    $$('[data-i18n]').forEach(element => {

        const key = element.dataset.i18n;

        if (dictionary[key] !== undefined) {
            element.textContent = dictionary[key];
        }

    });

    // Greeting
    const greeting = $('#greet');

    if (greeting) {

        greeting.textContent =
            dictionary.greeting[getGreetingIndex()];

    }

    // Input placeholders
    $$('[data-ph]').forEach(element => {

        const key = element.dataset.ph;

        if (dictionary.ph[key]) {
            element.placeholder = dictionary.ph[key];
        }

    });

    // Language buttons
    $$('.lang button').forEach(button => {

        button.classList.toggle(
            'on',
            button.dataset.lang === lang
        );

    });

    document.documentElement.lang = lang;
}


/* ========================================
   3. INITIALIZE LANGUAGE
======================================== */

export function initLanguage() {

    $$('.lang button').forEach(button => {

        button.addEventListener('click', () => {

            setLang(button.dataset.lang);

            applyLanguage();

        });

    });

    // Apply default language
    applyLanguage();

}
