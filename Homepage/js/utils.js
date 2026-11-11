/* ========================================
   DOM SELECTOR
======================================== */

export const $ = (selector) =>
    document.querySelector(selector);

export const $$ = (selector) =>
    document.querySelectorAll(selector);


/* ========================================
   TOAST NOTIFICATION
======================================== */

export function toast(message) {
    const element = $('#toast');

    if (!element) return;

    element.textContent = message;
    element.classList.add('on');

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        element.classList.remove('on');
    }, 2000);
}