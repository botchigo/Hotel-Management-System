document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const bookingTableBody = document.getElementById('bookingTableBody');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');

    let originalBookings = Array.from(bookingTableBody.querySelectorAll('tr')).map(row => {
        return {
            booking_id: row.cells[0].textContent,
            room_id: row.cells[1].textContent,
            check_in_date: row.cells[2].textContent,
            check_out_date: row.cells[3].textContent,
            status: row.cells[4].textContent,
            total_price: row.cells[5].textContent,
            row: row
        };
    });
    let filteredBookings = [...originalBookings];
    let currentPage = 1;
    const rowsPerPage = 5;

    function renderTable() {
        bookingTableBody.innerHTML = '';
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const bookingsToDisplay = filteredBookings.slice(start, end);

        bookingsToDisplay.forEach(booking => {
            bookingTableBody.appendChild(booking.row);
        });

        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = Math.ceil(filteredBookings.length / rowsPerPage);
    }

    function filterBookings() {
        const searchKeyword = document.getElementById('searchBooking').value.toLowerCase();

        filteredBookings = originalBookings.filter(booking => {
            const matchesKeyword = Object.values(booking).some(value => 
                typeof value === 'string' && value.toLowerCase().includes(searchKeyword)
            );

            return matchesKeyword;
        });

        currentPage = 1;
        renderTable();
    }

    searchBtn.addEventListener('click', filterBookings);

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
        if (currentPage < Math.ceil(filteredBookings.length / rowsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage = totalPages;
            renderTable();
        }
    });

    window.cancelBooking = function(bookingId) {
        if (confirm('Bạn có chắc chắn muốn hủy đặt phòng này không?')) {
            fetch(`/bookings/cancel/${bookingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Hủy đặt phòng thành công!');
                    window.location.reload();
                } else {
                    alert('Hủy đặt phòng thất bại. Vui lòng thử lại.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hủy đặt phòng thất bại. Vui lòng thử lại.');
            });
        }
    };

    renderTable();
});