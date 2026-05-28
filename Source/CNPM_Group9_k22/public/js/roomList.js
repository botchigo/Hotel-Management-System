document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const filterBtn = document.getElementById('filterBtn');
    const searchRoom = document.getElementById('searchRoom');
    const filterType = document.getElementById('filterType');
    const filterPrice = document.getElementById('filterPrice');
    const roomTableBody = document.getElementById('roomTableBody');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');

    const originalRooms = Array.from(roomTableBody.querySelectorAll('tr')).map(row => {
        return {
            room_id: row.cells[0].textContent,
            type: row.cells[1].textContent,
            price: parseInt(row.cells[2].textContent.replace(/,/g, '')),
            amenities: row.cells[3].textContent,
            status: row.cells[4].textContent,
            row: row
        };
    });

    let filteredRooms = originalRooms;
    let currentPage = 1;
    const rowsPerPage = 8;

    function renderTable() {
        roomTableBody.innerHTML = '';
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const roomsToDisplay = filteredRooms.slice(start, end);

        roomsToDisplay.forEach(room => {
            roomTableBody.appendChild(room.row);
        });

        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = Math.ceil(filteredRooms.length / rowsPerPage);
    }

    function filterRooms() {
        const searchKeyword = searchRoom.value.toLowerCase();
        const selectedType = filterType.value;
        const maxPrice = filterPrice.value ? parseInt(filterPrice.value) : Infinity;

        filteredRooms = originalRooms.filter(room => {
            const matchesKeyword = Object.values(room).some(value => 
                typeof value === 'string' && value.toLowerCase().includes(searchKeyword)
            );
            const matchesType = !selectedType || room.type === selectedType;
            const matchesPrice = room.price <= maxPrice;

            return matchesKeyword && matchesType && matchesPrice;
        });

        currentPage = 1;
        renderTable();
    }

    searchBtn.addEventListener('click', filterRooms);
    filterBtn.addEventListener('click', filterRooms);

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
        if (currentPage < Math.ceil(filteredRooms.length / rowsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredRooms.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage = totalPages;
            renderTable();
        }
    });

    renderTable();
});