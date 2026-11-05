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
$('#burger').onclick=()=>$('#nav').classList.toggle('open');
document.querySelectorAll('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));
$('#find').onclick=()=>{ const v=$('#loc').value.trim(); $('#findMsg').textContent = v ? `📍 พบสาขา KFC ใกล้ "${v}" จำนวน 5 สาขา` : 'กรุณากรอกจังหวัดหรือรหัสไปรษณีย์'; };
