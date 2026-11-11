
import { $, toast } from './utils.js';

let cart = 0;

/* ========================================
   SHOPPING CART
======================================== */

export function initCart() {

    const products = $('#products');
    const cartCount = $('#cartCount');
    const cartButton = $('#cartBtn');

    if (!products || !cartCount) return;

    // Add product to cart
    products.addEventListener('click', (event) => {

        const button = event.target.closest('button[data-name]');

        if (!button) return;

        cart++;

        cartCount.textContent = cart;

        toast(`เพิ่ม ${button.dataset.name} ลงตะกร้าแล้ว`);

    });

    // View cart
    if (cartButton) {

        cartButton.addEventListener('click', () => {

            toast(
                cart > 0
                    ? `ในตะกร้ามี ${cart} รายการ`
                    : 'ตะกร้ายังว่างอยู่'
            );

        });

    }

}