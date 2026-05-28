document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const rowsPerPage = 5;
    let originalUsers = Array.from(document.querySelectorAll('#userTableBody tr')).map(row => ({
        customer_id: row.cells[0].textContent,
        name: row.cells[1].textContent,
        email: row.cells[2].textContent,
        phone: row.cells[3].textContent,
        row: row
    }));
    let filteredUsers = [...originalUsers];

    function renderTable() {
        const userTableBody = document.getElementById('userTableBody');
        userTableBody.innerHTML = '';
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const usersToDisplay = filteredUsers.slice(start, end);

        usersToDisplay.forEach(user => {
            userTableBody.appendChild(user.row);
        });

        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = Math.ceil(filteredUsers.length / rowsPerPage);
    }

    function filterUsers() {
        const searchKeyword = document.getElementById('searchUser').value.toLowerCase();

        filteredUsers = originalUsers.filter(user => {
            return Object.values(user).some(value => 
                typeof value === 'string' && value.toLowerCase().includes(searchKeyword)
            );
        });

        currentPage = 1;
        renderTable();
    }

    document.getElementById('searchBtn').addEventListener('click', filterUsers);

    document.getElementById('prevPageBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage = 1;
            renderTable();
        }
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredUsers.length / rowsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    document.getElementById('nextPageBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage = totalPages;
            renderTable();
        }
    });

    function viewTransactionHistory(userId) {
        // Placeholder function for viewing transaction history
        alert(`Viewing transaction history for user ID: ${userId}`);
    }

    renderTable();
});