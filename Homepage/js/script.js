
/* ========================================
   1. DOM SELECTOR
======================================== */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* ========================================
   2. MENU DATA
======================================== */
const menu = {
    chicken: [
        ['🍗', 'ไก่ทอดต้นตำรับ', '1 ชิ้น สูตร 11 เครื่องเทศ', 45],
        ['🌶️', 'ไก่ฮอต & สไปซี่', 'เผ็ดจัดจ้าน 1 ชิ้น', 49],
        ['🍗', 'ไก่ทอด 3 ชิ้น', 'สุดคุ้ม พร้อมซอส', 129],
        ['🍗', 'ไก่ทอด 9 ชิ้น', 'สำหรับแชร์', 349]
    ],

    burger: [
        ['🍔', 'ซิงเกอร์เบอร์เกอร์', 'ไก่ชิ้นใหญ่ ซอสมายองเนส', 79],
        ['🍔', 'ทาวเวอร์เบอร์เกอร์', 'เพิ่มชีสและแฮชบราวน์', 99],
        ['🌯', 'ทวิสเตอร์', 'ไก่ห่อแป้งนุ่ม', 75]
    ],

    snack: [
        ['🍟', 'เฟรนช์ฟรายส์', 'กรอบ เค็มกำลังดี', 39],
        ['🥔', 'มันบดเกรวี่', 'เกรวี่สูตรลับ', 35],
        ['🍤', 'นักเก็ต 6 ชิ้น', 'ไก่ชิ้นพอดีคำ', 65],
        ['🌽', 'ข้าวโพดอบเนย', 'หวานหอม', 29]
    ],

    drink: [
        ['🥤', 'เป๊ปซี่', 'เย็นชื่นใจ', 25],
        ['🧋', 'ชานมเย็น', 'หอมหวาน', 39],
        ['🍋', 'เลมอนโซดา', 'สดชื่น', 35]
    ],

    dessert: [
        ['🍦', 'ไอศกรีมซันเดย์', 'ซอสช็อกโกแลต', 35],
        ['🥧', 'เอ้กทาร์ต', 'ไส้คัสตาร์ด', 29],
        ['🍩', 'โดนัทสอดไส้', 'นุ่มหวาน', 25]
    ]
};


/* ========================================
   3. GLOBAL VARIABLES
======================================== */
let cart = 0;
let lang = 'th';

const i18n = {
    th: {
        delivery: 'เดลิเวอรี่',
        pickup: 'รับกลับบ้าน / ทานที่ร้าน',
        order: 'เริ่มสั่งอาหาร',
        login: 'เข้าสู่ระบบ / ลงทะเบียน',
        cancel: 'ยกเลิก',

        welcome: 'ยินดีต้อนรับสู่ KFC',
        signin: 'ลงชื่อเข้าใช้',
        or: 'หรือ',
        noacc: 'ไม่มีบัญชีผู้ใช้',
        register: 'สมัครบัญชีผู้ใช้',

        guest1: 'เริ่มใช้งานแบบ',
        guest2: 'ผู้ใช้ชั่วคราว',
        forgot: 'ลืมรหัสผ่าน?',

        drawer_promo: 'โปรโมชัน',
        drawer_bestseller: 'สินค้าขายดี',
        drawer_group: 'ชุดคอมโบ',
        drawer_box: 'เดอะบ็อกซ์',
        drawer_setone: 'ชุดอิ่มคนเดียว',
        drawer_cbr: 'ไก่ทอด / เบอร์เกอร์ / ข้าว',
        drawer_snacks: 'ของทานเล่น',
        drawer_sweets: 'ของหวาน',
        drawer_drinks: 'เครื่องดื่ม',

        ph: {
            search: 'ค้นหาเมนู',
            phone: 'เบอร์โทรศัพท์'
        },

        greeting: [
            'สวัสดีตอนเช้า',
            'สวัสดีตอนบ่าย',
            'สวัสดีตอนเย็น',
            'สวัสดีตอนค่ำ'
        ]
    },

    en: {
        delivery: 'Delivery',
        pickup: 'Pickup / Dine-in',
        order: 'Start Order',
        login: 'Login / Register',
        cancel: 'Cancel',

        welcome: 'Welcome to KFC',
        signin: 'Sign in',
        or: 'or',
        noacc: "Don't have an account?",
        register: 'Create account',

        guest1: 'Continue as',
        guest2: 'Guest',
        forgot: 'Forgot password?',

        drawer_promo: 'Promotions',
        drawer_bestseller: 'Best Selling',
        drawer_group: 'Group',
        drawer_box: 'The Box',
        drawer_setone: 'Set For One',
        drawer_cbr: 'Chicken / Burger / Rice',
        drawer_snacks: 'Sides / Snacks',
        drawer_sweets: 'Desserts',
        drawer_drinks: 'Drinks',

        ph: {
            search: 'Search menu',
            phone: 'Phone number'
        },

        greeting: [
            'Good morning',
            'Good afternoon',
            'Good evening',
            'Good night'
        ]
    }
};


/* ========================================
   4. TOAST NOTIFICATION
======================================== */
function toast(message) {
    const element = $('#toast');

    if (!element) return;

    element.textContent = message;
    element.classList.add('on');

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        element.classList.remove('on');
    }, 2000);
}


/* ========================================
   5. PRODUCT RENDERING
======================================== */
function renderProducts(category) {
    const container = $('#products');

    if (!container || !menu[category]) return;

    container.innerHTML = menu[category]
        .map(([icon, name, description, price], index) => `
            <div class="card" style="animation-delay:${index * 0.08}s">
                <i>${icon}</i>
                <h3>${name}</h3>
                <p>${description}</p>
                <b>฿${price}</b>

                <button
                    class="btn btn--primary"
                    data-name="${name}">
                    เพิ่มลงตะกร้า
                </button>
            </div>
        `)
        .join('');
}


/* ========================================
   6. PRODUCT CATEGORY
======================================== */
function initCategories() {
    $$('.cat').forEach(button => {
        button.addEventListener('click', () => {

            $$('.cat').forEach(item => {
                item.classList.remove('active');
            });

            button.classList.add('active');

            renderProducts(button.dataset.cat);
        });
    });
}


/* ========================================
   7. SHOPPING CART
======================================== */
function initCart() {

    const products = $('#products');
    const cartButton = $('#cartBtn');

    if (products) {
        products.addEventListener('click', event => {

            const button = event.target.closest('button[data-name]');

            if (!button) return;

            cart++;

            $('#cartCount').textContent = cart;

            toast(`เพิ่ม ${button.dataset.name} แล้ว`);
        });
    }

    if (cartButton) {
        cartButton.addEventListener('click', () => {

            toast(
                cart > 0
                    ? `ในตะกร้ามี ${cart} รายการ`
                    : 'ตะกร้ายังว่างอยู่'
            );

        });
    }
}


/* ========================================
   8. HEADER & SCROLL EFFECT
======================================== */
function initHeaderScroll() {

    const header = $('#header');

    if (!header) return;

    function onScroll() {

        const scrollPosition = window.scrollY;

        header.classList.toggle(
            'scrolled',
            scrollPosition > 40
        );

        $$('[data-parallax]').forEach(element => {

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
   9. SCROLL REVEAL
======================================== */
function initScrollReveal() {

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
   10. DEALS CAROUSEL
======================================== */
function initCarousel() {

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


/* ========================================
   11. LOGO DRAWER
======================================== */
function initDrawer() {

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
   12. STORE FINDER
======================================== */
function initStoreFinder() {

    const findButton = $('#find');
    const locationInput = $('#loc');
    const message = $('#findMsg');

    if (!findButton || !locationInput || !message) return;

    findButton.addEventListener('click', () => {

        const value = locationInput.value.trim();

        if (!value) {
            message.textContent =
                'กรุณากรอกจังหวัดหรือรหัสไปรษณีย์';

            return;
        }

        message.textContent =
            `ระบบตัวอย่าง: คำค้นหาสาขา "${value}"`;

    });
}


/* ========================================
   13. GREETING
======================================== */
function getGreetingIndex() {

    const hour = new Date().getHours();

    if (hour < 12) return 0;
    if (hour < 17) return 1;
    if (hour < 20) return 2;

    return 3;
}


/* ========================================
   14. LANGUAGE SWITCHING
======================================== */
function applyLanguage() {

    const dictionary = i18n[lang];

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


function initLanguage() {

    $$('.lang button').forEach(button => {

        button.addEventListener('click', () => {

            lang = button.dataset.lang;

            applyLanguage();

        });

    });

}


/* ========================================
   15. DELIVERY / PICKUP
======================================== */
function initOrderType() {

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


/* ========================================
   16. SEARCH MENU
======================================== */
function initSearch() {

    const searchBar = $('#searchbar');
    const searchButton = $('#searchBtn');
    const cancelButton = $('#searchCancel');
    const searchInput = $('#searchInput');

    if (!searchBar || !searchButton || !cancelButton || !searchInput) {
        return;
    }

    searchButton.addEventListener('click', () => {

        searchBar.classList.add('open');

        setTimeout(() => {
            searchInput.focus();
        }, 300);

    });

    cancelButton.addEventListener('click', () => {

        searchBar.classList.remove('open');

        searchInput.value = '';

    });

    searchInput.addEventListener('keydown', event => {

        if (event.key === 'Enter') {

            const keyword = searchInput.value
                .trim()
                .toLowerCase();

            if (!keyword) return;

            const category = Object.keys(menu).find(key => {

                return menu[key].some(product => {

                    return (
                        product[1] + product[2]
                    ).toLowerCase().includes(keyword);

                });

            });

            if (category) {

                renderProducts(category);

                $$('.cat').forEach(button => {

                    button.classList.toggle(
                        'active',
                        button.dataset.cat === category
                    );

                });

                searchBar.classList.remove('open');

                $('#menu').scrollIntoView({
                    behavior: 'smooth'
                });

            } else {

                toast('ไม่พบเมนูที่ค้นหา');

            }

        }

        if (event.key === 'Escape') {
            cancelButton.click();
        }

    });

}


/* ========================================
   17. LOGIN PAGE
======================================== */
function initLogin() {

    const login = $('#login');
    const loginButton = $('#loginBtn');
    const backButton = $('#loginBack');
    const guestButton = $('#guest');
    const signInButton = $('#signin');

    if (!login) return;

    function openLogin() {

        login.classList.add('open');

        login.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';

    }

    function closeLogin() {

        login.classList.remove('open');

        login.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';

    }

    if (loginButton) {
        loginButton.addEventListener('click', openLogin);
    }

    if (backButton) {
        backButton.addEventListener('click', closeLogin);
    }

    if (guestButton) {
        guestButton.addEventListener('click', event => {

            event.preventDefault();

            closeLogin();

            toast('เข้าใช้งานแบบผู้ใช้ชั่วคราว');

        });
    }

    if (signInButton) {
        signInButton.addEventListener('click', () => {

            const phone = $('#phone').value.trim();

            const message = $('#loginMsg');

            if (!message) return;

            message.textContent = /^0\d{8,9}$/.test(phone)
                ? '✔ หมายเลขโทรศัพท์ถูกต้อง (ระบบ OTP ยังไม่เชื่อมต่อ)'
                : 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง';

        });
    }

    document.addEventListener('keydown', event => {

        if (event.key === 'Escape') {
            closeLogin();
        }

    });

}


/* ========================================
   18. INITIALIZE WEBSITE
======================================== */
function initWebsite() {

    // Initial products
    renderProducts('chicken');

    // Initialize all features
    initCategories();
    initCart();
    initHeaderScroll();
    initScrollReveal();
    initCarousel();
    initDrawer();
    initStoreFinder();
    initLanguage();
    initOrderType();
    initSearch();
    initLogin();

    // Apply default language
    applyLanguage();

}


// Start website
document.addEventListener('DOMContentLoaded', initWebsite);
