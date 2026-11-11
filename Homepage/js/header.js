import { $, $$, toast } from './utils.js';

/* ========================================
   HEADER SCROLL
======================================== */

export function initHeaderScroll() {
    const header = $('#header');

    if (!header) return;

    function onScroll() {
        const scrollPosition = window.scrollY;

        header.classList.toggle(
            'scrolled',
            scrollPosition > 40
        );
    }

    window.addEventListener('scroll', onScroll, {
        passive: true
    });

    onScroll();
}

/* ========================================
   LOGO DRAWER
======================================== */

export function initDrawer() {
    const burger = $('#burger');
    const logo = $('#logoTrigger');
    const drawer = $('#logoDrawer');
    const backdrop = $('#drawerBackdrop');
    const closeButton = $('#drawerClose');
    const nav = $('#nav');

    if (!drawer || !backdrop) return;

    function openDrawer() {
        drawer.classList.add('open');
        backdrop.classList.add('open');

        drawer.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');

        drawer.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';

        if (burger) burger.classList.remove('open');
    }

    // Hamburger button opens drawer
    if (burger) {
        burger.addEventListener('click', event => {
            event.preventDefault();

            burger.classList.toggle('open');

            if (drawer.classList.contains('open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    // Logo click: stay on current page
    if (logo) {
        logo.addEventListener('click', event => {
            event.preventDefault();
        });
    }

    // Close drawer
    if (closeButton) {
        closeButton.addEventListener('click', closeDrawer);
    }

    backdrop.addEventListener('click', closeDrawer);

    // Close when selecting a menu item
    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // Close when selecting normal navigation links
    if (nav) {
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                closeDrawer();
            });
        });
    }

    // Escape key
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeDrawer();
        }
    });
}

/* ========================================
   DELIVERY / PICKUP
======================================== */

export function initOrderType() {
    $$('.seg__btn').forEach(button => {
        button.addEventListener('click', () => {

            $$('.seg__btn').forEach(item => {
                item.classList.remove('active');
            });

            button.classList.add('active');

            toast(button.textContent.trim());

        });
    });
}