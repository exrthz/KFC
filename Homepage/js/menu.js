import { menu } from './data.js';
import { $, $$ } from './utils.js';

/* ========================================
   PRODUCT RENDERING
======================================== */

export function renderProducts(category) {
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
   PRODUCT CATEGORY
======================================== */

export function initCategories() {
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