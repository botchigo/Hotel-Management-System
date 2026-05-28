document.addEventListener('DOMContentLoaded', () => {
    const promoTableBody = document.getElementById('promoTableBody');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');

    let originalPromotions = Array.from(promoTableBody.children);
    let currentPage = 1;
    const rowsPerPage = 5;

    function renderTable() {
        promoTableBody.innerHTML = '';
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const promotionsToDisplay = originalPromotions.slice(start, end);

        promotionsToDisplay.forEach(promo => {
            promoTableBody.appendChild(promo);
        });

        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = Math.ceil(originalPromotions.length / rowsPerPage);
    }

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage = 1;
            renderTable();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(originalPromotions.length / rowsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(originalPromotions.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage = totalPages;
            renderTable();
        }
    });

    // Initial Render
    renderTable();
});