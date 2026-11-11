
import { $ } from './utils.js';

/* ========================================
   1. STORE FINDER
======================================== */

export function initStoreFinder() {

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
