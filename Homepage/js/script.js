// KFC Thailand Web App Script
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Category icons (SVG, viewBox 0 0 48 48) — line style, red accent via .ac
const ICONS = {
  chicken: '<path class="ac" d="M28.5 7.5a11 11 0 0 1 12 12c0 6-5 10.5-11 11.5l-6.5 1-6-6 1-6.5C19 13.5 22.5 7.5 28.5 7.5z"/><path d="M18.5 29.5L11 37"/><circle cx="9" cy="35.5" r="2.6"/><circle cx="12.5" cy="39" r="2.6"/>',
  set: '<path class="ac" d="M6 27c0-5 4.5-8 10-8s10 3 10 8z"/><rect x="6" y="29.5" width="20" height="3.5" rx="1.7"/><path d="M6 35.5h20a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z"/><path d="M30 16h12l-2 22.5h-8z"/><path d="M37 16l2-7h3"/><path d="M3 42h42"/>',
  bucket: '<path d="M12 18c0-5 4-8 7-6 2-4 8-4 10 0 3-2 7 1 7 6"/><path d="M9 18h30l-3.5 24h-23z"/><path class="ac-s" d="M18 19l1.2 22M24 19v22M30 19l-1.2 22"/><path d="M7 18h34"/>',
  box: '<path d="M8 18l16-7 16 7v18l-16 7-16-7z"/><path class="ac" d="M8 18l16 7 16-7-16-7z"/><path d="M24 25v18"/>',
  burger: '<path class="ac" d="M8 22c0-8 7.2-13 16-13s16 5 16 13z"/><path d="M7 27c3 2 5-2 8 0s5-2 8 0 5-2 8 0 5-2 9 0"/><rect x="8" y="29.5" width="32" height="5" rx="2.5"/><path d="M8 37h32a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z"/>',
  rice: '<path d="M11 24c1-6 7-9 13-9s12 3 13 9"/><circle class="ac" cx="20" cy="19" r="2.5"/><circle class="ac" cx="28" cy="18.5" r="2.5"/><path d="M7 24h34a17 17 0 0 1-34 0z"/><path d="M18 42h12"/>',
  fries: '<path class="ac-s" d="M16 22l-2-14M21 22l-1-16M26 22l1-15M31 22l2-13"/><path class="ac" d="M12 22h24l-3 20H15z"/>',
  tart: '<ellipse class="ac" cx="24" cy="23" rx="14" ry="4.5"/><path d="M9 24l3.5 13h23L39 24"/><path d="M10 28h28"/>',
  drink: '<path d="M26 11l3-7h5"/><path d="M14 11h20l1 4H13z"/><path d="M13 15h22l-3 27H16z"/><path class="ac-s" d="M14.5 27h19"/>',
  nugget: '<path class="ac" d="M9 24c0-6 6-9 11-7 5-3 12 1 11 7 3 4 0 10-6 10-3 3-10 3-12-1-5 0-7-5-4-9z"/><path d="M32 30c3-1 7 0 7 4s-4 6-8 5"/>',
  wrap: '<path class="ac" d="M12 38L32 8l6 4-20 30z"/><path d="M15 33.5l18-27M18 41l4-6"/>',
  side: '<path d="M12 20c2-5 7-7 12-7s10 2 12 7"/><path class="ac" d="M10 20h28l-3 21H13z"/>',
  star: '<path class="ac" d="M24 6l5.3 11.6 12.7 1.4-9.5 8.6 2.7 12.4L24 33.6 12.8 40l2.7-12.4L6 19l12.7-1.4z"/>',
  cone: '<path class="ac" d="M14 20a10 10 0 0 1 20 0z"/><path d="M13 20h22l-11 24z"/><path d="M18 26l8 8M22 22l8 8"/>',
  sauce: '<path d="M10 20h28v6a14 14 0 0 1-28 0z"/><path class="ac" d="M13 20c2-4 6-6 11-6s9 2 11 6z"/><path d="M8 20h32"/>',
  coffee: '<path d="M14 14h20l-2.5 28h-15z"/><path d="M12 10h24v4H12z"/><path class="ac" d="M15.5 22h17l-1 12h-15z"/><path d="M27 10l2-6"/>',
  bottle: '<path d="M20 5h8v6l3 5v25a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3V16l3-5z"/><path class="ac" d="M17 22h14v10H17z"/>'
};
const svg = (k, cls = '') => `<svg class="${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k] || ICONS.chicken}</svg>`;

// Protein tags shown under each product
const TAGS = {
  chicken: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 2.5a7 7 0 0 1 7 7c0 4-3.3 6.8-7 7.3l-3.2.5-1.2 1.2a2.2 2.2 0 1 1-2.6 2.6 2.2 2.2 0 1 1-2.6-2.6 2.2 2.2 0 0 1 2.6-2.6l1.2-1.2.5-3.2c.5-3.7 2.7-9 6.3-9z"/></svg>',
  shrimp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M20 5c-8-1-15 3-15 9 0 3 2.5 5 5 5 2 0 3-1 3-2.5S12 14 10.5 14"/><path d="M14 6l-1 5M10 7.5l1 4.5M7 10.5l2.5 3"/></svg>'
};

// Category order — same sections as kfc.co.th/menu (promotions excluded)
const CATS = [
  ['best', 'star', 'สินค้าขายดี', 'Best Selling'],
  ['group', 'bucket', 'ชุดอิ่มกลุ่ม', 'Group'],
  ['box', 'box', 'เดอะบอกซ์', 'The Box'],
  ['set1', 'set', 'ชุดอิ่มเดี่ยว', 'Set For One'],
  ['cbr', 'chicken', 'ไก่ เบอร์เกอร์ ข้าว', 'Chicken / Burger / Rice'],
  ['snack', 'fries', 'เครื่องเคียงและทานเล่น', 'Sides / Snacks'],
  ['dessert', 'tart', 'ของหวาน', 'Sweets'],
  ['drink', 'drink', 'เครื่องดื่ม', 'Drinks']
];

// Menu items & prices from the KFC Thailand online menu (kfc.co.th, Nov 2026)
// [icon, name TH, name EN, price, tags, desc TH, desc EN]
const MENU = {
  best: [
    ["bucket", "จุใจ บักเก็ต", "Jujai Bucket", 379, ["chicken"]],
    ["bucket", "พอใจ บักเก็ต", "Porjai Bucket", 239, ["chicken"]],
    ["bucket", "ออลอินวัน บักเก็ต", "All In One Bucket", 339, ["chicken"]],
    ["box", "เดอะบอกซ์ ซิกเนเจอร์", "The Box Signature", 199, ["chicken"]],
    ["set", "ชุดอิ่มคุ้ม 2", "Value Meal #2", 129, ["chicken"]],
    ["box", "เดอะบอกซ์ ออลสตาร์", "The Box All Star", 209, ["chicken"]],
    ["chicken", "ไก่วิงซ์แซ่บ 3 ชิ้น", "3 pcs. WingZ Zabb", 59, ["chicken"]],
    ["rice", "ข้าวไก่แซ่บโบว์ล เคเอฟซี", "KFC Spicy Chicken Rice Bowl", 69, ["chicken"]],
    ["chicken", "ไก่ทอด 1 ชิ้น", "1 pc. Fried Chicken", 49, ["chicken"]],
    ["side", "มันบด", "Regular Mashed Potato", 69, []]
  ],
  group: [
    ["bucket", "แซนเดอร์ส ฮิต", "Sander's Hit", 239, ["chicken"], "ไก่ทอด 4 ชิ้น, ไก่วิงซ์แซ่บ 2 ชิ้น, และนักเก็ตส์ 2 ชิ้น"],
    ["bucket", "ปาร์ตี้ บักเก็ต", "Party Bucket", 539, ["chicken"]],
    ["bucket", "สุขใจ บักเก็ต", "Sukjai Bucket", 579, ["chicken"]],
    ["bucket", "จุใจ บักเก็ต", "Jujai Bucket", 379, ["chicken"]],
    ["bucket", "ออลอินวัน บักเก็ต", "All In One Bucket", 339, ["chicken"]],
    ["bucket", "พอใจ บักเก็ต", "Porjai Bucket", 239, ["chicken"]],
    ["bucket", "คริสปี้ บักเก็ต", "Crispy Bucket", 239, ["chicken"]]
  ],
  box: [
    ["box", "เดอะบอกซ์ ไคเซน", "The Box Kaisen", 219, ["chicken"], "ไก่ไม่มีกระดูก 4 ชิ้น + นักเก็ตส์ 2 ชิ้น + ไก่ป๊อป 7 ชิ้น + สกู๊ปส์ฟรายส์ ขนาดปกติ 1 ที่ + เป๊ปซี่ 1 แก้ว"],
    ["box", "เดอะบอกซ์ ออลไรซ์ ข้าวมันไก่", "The Box All Rice: Chicken Rice", 199, ["chicken"]],
    ["box", "เดอะบอกซ์ ซิกเนเจอร์", "The Box Signature", 199, ["chicken"]],
    ["box", "เดอะบอกซ์ ออลไรซ์ ข้าวไก่แซ่บโบว์ล", "The Box All Rice: Spicy Chicken", 199, ["chicken"]],
    ["box", "เดอะบอกซ์ ออลไรซ์ ข้าวไก่กรอบเขียวหวาน", "The Box All Rice: Green Curry", 199, ["chicken"]],
    ["box", "เดอะบอกซ์ ออลสตาร์", "The Box All Star", 209, ["chicken"]],
    ["box", "ใหม่ เดอะบอกซ์ ออลอีซี่ ไก่ไม่มีกระดูก", "New The Box All Easy", 199, ["chicken"]]
  ],
  set1: [
    ["rice", "ชุดข้าวมันไก่", "KFC Chicken Rice Bowl Set", 99, ["chicken"]],
    ["set", "ชุดอิ่มคุ้ม 3", "Value Meal #3", 159, ["chicken"], "ไก่ทอด 2 ชิ้น, วิงซ์แซ่บ 3 ชิ้น และเป๊ปซี่ 1 ที่"],
    ["set", "ชุดอิ่มคุ้ม 2", "Value Meal #2", 129, ["chicken"]],
    ["set", "ใหม่ ชุดอิ่มคุ้ม 1", "NEW Value Meal #1", 89, ["chicken"]],
    ["rice", "ชุดข้าวไก่แซ่บโบว์ล เคเอฟซี", "KFC Zabb Chicken Rice Bowl Set", 99, ["chicken"], "ข้าวไก่แซ่บโบว์ล 1 ที่ + เป๊ปซี่ 1 ที่"],
    ["rice", "ชุดข้าวไก่กรอบแกงเขียวหวาน เคเอฟซี", "KFC Combo Green Curry Crispy Chicken Rice", 99, ["chicken"]],
    ["set", "ชุดซิงเกอร์เบอร์เกอร์", "Zinger Burger Set", 129, ["chicken"]]
  ],
  cbr: [
    ["chicken", "ไก่ทอด 1 ชิ้น", "1 pc. Fried Chicken", 49, ["chicken"]],
    ["burger", "ซิงเกอร์ เบอร์เกอร์", "Zinger Burger", 89, ["chicken"]],
    ["rice", "ข้าวไก่แซ่บโบว์ล เคเอฟซี", "KFC Spicy Chicken Rice Bowl", 69, ["chicken"], "ไก่ทอดเนื้อล้วนชิ้นพอดีคำ คลุกเคล้าน้ำยำสุดแซ่บ พร้อมข้าวคั่ว หอมแดง ผักชี เสิร์ฟพร้อมข้าวสวยร้อนๆ"],
    ["rice", "ข้าวไก่กรอบแกงเขียวหวาน เคเอฟซี", "KFC Green Curry Crispy Chicken Rice", 69, ["chicken"], "ไก่ป๊อป ราดด้วยซอสแกงเขียวหวานสูตรพิเศษ เสิร์ฟพร้อมข้าวหอมมะลิร้อนๆ"],
    ["rice", "ข้าวมันไก่", "KFC Chicken Rice Bowl", 69, ["chicken"]],
    ["rice", "ข้าวเปล่า", "Plain Rice", 25, [], "ข้าวสวย 150 กรัม"],
    ["rice", "ข้าวมัน", "KFC Thai Fatty Rice", 39, []]
  ],
  snack: [
    ["fries", "สกู๊ปส์ฟรายส์ ไซส์ L พร้อม ซอสไวท์ บาร์บีคิว", "Scoops Fries L with White BBQ Sauce", 119, []],
    ["fries", "สกู๊ปส์ฟรายส์ ไซส์ M", "Scoops Fries M", 69, []],
    ["nugget", "ชิคแอนด์จอย ทรีโอ", "Chick 'N Joy Trio", 159, ["chicken"], "กล่องสุ่มพวงกุญแจ KFC | SANRIO CHARACTERS 1 กล่อง, ไก่วิงซ์แซ่บ 1 ชิ้น, ชิคเก้นป๊อป 7 ชิ้น, เฟรนช์ฟรายส์ (ปกติ) 1 ที่"],
    ["fries", "ชิคแอนด์จอย ฟรายส์", "Chick 'N Joy Fries", 159, ["chicken"], "กล่องสุ่มพวงกุญแจ KFC | SANRIO CHARACTERS 1 กล่อง, นักเก็ตส์ 6 ชิ้น, เฟรนช์ฟรายส์ (ปกติ) 1 ที่"],
    ["nugget", "ชิคแอนด์จอย ป๊อป", "Chick 'N Joy Pop", 159, ["chicken"], "กล่องสุ่มพวงกุญแจ KFC | SANRIO CHARACTERS 1 กล่อง, ชิคเก้นป๊อป 7 ชิ้น, นักเก็ตส์ 4 ชิ้น"],
    ["nugget", "ชิคแอนด์แชร์ ทีมแซ่บ", "Chick N' Share Zabb Team", 109, ["chicken"]],
    ["nugget", "ชิคแอนด์แชร์ ทีมนักเก็ตส์ป๊อป", "Chick N' Share Nuggets & POP Team", 109, ["chicken"]],
    ["nugget", "โซลฮอตแก๊งชิคเก้นป๊อป", "Seoul Hot Pop Gang", 99, ["chicken"]],
    ["nugget", "โซลฮอต ชิคเก้น ป๊อป", "Seoul Hot Chicken Pop", 49, ["chicken"]],
    ["nugget", "สแน็ค บอกซ์", "Snax Box", 169, ["chicken"]],
    ["sauce", "ซอสมายองเนสรสแซ่บ", "Zabb Mayo Dip Sauce", 35, []],
    ["sauce", "ซอสโคเรียน ฮอท", "Korean Hot Dip Sauce", 35, []],
    ["sauce", "ซอสไวท์ บาร์บีคิว", "White BBQ Dip Sauce", 35, []],
    ["sauce", "น้ำจิ้มข้าวมันไก่ สูตรผู้พัน", "KFC Chicken Rice Sauce", 20, []],
    ["nugget", "นักเก็ตส์ 6 ชิ้น", "6 pcs. Nuggets", 89, ["chicken"], "นักเก็ตส์ 6 ชิ้น พร้อมซอสบาร์บีคิว 1 ถ้วย"],
    ["chicken", "ไก่วิงซ์แซ่บ 3 ชิ้น", "3 pcs. WingZ Zabb", 59, ["chicken"]],
    ["chicken", "ไก่วิงซ์แซ่บ 2 ชิ้น", "2 pcs. WingZ Zabb", 45, ["chicken"]],
    ["wrap", "ใหม่! ชิคแอนด์โรล", "New Chick N' Roll", 59, ["chicken"]],
    ["wrap", "ชิค แอนด์ โรล", "Chick N' Roll", 45, ["chicken"]],
    ["nugget", "ไก่ไม่มีกระดูก 2 ชิ้น", "2 pcs. Crispy Strips", 45, ["chicken"]],
    ["nugget", "ชิคเก้นป๊อป 7 ชิ้น", "7 pcs. Chicken POP", 45, ["chicken"]],
    ["nugget", "กุ้งโดนัท", "Shrimp Donut", 45, ["shrimp"]],
    ["fries", "เฟรนช์ฟรายส์ (จัมโบ้)", "Jumbo French Fries", 79, []],
    ["fries", "เฟรนช์ฟรายส์ (ใหญ่)", "Large French Fries", 69, []],
    ["fries", "เฟรนช์ฟรายส์ (ปกติ)", "Regular French Fries", 59, []],
    ["side", "มันบด", "Regular Mashed Potato", 69, []],
    ["side", "โคลสลอว์", "Coleslaw", 69, []],
    ["side", "ทูน่า คอร์น สลัด", "Tuna Corn Salad", 69, []]
  ],
  dessert: [
    ["tart", "ทาร์ตไข่ 6 ชิ้น", "6 pcs. Egg Tart", 189, [], "ทาร์ตไข่สูตรต้นตำรับ อบสดใหม่ แป้งพายกรอบ ไส้เนียนนุ่ม"],
    ["tart", "ทาร์ตไข่ 3 ชิ้นราคาพิเศษ", "Egg Tart 3 pcs Special Price", 69, []],
    ["tart", "ทาร์ตไข่ 2 ชิ้น", "2 pcs. Egg Tart", 65, [], "ทาร์ตไข่สูตรต้นตำรับ อบสดใหม่ แป้งพายกรอบ ไส้เนียนนุ่ม"],
    ["tart", "ทาร์ตไข่ 1 ชิ้น", "1 pc. Egg Tart", 39, [], "ทาร์ตไข่สูตรต้นตำรับ อบสดใหม่ แป้งพายกรอบ ไส้เนียนนุ่ม"],
    ["tart", "ทาร์ตไข่คิทแคทโอเวอร์โหลด 4 ชิ้น", "Egg Tart KitKat Overload 4 pcs.", 129, [], "ทาร์ตไข่ช็อกโกแลตครัมเบิ้ล ผสมคิทแคท"],
    ["tart", "ทาร์ตไข่คิทแคทโอเวอร์โหลด", "Egg Tart KitKat Overload", 35, [], "ทาร์ตไข่ช็อกโกแลตครัมเบิ้ล ผสมคิทแคท"],
    ["cone", "ดิพโคนนัตตี้", "Dip Cone Nutty", 29, []],
    ["cone", "ดิพโคนเรนโบว์", "Dip Cone Rainbow", 29, []]
  ],
  drink: [
    ["bottle", "น้ำแร่", "Mineral Water", 25, []],
    ["bottle", "น้ำแร่ช้าง", "Chang Water", 25, []],
    ["drink", "เป๊ปซี่ 1 แก้ว (ปกติ)", "Pepsi 1 Glass (Regular)", 49, []],
    ["drink", "เซเว่นอัพ ไม่มีน้ำตาล 1 แก้ว (ปกติ)", "7-Up No Sugar 1 Glass (Regular)", 49, []],
    ["drink", "เป๊ปซี่ ไม่มีน้ำตาล 1 แก้ว (ปกติ)", "Pepsi Max 1 Glass (Regular)", 49, []],
    ["drink", "เป๊ปซี่ 1 แก้ว (ใหญ่)", "Pepsi 1 Glass (Large)", 59, []],
    ["drink", "เซเว่นอัพ ไม่มีน้ำตาล 1 แก้ว (ใหญ่)", "7-Up No Sugar 1 Glass (Large)", 59, []],
    ["drink", "เป๊ปซี่ ไม่มีน้ำตาล 1 แก้ว (ใหญ่)", "Pepsi No Sugar 1 Glass (Large)", 59, []],
    ["coffee", "สตรอว์เบอร์รีนมสดเย็น 16 ออนซ์", "Iced Pinky Milk 16oz", 49, []],
    ["coffee", "มัทฉะลาเต้เย็น 16 ออนซ์", "Iced Matcha Latte 16oz", 49, [], "ชาเขียวแท้ 100% จากเมืองชิซุโอกะ"],
    ["coffee", "ช็อกโกแลตเย็น 16 ออนซ์", "Iced Chocolate 16oz", 45, []],
    ["coffee", "คาปูชิโน่เย็น 16 ออนซ์", "Iced Cappuccino 16oz", 45, []],
    ["coffee", "ลาเต้เย็น 16 ออนซ์", "Iced Caffe Latte 16oz", 45, []],
    ["coffee", "เอสเพรสโซ่เย็น 16 ออนซ์", "Iced Espresso 16oz", 45, []],
    ["coffee", "อเมริกาโน่เย็น 16 ออนซ์", "Iced Americano 16oz", 39, []],
    ["coffee", "มัทฉะลาเต้ร้อน 8 ออนซ์", "Hot Matcha Latte 8oz", 39, []],
    ["coffee", "ช็อกโกแลตร้อน 8 ออนซ์", "Hot Chocolate 8oz", 39, []],
    ["coffee", "คาปูชิโน่ร้อน 8 ออนซ์", "Hot Cappuccino 8oz", 39, []],
    ["coffee", "ลาเต้ร้อน 8 ออนซ์", "Hot Caffe Latte 8oz", 39, []],
    ["coffee", "เอสเพรสโซ่ร้อน 8 ออนซ์", "Hot Espresso 8oz", 29, []],
    ["coffee", "อเมริกาโน่ร้อน 8 ออนซ์", "Hot Americano 8oz", 29, []]
  ]
};
// Product photos from KFC Thailand's image CDN (falls back to the SVG icon when offline)
const IMG_BASE = 'https://images.ctfassets.net/n4pc9wlortyn/';
const IMG = {
  "1 pc. Egg Tart": "6eueZZxvmoj0TyEDoiHT2K/342d84453f0f7bab4481cb82cde0e1d3/1_pc._Egg_Tart_480x388.png",
  "1 pc. Fried Chicken": "39a5Inu9EcbNp7EvYyEEGT/1abb12f5e241d6c6d15184a89a25870c/-CAT7-14-_-_1_COB_0.jpg",
  "2 pcs. Crispy Strips": "1lUP8d7TNIwllDocIHuy7o/d4b6b241aec6fc8f9074bf982d0853a5/2_pcs._Crispy_Strip_480x388.png",
  "2 pcs. Egg Tart": "5uoqZxVQ9KGsnfUoyItnrK/b3053b030c6ad216fb3a03989d55c309/2_pc._Egg_Tart_480x388.png",
  "2 pcs. WingZ Zabb": "5NMycxbXDszGSlDBQ0LEEW/18470f88d6aeca847329d2ccc2de7940/2_pcs._WingZ_Zabb_480x388.png",
  "3 pcs. WingZ Zabb": "2J67QA2guNagN1PKGXKXih/600a61820ae57f7aaf7c016e9b1eb7d1/3_pcs._WingZ_Zabb_480x388.png",
  "6 pcs. Egg Tart": "1lEFBpbHDatc1QHvHYxlnV/c3fc83870850b679b4e00a6488c1daa0/6_pc._Egg_Tart__480x388.png",
  "6 pcs. Nuggets": "1XJKPWrBZ1MLAetmpHZegK/454c694a85bb16aaf7a0ae10fc7c4e65/KFC_Nuggets.png",
  "7 pcs. Chicken POP": "ixqPr5roRfvh88mGjAQi8/3b2fb1630828999a6045d7309ac0df9a/7_pcs._Chicken_Pop_480x388.png",
  "7-Up No Sugar 1 Glass (Large)": "gyIOI9C9CoZNqdzKh2CYQ/ff975f64f6334b2882837c4c746aea02/7-Up_No_Sugar_480x388.png",
  "7-Up No Sugar 1 Glass (Regular)": "gyIOI9C9CoZNqdzKh2CYQ/ff975f64f6334b2882837c4c746aea02/7-Up_No_Sugar_480x388.png",
  "All In One Bucket": "76fvqPeCVnGccmI84j9yk7/8aef4f3b6344effdcc63999e67a9e3cb/NEW-HE_All-in-one.png",
  "Chang Water": "1ZrPVG4kHoP4ziXaEk4qdh/be15d2b145ef7e92076aa03703d1e57f/mineral-water_800x800.png",
  "Chick 'N Joy Fries": "7Fby9EmcPvDWHjRso8dY04/3d36fceba51c82cd0e6ef84b5449dc16/Sanrio_CNJ_Fries.png",
  "Chick 'N Joy Pop": "47ypNJvy9urYOmTLSW0IiY/f0bca3d1c1ef6f71d3576ff356c383e9/Sanrio_CNJ_Pop.png",
  "Chick 'N Joy Trio": "4cWkZ1nvSmRmVLu6YXOOh/34be21e72f0680d502c89bd82bf4eb94/Sanrio_CNJ_Trio.png",
  "Chick N' Roll": "2YmSeanh4NMFwTxizBYBSQ/39350972d7ae4e2f13b6e9bfc9960c7b/Chick_N_Roll.png",
  "Chick N' Share Nuggets & POP Team": "629ri2TI1en2Gginq0hrxm/bf507a163c42da698230e3d7eb3128fa/CHICK_N-_SHARE_NUGGETS_POP_TEAM_480x388.png",
  "Chick N' Share Zabb Team": "3RvEQrNy3W3PYL15bSlwTv/50641c4c794ff9d654648b4afacfdc69/Team-Zabb_EN.png",
  "Coleslaw": "7qzm5uXIGIvPQnRoPUFo6W/e8850f4ff6ca09ec9c389a8635d9f71a/Coleslaw.png",
  "Crispy Bucket": "1rB4tTKRIAuchEOQallHRH/2c3855ac51fe7a72ba51a7b2770ce051/Crispy-Bucket.png",
  "Dip Cone Nutty": "H8sM9XS9fkkEdd0QMxnZx/7567dc368cc400ab3d51c83f195b928c/SoftServe_DipNutty-.png",
  "Dip Cone Rainbow": "1C3UgVM3rB8fYDwoYlWb4r/d4c96ecf6f30526f826379b4fd06fca2/SoftServe_DipRainbow.png",
  "Egg Tart 3 pcs Special Price": "71gxkmcN9S1VmHlj6i6yKV/ee73fe8a015fa47b5eeb5923230bfbce/3pcsEggTarts.png",
  "Egg Tart KitKat Overload": "2OArAOq82M7pWOzQIMrGll/a0d81f6b156fca6414770051effcfb24/1pc_Egg-Tart-KITKAT-Overload.png",
  "Egg Tart KitKat Overload 4 pcs.": "3tBf1AKe272wtPnmrBeiI5/eecb2a4937df030ab3f58e394466a636/4pcs_Egg-Tart-KITKAT-Overload.png",
  "Hot Americano 8oz": "54KdSaqWbccm5aJgpGRhG8/9e8736994ccf182fbb32911af888c9af/HotAmericano_480x388.png",
  "Hot Caffe Latte 8oz": "3xfmbwwNDdPMce9eXm9vAf/d3d2b85ced438c7bd6a3144adc132371/HotLatte_480x388.png",
  "Hot Cappuccino 8oz": "7K5nZBMx6p0DmDiQr2J5XJ/6ea2c3ebd91bebe16ad6b6d80d060853/Hot-Cappuchino_arigato.png",
  "Hot Chocolate 8oz": "78B9fNzw4UdDhCKCHvfiLY/48ff654cf65a430e0527bfea15551f25/HotChocolate_480x388.png",
  "Hot Espresso 8oz": "1m8kSe9sihCI5CH2vxhUo7/9a0673c94320166f320ef3527ca3674c/HotEspresso_480x388.png",
  "Hot Matcha Latte 8oz": "15mZf5d20GJW4DsRQ8JCwe/c811671eb2f1ad1a6c72fe9af641feb8/HotMatchaLatte_480x388.png",
  "Iced Americano 16oz": "1gG9lvRi4ZfBZEs8DCHF99/b053fc07efdf3a75066b5137e52338bd/IcedAmericano_480x388.png",
  "Iced Caffe Latte 16oz": "6EBLbWvp7WlID09mpSzlP7/26922684f1857b6e4c6fe9a180dc62c8/IcedCaffeLatte_480x388.png",
  "Iced Cappuccino 16oz": "5MJl1g9dmuXqbdbpJmZx0c/c96817414daf2e31c6361c54517ba12e/IcedCappuccino_480x388.png",
  "Iced Chocolate 16oz": "5gEPCPZ82XxSb36U7brrfP/52ea873bd8e41d5c9a19336a0efdff85/IcedChocolate_480x388.png",
  "Iced Espresso 16oz": "SmlGNIBr0mCxoeCtrm9vS/9bf614db87a44eeb7036ad0ae667c269/IcedEspresso_480x388.png",
  "Iced Matcha Latte 16oz": "2faQl2VCe9TYtYL0JINtWR/e9fe656929dd3b1c806b713c1c55e8bd/Iced_Matcha_Latte_16oz_480x388.png",
  "Iced Pinky Milk 16oz": "7BEkkFswnPpISyARO0zOc2/da0218514b5079ee9368d4cdd1aea38c/IcedPinkyMilk_480x388.png",
  "Jujai Bucket": "55oasxCD4W97TMvxwQwIpr/324057adea453b9579a5d7e0b44efb8d/JPU_Chicken_Jujai__480x388.png",
  "Jumbo French Fries": "2EJhcxkH1arZq3ywQNCFvd/ad81d593123bb493a740a88ae588790c/Jumbo-French-Fries.png",
  "KFC Chicken Rice Bowl": "5r6O0DEVCl3dL5AcjwBqWF/aebd87b237d13ce5f3e85dc3c33f8c88/Khao-Man-Kai-Rice-Bowl.png",
  "KFC Chicken Rice Bowl Set": "7piLyvBDpUVyU25IIe6Pcf/994e446191d61760e604d05185a27303/Combo_KMK.png",
  "KFC Chicken Rice Sauce": "69yuabPv7XUGzGu3vvHtFo/1cb4a989a2970e928597d80d042b17b9/63af6eb5-85b2-46a5-b297-deb782ae560f.png",
  "KFC Combo Green Curry Crispy Chicken Rice": "6QKLICycgdGv2sVaL8IyqJ/09f4fd9f182c77c5cce3718a8c7efa8b/KFC_Green_Curry_Rice_Bowl_Set.png",
  "KFC Green Curry Crispy Chicken Rice": "5fLTkdoN1TTSOHSJhSvwmy/5bb7a6643d9b57ef61c1be9de6a354a1/Green_Curry_Rice_bowl.png",
  "KFC Spicy Chicken Rice Bowl": "5CHcoRrT9cSHrtQfYQXZst/e3c61128536a29d7c5a80cded0aee179/Spicy_Chicken_Rice_Bowl_480x388.png",
  "KFC Thai Fatty Rice": "4VKd4sz079TxuR9aZBztF0/156ff7445ba480f05fe72b650ba64a0b/Khao-Mun.png",
  "KFC Zabb Chicken Rice Bowl Set": "01L1TdpsBqS9SUbCix1cy5/5e2cb369b3e0b8a725135f5f6ab5d61a/KFC_Spicy_Chicken_Rice_Bowl_Set.png",
  "Korean Hot Dip Sauce": "MdyNPNh7Jc8CZMhAc4rNS/0d150a86bd6d96b82d7bb2b39cfc9b30/1_korean-hot-sauce.png",
  "Large French Fries": "6u1DKZ5KatpRxSXxYDD3bk/83e029ee50d31c4843ae373680804477/Large-French-Fries.png",
  "Mineral Water": "4l7HHuczM6P3Y2gL6F5282/3b7876ba9331342253b1d4a2ebe22491/Mineral_Water_480x388.png",
  "NEW Value Meal #1": "6lsWzuh71DMiUEcYolW0as/ecca6901beab439a288d3e7f3ead229a/Imkoom-1.png",
  "New Chick N' Roll": "31aSHLcquf7Bton9LGCAme/b6aaf8818acf40b4c697568a0f9f4d18/New-Chick-n-roll.png",
  "New The Box All Easy": "2fgxAhtPRvLrp3eu6p2DNl/93460167fbcac7d268cb4188bb26b61c/The-box-all-easy_JPU.png",
  "Party Bucket": "4aOFG3X6RlCxMjVN0hIDeH/7d3d7d6d7351570c6f788866baf89dd5/SPU_Party_Bucket_480x388.png",
  "Pepsi 1 Glass (Large)": "6vvUyuXaRROoCVhOY3nmLX/a248ffc9305534fbdedb16e695ee3892/Pepsi_1_Glass_480x388.png",
  "Pepsi 1 Glass (Regular)": "6vvUyuXaRROoCVhOY3nmLX/a248ffc9305534fbdedb16e695ee3892/Pepsi_1_Glass_480x388.png",
  "Pepsi Max 1 Glass (Regular)": "2GtpqTzCLqjBn1nuUa4Ao/20ef21f47f7f9c7611d3efbdae4a803e/Pepsi_no_sugar_1_Glass_480x388.png",
  "Pepsi No Sugar 1 Glass (Large)": "2GtpqTzCLqjBn1nuUa4Ao/20ef21f47f7f9c7611d3efbdae4a803e/Pepsi_no_sugar_1_Glass_480x388.png",
  "Plain Rice": "OXZHelDGLBtXt6nux2TkH/8a1c60461d1010ac1489ca608b48dad1/Plain_Rice_480x388.png",
  "Porjai Bucket": "2VyYkaG4pTIieNYRu8S7lM/66255dbde49c6cbb85b5efcd2a1a6f92/Porjai-Bucket.png",
  "Regular French Fries": "6UFkOmNlzQHaiXrH9yc45k/e1341d1c1ec69e1a985afc7753ab00ac/French_Fries__Regular__480x388.png",
  "Regular Mashed Potato": "CYUOrga6G7odtPc4u1EXm/47e20a7018d91627f597ab828786e76e/Mashed_potato.png",
  "Sander's Hit": "RI7VtKtuhyLI2yEJaxYzv/c17539dfca7e598551ff9ac8fbce921a/Sanders_Hit.png",
  "Scoops Fries L with White BBQ Sauce": "3blwUAmbnA1DFjngcvTcMc/631e1e303a9b48ef6580a9b97a5d1b9f/Scoops_Fries_size_L_Dip_sauce.png",
  "Scoops Fries M": "6UKKMMC0rK9Sj8NKx8BRVy/31b9f6266dbe66a4c19c8910cb60546f/Scoops_Fries_size_M.png",
  "Seoul Hot Chicken Pop": "1G45vaJWnZ4fuaL1rR98vp/6982739e9b17ed4bb788cd0aa42bdf40/Seoul_Hot_ALC.png",
  "Seoul Hot Pop Gang": "56JaLXOnD9BUtCAFo2JneP/4b217b7bd498dc86f4f6fd0cecdee869/Seoul_Hot_Gang.png",
  "Shrimp Donut": "6QPqFn9J7F68ubgbb16u1j/e4463b4b52808563fbd688224857645d/Shrimp_Donut_480x388.png",
  "Snax Box": "7lQZW0hDrl2zmZoO3m7OWu/0480b999c07759f856ffbedc8be9f0f7/SPU_Snack_Box_480x388.png",
  "Sukjai Bucket": "UIiWv82wYFSWQx2RIeGWZ/e0dd64a006982606288924c229bd87fe/Sukjai.png",
  "The Box All Rice: Chicken Rice": "28dBYtYRkOK9PmLYjGHYsq/b68d1a6e17692117afaa891f6b41ded1/The-Box-Khao-Mun-Kai_JPU.png",
  "The Box All Rice: Green Curry": "x2H6qepmCsnvCJD4Of5q1/5f67d085128c0f587261a9a4b45180a6/JPU_The_Box_All_Rice_Green_Curry_480x388.png",
  "The Box All Rice: Spicy Chicken": "1VynJvkHfHS2QFjNLvvjYS/a61598f75cae5c805d255180d4b12746/JPU_The_Box_All_Rice_480x388.png",
  "The Box All Star": "shFWdqADEwHRVSRHpjvUM/9a26deb081a89544c3c7b0af2e01e202/JPU_The_Box_All_Star_480x388.png",
  "The Box Kaisen": "5Rbz4foutyjthuW4X1t0NI/dad94b9f0120b40270504f6a9b3fa08b/THE_BOX_KAISEN.png",
  "The Box Signature": "7BoZpkNiyICqN9CLgBl9J8/3806c7658e37067c0e395eae8b31cf3b/JPU_The_Box_Signature_480x388.png",
  "Tuna Corn Salad": "1hIR5NWKBJWfatTj8fxF35/ffd208e2fea433d819ffa2a942020573/Tuna_Corn_Salad_480x388.png",
  "Value Meal #2": "5GTpJqPfexYGbqh7DtlaIZ/c704199ac7e060bd4af287863beedbdf/Imkoom2.png",
  "Value Meal #3": "5QIbp5L0EuTKxU02XxaKUV/7f01d66ecfbf580fa2f97cb67ec65cfb/Imkhoom-3__ValueMeal3_.png",
  "White BBQ Dip Sauce": "7lFmi7Q4i6Wv3IobBEFyTe/4ae432f95f09fadf19214749ba68843d/1_white-bbq.png",
  "Zabb Mayo Dip Sauce": "1YQtzime0DowacRtT4wea5/3d33e375fc5f53f2ed9c7e0d477f581a/Dip-Packaging_ZaBBMayo.png",
  "Zinger Burger": "1thXurAWckdDLX3bxStbc2/2cdb22c723fa384bdbf60dc18a07d973/Zinger_Burger_Burger_480x388.png",
  "Zinger Burger Set": "38JLluIjb8jKYhk6TI45kA/af206e1c077b3b913887776f4a26ad1f/Zinger-burger-combo_jpu.png"
};
const TAG_NAMES = { th: { chicken: 'ไก่', shrimp: 'กุ้ง' }, en: { chicken: 'Chicken', shrimp: 'Shrimp' } };

const item = (p) => ({ icon: p[0], img: IMG[p[2]] ? IMG_BASE + IMG[p[2]] + '?w=480&fm=webp&q=75' : '', name: lang === 'en' ? p[2] : p[1], price: p[3], tags: p[4] || [], desc: (lang === 'en' ? p[6] : p[5]) || '' });


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
    drawer_bestseller: 'สินค้าขายดี',
    drawer_group: 'ชุดคอมโบ',
    drawer_box: 'เดอะบ็อกซ์',
    drawer_setone: 'ชุดอิ่มคนเดียว',
    drawer_cbr: 'ไก่ทอด / เบอร์เกอร์ / ข้าว',
    drawer_snacks: 'ของทานเล่น',
    drawer_sweets: 'ของหวาน',
    drawer_drinks: 'เครื่องดื่ม',
    menu_title: 'เลือกเมนูโปรด',
    add_to_cart: 'เลือก',
    nav_menu: 'เมนู',
    nav_app: 'แอป KFC',
    hero_tag: 'ใหม่!',
    hero_title: 'ไก่ทอด<br>กรอบนอก<br>นุ่มใน',
    hero_desc: 'สูตรลับ 11 เครื่องเทศและสมุนไพร ทอดสดใหม่ทุกวัน',
    hero_order: 'สั่งเลย',
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
    drawer_bestseller: 'Best Selling',
    drawer_group: 'Combo Sets',
    drawer_box: 'The Box',
    drawer_setone: 'Set For One',
    drawer_cbr: 'Chicken / Burger / Rice',
    drawer_snacks: 'Sides & Snacks',
    drawer_sweets: 'Sweets',
    drawer_drinks: 'Drinks',
    menu_title: 'Choose Favorite Menu',
    add_to_cart: 'Select',
    nav_menu: 'Menu',
    nav_app: 'KFC App',
    hero_tag: 'NEW!',
    hero_title: 'Fried Chicken<br>Crispy Outside<br>Tender Inside',
    hero_desc: 'Secret 11 herbs & spices recipe, freshly fried every day',
    hero_order: 'Order Now',
    ph: { search: 'Search menu', phone: 'Phone number' },
    g: ['Good morning', 'Good afternoon', 'Good evening', 'Good night']
  }
};

// State Variables
let lang = localStorage.getItem('kfc_lang') || 'th';
let currentCategory = 'best';
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

// Render Category Tabs
function renderCats() {
  const el = $('#catList');
  if (!el) return;
  el.innerHTML = CATS.map(([key, icon, th, en]) => `
    <button class="cat${key === currentCategory ? ' active' : ''}" data-cat="${key}" role="tab" aria-selected="${key === currentCategory}">
      ${svg(icon)}<span>${lang === 'en' ? en : th}</span>
    </button>
  `).join('');
}

// Render Products
function render(cat) {
  currentCategory = cat;
  const list = (MENU[cat] || []).map(item);
  const prodEl = $('#products');
  if (!prodEl) return;
  const btnText = i18n[lang].add_to_cart;
  const unit = lang === 'en' ? 'THB' : 'บาท';
  prodEl.innerHTML = list.map((p, k) => `
    <div class="card" style="animation-delay:${k * 0.06}s"${p.desc ? ` title="${p.desc}"` : ''}>
      <div class="card__img${p.img ? ' has-photo' : ''}">
        ${p.img ? `<img class="card__photo" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.parentNode.classList.remove('has-photo');this.remove()">` : ''}
        ${svg(p.icon, 'card__art')}
      </div>
      <div class="card__row">
        <h3>${p.name}</h3>
        <b>${p.price} ${unit}</b>
      </div>
      <div class="card__row">
        <span class="card__tags">${p.tags.map(t => `<i title="${TAG_NAMES[lang][t]}" aria-label="${TAG_NAMES[lang][t]}">${TAGS[t] || ''}</i>`).join('')}</span>
        <button class="btn btn--primary btn--select" data-name="${p.name}">${btnText}</button>
      </div>
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

  // Category tabs
  renderCats();

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
const catList = $('#catList');
if (catList) {
  catList.addEventListener('click', e => {
    const b = e.target.closest('.cat');
    if (!b) return;
    render(b.dataset.cat);
    renderCats();
  });
}

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
      const cat = Object.keys(MENU).find(k => MENU[k].some(p => [p[1], p[2], p[5], p[6]].join(' ').toLowerCase().includes(q)));
      if (cat) {
        render(cat);
        renderCats();
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
const drawerCats = { drawer_bestseller: 'best', drawer_group: 'group', drawer_box: 'box', drawer_setone: 'set1', drawer_cbr: 'cbr', drawer_snacks: 'snack', drawer_sweets: 'dessert', drawer_drinks: 'drink' };
if (drawer) {
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      const cat = drawerCats[a.dataset.i18n];
      if (cat) { render(cat); renderCats(); }
      closeDrawer();
    });
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
