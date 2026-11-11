/* ========================================
   1. MENU DATA
======================================== */

export const menu = {
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
   2. LANGUAGE DATA
======================================== */

export let lang = 'th';

export const i18n = {
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
   LANGUAGE SETTER
======================================== */

export function setLang(value) {

    if (i18n[value]) {
        lang = value;
    }

}