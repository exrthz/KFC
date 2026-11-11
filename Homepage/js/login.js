
import { $, toast } from './utils.js';

/* ========================================
   1. LOGIN PAGE
======================================== */

export function initLogin() {

    const login = $('#login');
    const loginButton = $('#loginBtn');
    const backButton = $('#loginBack');
    const guestButton = $('#guest');
    const signInButton = $('#signin');

    if (!login) return;

    // Open Login
    function openLogin() {

        login.classList.add('open');

        login.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';

    }

    // Close Login
    function closeLogin() {

        login.classList.remove('open');

        login.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';

    }

    // Login Button
    if (loginButton) {
        loginButton.addEventListener('click', openLogin);
    }

    // Back Button
    if (backButton) {
        backButton.addEventListener('click', closeLogin);
    }

    // Guest Login
    if (guestButton) {

        guestButton.addEventListener('click', event => {

            event.preventDefault();

            closeLogin();

            toast('เข้าใช้งานแบบผู้ใช้ชั่วคราว');

        });

    }

    // Sign In
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

    // Close with Escape
    document.addEventListener('keydown', event => {

        if (event.key === 'Escape') {
            closeLogin();
        }

    });

}
