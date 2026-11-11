// KFC Thailand Web App Script
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Menu Data (TH & EN)
const menuData = {
  th: {
    chicken: [
      ['🍗', 'ไก่ทอดต้นตำรับ', '1 ชิ้น สูตรลับ 11 เครื่องเทศ', 45],
      ['🌶️', 'ไก่ฮอต & สไปซี่', 'เผ็ดจัดจ้าน กรอบนอกนุ่มใน 1 ชิ้น', 49],
      ['🍗', 'ไก่ทอด 3 ชิ้น', 'สุดคุ้ม พร้อมซอสสูตรเด็ด', 129],
      ['🍗', 'ไก่ทอด 9 ชิ้น', 'ชุดบักเก็ตสำหรับแชร์ความสุข', 349]
    ],
    burger: [
      ['🍔', 'ซิงเกอร์เบอร์เกอร์', 'ไก่กรอบชิ้นใหญ่ ซอสมายองเนส', 79],
      ['🍔', 'ทาวเวอร์เบอร์เกอร์', 'เพิ่มชีสเยิ้มและแฮชบราวน์กรอบ', 99],
      ['🌯', 'ทวิสเตอร์', 'เนื้อไก่ทอดห่อแป้งตอร์ติญ่านุ่ม', 75]
    ],
    snack: [
      ['🍟', 'เฟรนช์ฟรายส์', 'กรอบนอกนุ่มใน เค็มกำลังดี', 39],
      ['🥔', 'มันบดเกรวี่', 'มันบดเนื้อเนียนราดเกรวี่สูตรลับ', 35],
      ['🍤', 'นักเก็ต 6 ชิ้น', 'ไก่ชิ้นพอดีคำ กรอบอร่อย', 65],
      ['🌽', 'ข้าวโพดอบเนย', 'ข้าวโพดหวานคลุกเนยหอมกรุ่น', 29]
    ],
    drink: [
      ['🥤', 'เป๊ปซี่', 'เย็นซ่าชื่นใจ ดับกระหาย', 25],
      ['🧋', 'ชานมเย็น', 'หอมละมุน หวานกลมกล่อม', 39],
      ['🍋', 'เลมอนโซดา', 'เปรี้ยวหวานซ่า สดชื่นสะใจ', 35]
    ],
    dessert: [
      ['🍦', 'ไอศกรีมซันเดย์', 'ราดซอสช็อกโกแลตเข้มข้น', 35],
      ['🥧', 'เอ้กทาร์ต', 'ทาร์ตไข่กรอบนอก ไส้คัสตาร์ดนุ่ม', 29],
      ['🍩', 'โดนัทสอดไส้', 'แป้งนุ่ม ไส้หวานหอม', 25]
    ]
  },
  en: {
    chicken: [
      ['🍗', 'Original Recipe Chicken', '1 pc, 11 secret herbs & spices', 45],
      ['🌶️', 'Hot & Spicy Chicken', 'Crispy & extra spicy, 1 pc', 49],
      ['🍗', '3 Pcs Chicken', 'Value set with signature dip', 129],
      ['🍗', '9 Pcs Chicken Bucket', 'Perfect for sharing with friends', 349]
    ],
    burger: [
      ['🍔', 'Zinger Burger', 'Crispy chicken breast with mayo', 79],
      ['🍔', 'Tower Burger', 'Layered with cheese and hashbrown', 99],
      ['🌯', 'Twister Wrap', 'Tender chicken wrapped in tortilla', 75]
    ],
    snack: [
      ['🍟', 'French Fries', 'Golden, crispy & lightly salted', 39],
      ['🥔', 'Mashed Potato & Gravy', 'Smooth mash with signature gravy', 35],
      ['🍤', '6 Pcs Nuggets', 'Bite-sized crispy chicken nuggets', 65],
      ['🌽', 'Sweet Corn with Butter', 'Tender sweet corn with real butter', 29]
    ],
    drink: [
      ['🥤', 'Pepsi', 'Ice-cold and fizzy refreshment', 25],
      ['🧋', 'Iced Milk Tea', 'Aromatic sweet tea with milk', 39],
      ['🍋', 'Lemon Soda', 'Crisp citrus fizz to beat the heat', 35]
    ],
    dessert: [
      ['🍦', 'Sundae Ice Cream', 'Creamy soft serve with chocolate', 35],
      ['🥧', 'Egg Tart', 'Flaky pastry with rich egg custard', 29],
      ['🍩', 'Filled Donut', 'Fluffy donut with sweet filling', 25]
    ]
  }
};

const catNames = {
  th: { chicken: 'ไก่ทอด', burger: 'เบอร์เกอร์', snack: 'ของทานเล่น', drink: 'เครื่องดื่ม', dessert: 'ของหวาน' },
  en: { chicken: 'Chicken', burger: 'Burger', snack: 'Snacks', drink: 'Drinks', dessert: 'Dessert' }
};

// Translations
const i18n = {
  th: {
    delivery: 'เดลิเวอรี่',
    pickup: 'รับกลับบ้าน / ทานที่ร้าน',
    order: 'เริ่มสั่งอาหาร',
    login: 'เข้าสู่ระบบ / ลงทะเบียน',
    logout: 'ออกจากระบบ',
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
    menu_title: 'เลือกเมนูโปรด',
    deals_title: 'โปรโมชันสุดคุ้ม',
    add_to_cart: 'เพิ่มลงตะกร้า',
    nav_menu: 'เมนู',
    nav_deals: 'โปรโมชัน',
    nav_app: 'แอป KFC',
    hero_tag: 'ใหม่!',
    hero_title: 'ไก่ทอด<br>กรอบนอก<br>นุ่มใน',
    hero_desc: 'สูตรลับ 11 เครื่องเทศและสมุนไพร ทอดสดใหม่ทุกวัน',
    hero_order: 'สั่งเลย',
    hero_deals: 'ดูโปรโมชัน',
    ph: { search: 'ค้นหาเมนู', phone: 'เบอร์โทรศัพท์' },
    g: ['สวัสดีตอนเช้า', 'สวัสดีตอนบ่าย', 'สวัสดีตอนเย็น', 'สวัสดีตอนค่ำ']
  },
  en: {
    delivery: 'Delivery',
    pickup: 'Pickup / Dine-in',
    order: 'Start Order',
    login: 'Login / Register',
    logout: 'Logout',
    cancel: 'Cancel',
    welcome: 'Welcome to KFC',
    signin: 'Sign In',
    or: 'or',
    noacc: "Don't have an account?",
    register: 'Create account',
    guest1: 'Continue as',
    guest2: 'Guest',
    forgot: 'Forgot password?',
    drawer_promo: 'Promotions',
    drawer_bestseller: 'Best Selling',
    drawer_group: 'Combo Sets',
    drawer_box: 'The Box',
    drawer_setone: 'Set For One',
    drawer_cbr: 'Chicken / Burger / Rice',
    drawer_snacks: 'Sides & Snacks',
    drawer_sweets: 'Sweets',
    drawer_drinks: 'Drinks',
    menu_title: 'Choose Favorite Menu',
    deals_title: 'Super Value Deals',
    add_to_cart: 'Add to Cart',
    nav_menu: 'Menu',
    nav_deals: 'Deals',
    nav_app: 'KFC App',
    hero_tag: 'NEW!',
    hero_title: 'Fried Chicken<br>Crispy Outside<br>Tender Inside',
    hero_desc: 'Secret 11 herbs & spices recipe, freshly fried every day',
    hero_order: 'Order Now',
    hero_deals: 'View Deals',
    ph: { search: 'Search menu', phone: 'Phone number' },
    g: ['Good morning', 'Good afternoon', 'Good evening', 'Good night']
  }
};

// State Variables
let lang = localStorage.getItem('kfc_lang') || 'th';
let currentCategory = 'chicken';
let currentOrderMode = localStorage.getItem('kfc_order_mode') || 'delivery';
let isLoggedIn = localStorage.getItem('kfc_user_logged') === 'true';
let currentUser = localStorage.getItem('kfc_user_name') || '';
let cart = parseInt(localStorage.getItem('kfc_cart_count') || '0', 10);

// Toast Notification
function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('on'), 2500);
}

// Render Products
function render(cat) {
  currentCategory = cat;
  const list = (menuData[lang] && menuData[lang][cat]) || menuData['th'][cat] || [];
  const prodEl = $('#products');
  if (!prodEl) return;
  const btnText = i18n[lang].add_to_cart || 'เพิ่มลงตะกร้า';
  prodEl.innerHTML = list.map(([icon, name, desc, price], k) => `
    <div class="card" style="animation-delay:${k * 0.08}s">
      <i>${icon}</i>
      <h3>${name}</h3>
      <p>${desc}</p>
      <b>฿${price}</b>
      <button class="btn btn--primary" data-name="${name}">${btnText}</button>
    </div>
  `).join('');
}

// Update Cart Count Display
function updateCartCount() {
  const el = $('#cartCount');
  if (el) el.textContent = cart;
  localStorage.setItem('kfc_cart_count', cart);
}

// Greeting Index
function greetIdx() {
  const h = new Date().getHours();
  return h < 12 ? 0 : h < 17 ? 1 : h < 20 ? 2 : 3;
}

// Update Auth UI State (Header & Drawer Buttons)
function updateAuthState() {
  const loginBtns = $$('#loginBtn, #drawerLoginBtn');
  loginBtns.forEach(btn => {
    if (isLoggedIn) {
      const displayName = currentUser || (lang === 'th' ? 'สมาชิก' : 'Member');
      btn.textContent = `👤 ${displayName} | ${i18n[lang].logout}`;
      btn.title = lang === 'th' ? 'คลิกเพื่อออกจากระบบ' : 'Click to log out';
      btn.classList.add('logged-in');
    } else {
      btn.textContent = i18n[lang].login;
      btn.title = '';
      btn.classList.remove('logged-in');
    }
  });
}

// Apply Language
function applyLang() {
  document.documentElement.lang = lang;

  // Sync lang toggle buttons
  $$('.lang button').forEach(b => {
    b.classList.toggle('on', b.dataset.lang === lang);
  });

  // Translate data-i18n elements
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang] && i18n[lang][key]) {
      const val = i18n[lang][key];
      if (val.includes('<')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    }
  });

  // Translate placeholders
  $$('[data-ph]').forEach(el => {
    const key = el.dataset.ph;
    if (i18n[lang] && i18n[lang].ph && i18n[lang].ph[key]) {
      el.placeholder = i18n[lang].ph[key];
    }
  });

  // Greeting
  const greetEl = $('#greet');
  if (greetEl) {
    greetEl.textContent = i18n[lang].g[greetIdx()];
  }

  // Categories buttons
  $$('.cat').forEach(b => {
    const c = b.dataset.cat;
    const icon = b.querySelector('i') ? b.querySelector('i').outerHTML : '';
    if (catNames[lang] && catNames[lang][c]) {
      b.innerHTML = `${icon}${catNames[lang][c]}`;
    }
  });

  // Update Auth Buttons
  updateAuthState();

  // Re-render menu products
  render(currentCategory);
}

// Order Mode (Delivery / Pickup)
function setOrderMode(mode, showNotice = true) {
  currentOrderMode = mode;
  localStorage.setItem('kfc_order_mode', mode);
  $$('.seg__btn').forEach(btn => {
    const btnMode = btn.dataset.mode || (btn.dataset.i18n === 'delivery' ? 'delivery' : 'pickup');
    btn.classList.toggle('active', btnMode === mode);
  });
  if (showNotice) {
    const modeLabel = lang === 'th'
      ? (mode === 'delivery' ? 'เดลิเวอรี่ (จัดส่งถึงบ้าน)' : 'รับกลับบ้าน / ทานที่ร้าน')
      : (mode === 'delivery' ? 'Delivery (Home Delivery)' : 'Pickup / Dine-in');
    toast(lang === 'th' ? `เลือกบริการ: ${modeLabel}` : `Selected service: ${modeLabel}`);
  }
}

// Login Modal Control
const lg = $('#login');
function openLogin() {
  if (!lg) return;
  lg.classList.add('open');
  lg.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const phoneInput = $('#phone');
  if (phoneInput) {
    setTimeout(() => phoneInput.focus(), 250);
  }
}

function closeLogin() {
  if (!lg) return;
  lg.classList.remove('open');
  lg.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  const msgEl = $('#loginMsg');
  if (msgEl) {
    msgEl.textContent = '';
    msgEl.className = 'msg';
  }
}

function handleLoginSuccess(userName, method) {
  isLoggedIn = true;
  currentUser = userName;
  localStorage.setItem('kfc_user_logged', 'true');
  localStorage.setItem('kfc_user_name', userName);
  updateAuthState();
  closeLogin();

  let msg = '';
  if (method === 'guest') {
    msg = lang === 'th' ? '✔ เริ่มใช้งานแบบผู้ใช้ชั่วคราวแล้ว' : '✔ Continuing as Guest';
  } else if (method === 'facebook') {
    msg = lang === 'th' ? '✔ เข้าสู่ระบบด้วย Facebook สำเร็จ' : '✔ Signed in with Facebook';
  } else if (method === 'google') {
    msg = lang === 'th' ? '✔ เข้าสู่ระบบด้วย Google สำเร็จ' : '✔ Signed in with Google';
  } else if (method === 'register') {
    msg = lang === 'th' ? `✔ สมัครสมาชิกสำเร็จ ยินดีต้อนรับ ${userName}` : `✔ Registered successfully! Welcome ${userName}`;
  } else {
    msg = lang === 'th' ? `✔ เข้าสู่ระบบสำเร็จ (เบอร์: ${userName})` : `✔ Signed in successfully (${userName})`;
  }
  toast(msg);
}

function handleLogout() {
  isLoggedIn = false;
  currentUser = '';
  localStorage.removeItem('kfc_user_logged');
  localStorage.removeItem('kfc_user_name');
  updateAuthState();
  toast(lang === 'th' ? 'ออกจากระบบเรียบร้อยแล้ว' : 'Logged out successfully');
}

// Drawer Control (Mobile)
const drawer = $('#logoDrawer');
const backdrop = $('#drawerBackdrop');
function openDrawer() {
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }
  if (backdrop) backdrop.classList.add('open');
}
function closeDrawer() {
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (backdrop) backdrop.classList.remove('open');
}

// ================= Event Listeners =================

// 1. Login / Logout triggers
function onLoginBtnClick() {
  if (isLoggedIn) {
    handleLogout();
  } else {
    openLogin();
  }
}
$$('#loginBtn, #drawerLoginBtn').forEach(b => b.addEventListener('click', onLoginBtnClick));
if ($('#loginBack')) $('#loginBack').addEventListener('click', closeLogin);

// Footer member registration link
const footerReg = $('#footerMemberReg');
if (footerReg) {
  footerReg.addEventListener('click', e => {
    e.preventDefault();
    openLogin();
  });
}

// Inside Login Form Actions
const signinBtn = $('#signin');
if (signinBtn) {
  signinBtn.addEventListener('click', () => {
    const v = ($('#phone') ? $('#phone').value.trim() : '');
    const msgEl = $('#loginMsg');
    if (/^0\d{8,9}$/.test(v)) {
      handleLoginSuccess(v, 'phone');
    } else {
      if (msgEl) {
        msgEl.className = 'msg';
        msgEl.textContent = lang === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)' : 'Please enter a valid phone number (e.g. 0812345678)';
      }
      if ($('#phone')) $('#phone').focus();
    }
  });
}

const regBtn = $('#registerBtn');
if (regBtn) {
  regBtn.addEventListener('click', () => {
    const v = ($('#phone') ? $('#phone').value.trim() : '');
    const msgEl = $('#loginMsg');
    if (/^0\d{8,9}$/.test(v)) {
      handleLoginSuccess(v, 'register');
    } else {
      if (msgEl) {
        msgEl.className = 'msg';
        msgEl.textContent = lang === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์เพื่อสมัครสมาชิก' : 'Please enter your phone number to register';
      }
      if ($('#phone')) $('#phone').focus();
    }
  });
}

const fbBtn = $('#btnFacebook');
if (fbBtn) fbBtn.addEventListener('click', () => handleLoginSuccess('Facebook User', 'facebook'));

const googleBtn = $('#btnGoogle');
if (googleBtn) googleBtn.addEventListener('click', () => handleLoginSuccess('Google User', 'google'));

const guestLink = $('#guest');
if (guestLink) {
  guestLink.addEventListener('click', e => {
    e.preventDefault();
    handleLoginSuccess('Guest', 'guest');
  });
}

const forgotLink = $('#forgotLink');
if (forgotLink) {
  forgotLink.addEventListener('click', e => {
    e.preventDefault();
    toast(lang === 'th' ? 'ระบบจะส่งลิงก์รีเซ็ตรหัสผ่านไปยังเบอร์โทรของคุณ' : 'Password reset instructions have been sent to your phone');
  });
}

// 2. Language Switch Buttons (Header, Drawer, Login modal)
$$('.lang button').forEach(b => {
  b.addEventListener('click', () => {
    const selected = b.dataset.lang;
    if (selected && selected !== lang) {
      lang = selected;
      localStorage.setItem('kfc_lang', lang);
      applyLang();
      toast(lang === 'th' ? 'เปลี่ยนภาษาเป็น: ภาษาไทย' : 'Language switched to: English');
    }
  });
});

// 3. Cart Button (Check login requirement)
const cartBtn = $('#cartBtn');
if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    if (!isLoggedIn) {
      toast(lang === 'th' ? 'กรุณาเข้าสู่ระบบหรือสมัครสมาชิกก่อนดูตะกร้า' : 'Please log in or register before accessing your cart');
      openLogin();
    } else {
      if (cart > 0) {
        toast(lang === 'th' ? `ในตะกร้าของคุณมีอาหาร ${cart} รายการ` : `You have ${cart} item(s) in your cart`);
      } else {
        toast(lang === 'th' ? 'ตะกร้าของคุณยังว่างอยู่ เลือกสั่งอาหารได้เลย!' : 'Your cart is empty. Start adding delicious items!');
      }
    }
  });
}

// Add to Cart from product cards
const prodBox = $('#products');
if (prodBox) {
  prodBox.addEventListener('click', e => {
    const b = e.target.closest('button[data-name]');
    if (!b) return;
    cart++;
    updateCartCount();
    toast(lang === 'th' ? `เพิ่ม ${b.dataset.name} ลงตะกร้าแล้ว` : `Added ${b.dataset.name} to cart`);
  });
}

// 4. Delivery / Pickup Toggle Buttons
$$('.seg__btn').forEach(b => {
  b.addEventListener('click', () => {
    const mode = b.dataset.mode || (b.dataset.i18n === 'delivery' ? 'delivery' : 'pickup');
    setOrderMode(mode, true);
  });
});

// Category Switch
$$('.cat').forEach(b => {
  b.addEventListener('click', () => {
    $$('.cat').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    render(b.dataset.cat);
  });
});

// Search Bar
const sb = $('#searchbar');
const searchInput = $('#searchInput');
if ($('#searchBtn') && sb) {
  $('#searchBtn').addEventListener('click', () => {
    sb.classList.add('open');
    if (searchInput) setTimeout(() => searchInput.focus(), 250);
  });
}
if ($('#searchCancel') && sb) {
  $('#searchCancel').addEventListener('click', () => {
    sb.classList.remove('open');
    if (searchInput) searchInput.value = '';
  });
}
if (searchInput) {
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim().toLowerCase();
      if (!q) return;
      const dict = menuData[lang] || menuData['th'];
      const cat = Object.keys(dict).find(k => dict[k].some(p => (p[1] + p[2]).toLowerCase().includes(q)));
      if (cat) {
        render(cat);
        $$('.cat').forEach(x => x.classList.toggle('active', x.dataset.cat === cat));
        if (sb) sb.classList.remove('open');
        const menuSec = $('#menu');
        if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
      } else {
        toast(lang === 'th' ? 'ไม่พบเมนูที่ค้นหา' : 'No matching menu item found');
      }
    }
    if (e.key === 'Escape' && $('#searchCancel')) $('#searchCancel').click();
  });
}

// Deals Carousel
const track = $('#track');
if (track) {
  const nextBtn = $('#next');
  const prevBtn = $('#prev');
  if (nextBtn) nextBtn.addEventListener('click', () => track.scrollBy({ left: 304, behavior: 'smooth' }));
  if (prevBtn) prevBtn.addEventListener('click', () => track.scrollBy({ left: -304, behavior: 'smooth' }));
  setInterval(() => {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: 304, behavior: 'smooth' });
    }
  }, 4500);
}

// Burger & Drawer
const burger = $('#burger');
if (burger) {
  burger.addEventListener('click', e => {
    e.preventDefault();
    openDrawer();
  });
}
const drawerCloseBtn = $('#drawerClose');
if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
if (backdrop) backdrop.addEventListener('click', closeDrawer);
if (drawer) {
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });
}

// Logo click: prevent page reload/jump
const logoTrigger = $('#logoTrigger');
if (logoTrigger) {
  logoTrigger.addEventListener('click', e => e.preventDefault());
}

// Keyboard shortcuts (Escape closes login or drawer)
addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLogin();
    closeDrawer();
  }
});

// Sticky header & Parallax
const header = $('#header');
function onScroll() {
  const y = scrollY;
  if (header) header.classList.toggle('scrolled', y > 40);
  $$('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0;
    el.style.transform = `translateY(${y * speed}px)`;
  });
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
$$('.reveal').forEach(el => io.observe(el));

// Initialize State on Load
updateCartCount();
setOrderMode(currentOrderMode, false);
applyLang();

// Hero Image Slider with Dots
(function () {
  const track = document.getElementById('heroTrack');
  const prev = document.getElementById('heroPrev');
  const next = document.getElementById('heroNext');
  const dotsContainer = document.getElementById('heroDots');
  if (!track || !prev || !next || !dotsContainer) return;

  const slides = track.children;
  const total = slides.length;
  const dots = dotsContainer.querySelectorAll('span');
  let index = 0;
  let slideInterval;

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // อัปเดตสถานะ Active ของจุด
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => goTo(index + 1), 5000);
  }

  prev.addEventListener('click', () => { goTo(index - 1); resetInterval(); });
  next.addEventListener('click', () => { goTo(index + 1); resetInterval(); });

  // กดที่จุดเพื่อเปลี่ยนสไลด์
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      resetInterval();
    });
  });

  slideInterval = setInterval(() => goTo(index + 1), 5000);
})();