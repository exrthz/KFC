
import { $, $$, toast } from './utils.js';
import { menu } from './data.js';
import { renderProducts } from './menu.js';

/* ========================================
   1. SEARCH MENU
======================================== */

export function initSearch() {

    const searchBar = $('#searchbar');
    const searchButton = $('#searchBtn');
    const cancelButton = $('#searchCancel');
    const searchInput = $('#searchInput');

    if (!searchBar || !searchButton || !cancelButton || !searchInput) {
        return;
    }

    // Open search bar
    searchButton.addEventListener('click', () => {

        searchBar.classList.add('open');

        setTimeout(() => {
            searchInput.focus();
        }, 300);

    });

    // Close search bar
    cancelButton.addEventListener('click', () => {

        searchBar.classList.remove('open');

        searchInput.value = '';

    });

    // Search menu
    searchInput.addEventListener('keydown', event => {

        if (event.key === 'Enter') {

            const keyword = searchInput.value
                .trim()
                .toLowerCase();

            if (!keyword) return;

            const category = Object.keys(menu).find(key => {

                return menu[key].some(product => {

                    return (
                        product[1] + product[2]
                    ).toLowerCase().includes(keyword);

                });

            });

            if (category) {

                renderProducts(category);

                $$('.cat').forEach(button => {

                    button.classList.toggle(
                        'active',
                        button.dataset.cat === category
                    );

                });

                searchBar.classList.remove('open');

                $('#menu').scrollIntoView({
                    behavior: 'smooth'
                });

            } else {

                toast('ไม่พบเมนูที่ค้นหา');

            }

        }

        // Close search with Escape
        if (event.key === 'Escape') {
            cancelButton.click();
        }

    });

}
