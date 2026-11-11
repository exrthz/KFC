
import { $, $$ } from './utils.js';

/* ========================================
   1. PARALLAX EFFECT
======================================== */

export function initParallax() {

    const elements = $$('[data-parallax]');

    if (elements.length === 0) return;

    function onScroll() {

        const scrollPosition = window.scrollY;

        elements.forEach(element => {

            const speed = Number(element.dataset.parallax);

            element.style.transform =
                `translateY(${scrollPosition * speed}px)`;

        });
    }

    window.addEventListener('scroll', onScroll, {
        passive: true
    });

    onScroll();
}


/* ========================================
   2. SCROLL REVEAL
======================================== */

export function initScrollReveal() {

    const elements = $$('.reveal');

    if (!('IntersectionObserver' in window)) {

        elements.forEach(element => {
            element.classList.add('show');
        });

        return;
    }

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('show');

                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}


/* ========================================
   3. DEALS CAROUSEL
======================================== */

export function initCarousel() {

    const track = $('#track');
    const next = $('#next');
    const prev = $('#prev');

    if (!track || !next || !prev) return;

    const scrollAmount = 304;

    next.addEventListener('click', () => {

        track.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });

    });

    prev.addEventListener('click', () => {

        track.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });

    });

    // Automatic carousel
    if (track.scrollWidth > track.clientWidth) {

        setInterval(() => {

            const isEnd =
                track.scrollLeft + track.clientWidth
                >= track.scrollWidth - 4;

            if (isEnd) {

                track.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });

            } else {

                track.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });

            }

        }, 4500);

    }
}
