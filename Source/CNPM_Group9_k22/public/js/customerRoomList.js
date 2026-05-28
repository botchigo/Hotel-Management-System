document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const filterAvailableBtn = document.getElementById('filterAvailableBtn');
    const searchRoom = document.getElementById('searchRoom');
    const roomTableBody = document.getElementById('roomTableBody');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');

    let originalRooms = Array.from(roomTableBody.querySelectorAll('tr')).map(row => {
        return {
            room_id: row.cells[0].textContent,
            type: row.cells[1].textContent,
            price: parseInt(row.cells[2].textContent.replace(/,/g, '')),
            amenities: row.cells[3].textContent,
            status: row.cells[4].textContent,
            row: row
        };
    });
    let filteredRooms = [...originalRooms];
    let currentPage = 1;
    const rowsPerPage = 5;

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

        filteredRooms = originalRooms.filter(room => {
            const matchesKeyword = Object.values(room).some(value => 
                typeof value === 'string' && value.toLowerCase().includes(searchKeyword)
            );

            return matchesKeyword;
        });

        currentPage = 1;
        renderTable();
    }

    function filterAvailableRooms() {
        filteredRooms = originalRooms.filter(room => room.status === 'Đang có sẵn');
        currentPage = 1;
        renderTable();
    }

    searchBtn.addEventListener('click', filterRooms);
    filterAvailableBtn.addEventListener('click', filterAvailableRooms);

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

    window.bookRoom = function(roomId) {
        const room = originalRooms.find(r => r.room_id === roomId);
        const bookingData = {
            room_id: room.room_id,
            room_type: room.type,
            price: room.price
        };

        const queryString = new URLSearchParams(bookingData).toString();
        window.location.href = `/bookings/payment?${queryString}`;
    };

    renderTable();
});