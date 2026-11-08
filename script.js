const $ = s => document.querySelector(s);
const menu = {
  chicken: [['🍗','ไก่ทอดต้นตำรับ','1 ชิ้น สูตร 11 เครื่องเทศ',45],['🌶️','ไก่ฮอต & สไปซี่','เผ็ดจัดจ้าน 1 ชิ้น',49],['🍗','ไก่ทอด 3 ชิ้น','สุดคุ้ม พร้อมซอส',129],['🍗','ไก่ทอด 9 ชิ้น','สำหรับแชร์',349]],
  burger: [['🍔','ซิงเกอร์เบอร์เกอร์','ไก่ชิ้นใหญ่ ซอสมายองเนส',79],['🍔','ทาวเวอร์เบอร์เกอร์','เพิ่มชีสและแฮชบราวน์',99],['🌯','ทวิสเตอร์','ไก่ห่อแป้งนุ่ม',75]],
  snack: [['🍟','เฟรนช์ฟรายส์','กรอบ เค็มกำลังดี',39],['🥔','มันบดเกรวี่','เกรวี่สูตรลับ',35],['🍤','นักเก็ต 6 ชิ้น','ไก่ชิ้นพอดีคำ',65],['🌽','ข้าวโพดอบเนย','หวานหอม',29]],
  drink: [['🥤','เป๊ปซี่','เย็นชื่นใจ',25],['🧋','ชานมเย็น','หอมหวาน',39],['🍋','เลมอนโซดา','สดชื่น',35]],
  dessert: [['🍦','ไอศกรีมซันเดย์','ซอสช็อกโกแลต',35],['🥧','เอ้กทาร์ต','ไส้คัสตาร์ด',29],['🍩','โดนัทสอดไส้','นุ่มหวาน',25]]
};
let cart = 0;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(toast.id); toast.id=setTimeout(()=>t.classList.remove('on'),2000); }
function render(cat){
  $('#products').innerHTML = menu[cat].map(([i,n,d,p],k)=>`<div class="card" style="animation-delay:${k*.08}s"><i>${i}</i><h3>${n}</h3><p>${d}</p><b>฿${p}</b><button class="btn btn--primary" data-name="${n}">เพิ่มลงตะกร้า</button></div>`).join('');
}
render('chicken');
document.querySelectorAll('.cat').forEach(b=>b.onclick=()=>{ document.querySelectorAll('.cat').forEach(x=>x.classList.remove('active')); b.classList.add('active'); render(b.dataset.cat); });
$('#products').addEventListener('click',e=>{ const b=e.target.closest('button[data-name]'); if(!b) return; $('#cartCount').textContent=++cart; toast(`เพิ่ม ${b.dataset.name} แล้ว`); });
$('#cartBtn').onclick=()=>toast(cart?`ในตะกร้ามี ${cart} รายการ`:'ตะกร้ายังว่างอยู่');

// Sticky header + parallax
const header=$('#header');
function onScroll(){
  const y=scrollY; header.classList.toggle('scrolled',y>40);
  document.querySelectorAll('[data-parallax]').forEach(el=>el.style.transform=`translateY(${y*el.dataset.parallax}px)`);
}
addEventListener('scroll',onScroll,{passive:true}); onScroll();

// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('show'); io.unobserve(e.target);} }),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Carousel
const track=$('#track');
$('#next').onclick=()=>track.scrollBy({left:304});
$('#prev').onclick=()=>track.scrollBy({left:-304});
setInterval(()=>{ track.scrollLeft+track.clientWidth>=track.scrollWidth-4 ? track.scrollTo({left:0}) : track.scrollBy({left:304}); },4500);

// Mobile nav + store finder
HEAD
$('#burger').onclick=()=>$('#nav').classList.toggle('open');
document.querySelectorAll('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));
$('#find').onclick=()=>{ const v=$('#loc').value.trim(); $('#findMsg').textContent = v ? `📍 พบสาขา KFC ใกล้ "${v}" จำนวน 5 สาขา` : 'กรุณากรอกจังหวัดหรือรหัสไปรษณีย์'; };

$('#burger').onclick=()=>{ $('#nav').classList.toggle('open'); $('#burger').classList.toggle('open'); };
document.querySelectorAll('#nav a').forEach(a=>a.onclick=()=>{ $('#nav').classList.remove('open'); $('#burger').classList.remove('open'); });
$('#find').onclick=()=>{ const v=$('#loc').value.trim(); $('#findMsg').textContent = v ? `📍 พบสาขา KFC ใกล้ "${v}" จำนวน 5 สาขา` : 'กรุณากรอกจังหวัดหรือรหัสไปรษณีย์'; };

// Header: delivery/pickup toggle, greeting, language, search
const i18n={th:{delivery:'เดลิเวอรี่',pickup:'รับกลับบ้าน / ทานที่ร้าน',order:'เริ่มสั่งอาหาร',login:'เข้าสู่ระบบ / ลงทะเบียน',cancel:'ยกเลิก',welcome:'ยินดีต้อนรับสู่ KFC',signin:'ลงชื่อเข้าใช้',or:'หรือ',noacc:'ไม่มีบัญชีผู้ใช้',register:'สมัครบัญชีผู้ใช้',guest1:'เริ่มใช้งานแบบ',guest2:'ผู้ใช้ชั่วคราว',forgot:'ลืมรหัสผ่าน?',ph:{search:'ค้นหาเมนู',phone:'เบอร์โทรศัพท์'},g:['สวัสดีตอนเช้า','สวัสดีตอนบ่าย','สวัสดีตอนเย็น','สวัสดีตอนค่ำ']},
 en:{delivery:'Delivery',pickup:'Pickup / Dine-in',order:'Start Order',login:'Login / Register',cancel:'Cancel',welcome:'Welcome to KFC',signin:'Sign in',or:'or',noacc:"Don't have an account?",register:'Create account',guest1:'Continue as',guest2:'Guest',forgot:'Forgot password?',ph:{search:'Search menu',phone:'Phone number'},g:['Good morning','Good afternoon','Good evening','Good night']}};
let lang='th';
function greetIdx(){ const h=new Date().getHours(); return h<12?0:h<17?1:h<20?2:3; }
function applyLang(){ document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=i18n[lang][el.dataset.i18n]); $('#greet').textContent=i18n[lang].g[greetIdx()]; document.querySelectorAll('[data-ph]').forEach(el=>el.placeholder=i18n[lang].ph[el.dataset.ph]); document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang)); document.documentElement.lang=lang; }
document.querySelectorAll('.seg__btn').forEach(b=>b.onclick=()=>{ document.querySelectorAll('.seg__btn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); toast(b.textContent.trim()); });
document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>{ lang=b.dataset.lang; applyLang(); });
const sb=$('#searchbar');
$('#searchBtn').onclick=()=>{ sb.classList.add('open'); setTimeout(()=>$('#searchInput').focus(),300); };
$('#searchCancel').onclick=()=>{ sb.classList.remove('open'); $('#searchInput').value=''; };
$('#searchInput').addEventListener('keydown',e=>{ if(e.key==='Enter'){ const q=e.target.value.trim().toLowerCase(); if(!q) return; const cat=Object.keys(menu).find(k=>menu[k].some(p=>(p[1]+p[2]).toLowerCase().includes(q))); if(cat){ render(cat); document.querySelectorAll('.cat').forEach(x=>x.classList.toggle('active',x.dataset.cat===cat)); sb.classList.remove('open'); $('#menu').scrollIntoView({behavior:'smooth'}); } else toast('ไม่พบเมนูที่ค้นหา'); } if(e.key==='Escape') $('#searchCancel').click(); });
// Login page
const lg=$('#login');
const openLogin=()=>{ lg.classList.add('open'); lg.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; };
const closeLogin=()=>{ lg.classList.remove('open'); lg.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
$('#loginBtn').onclick=openLogin; $('#loginBack').onclick=closeLogin;
$('#guest').onclick=e=>{ e.preventDefault(); closeLogin(); toast('เข้าใช้งานแบบผู้ใช้ชั่วคราว'); };
$('#signin').onclick=()=>{ const v=$('#phone').value.trim(); $('#loginMsg').textContent = /^0\d{8,9}$/.test(v) ? '✔ ส่งรหัส OTP ไปที่ '+v+' แล้ว' : 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง'; };
addEventListener('keydown',e=>{ if(e.key==='Escape') closeLogin(); });
applyLang();

