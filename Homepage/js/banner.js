
/* ========================================
   BANNER SLIDER
======================================== */

export function initBannerSlider() {

    const track = document.getElementById('bannerTrack');
    const slides = document.querySelectorAll('.banner-slide');
    const prevBtn = document.getElementById('bannerPrev');
    const nextBtn = document.getElementById('bannerNext');
    const dots = document.querySelectorAll('#bannerDots .banner-dot');

    // ตรวจสอบว่ามี Banner Slider หรือไม่
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoSlide;

    // แสดงภาพตาม Index
    function showSlide(index) {

        currentIndex = (index + slides.length) % slides.length;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // ภาพก่อนหน้า
    function prevSlide() {
        showSlide(currentIndex - 1);
        resetAutoSlide();
    }

    // ภาพถัดไป
    function nextSlide() {
        showSlide(currentIndex + 1);
        resetAutoSlide();
    }

    // เริ่มเลื่อนภาพอัตโนมัติ
    function startAutoSlide() {
        autoSlide = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000);
    }

    // รีเซ็ตเวลาเลื่อนอัตโนมัติ
    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // ปุ่มลูกศร
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);

    // ปุ่มจุดเลือกภาพ
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // เริ่มต้น
    showSlide(0);
    startAutoSlide();
}
