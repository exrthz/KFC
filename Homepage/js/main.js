
/* ========================================
   MAIN ENTRY POINT
======================================== */

// Menu
import { renderProducts, initCategories } from './menu.js';

// Cart
import { initCart } from './cart.js';

// Header
import { initHeaderScroll, initDrawer, initOrderType } from './header.js';

// Effects
import { initParallax, initScrollReveal, initCarousel } from './effects.js';

// Language
import { initLanguage } from './language.js';

// Search
import { initSearch } from './search.js';

// Login
import { initLogin } from './login.js';

// Store
import { initStoreFinder } from './store.js';

// Banner
import { initBannerSlider } from './banner.js';


/* ========================================
   INITIALIZE WEBSITE
======================================== */

function initWebsite() {

   // Menu
   renderProducts('chicken');
   initCategories();

   // Cart
   initCart();

   // Header
   initHeaderScroll();
   initDrawer();
   initOrderType();

   // Banner
   initBannerSlider();

   // Effects
   initParallax();
   initScrollReveal();
   initCarousel();

   // Language
   initLanguage();

   // Search
   initSearch();

   // Login
   initLogin();

   // Store Finder
   initStoreFinder();

}


/* ========================================
   DOM CONTENT LOADED
======================================== */

document.addEventListener('DOMContentLoaded', initWebsite);
