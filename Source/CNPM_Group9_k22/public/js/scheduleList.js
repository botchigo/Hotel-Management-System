document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const rowsPerPage = 8;
    let allSchedules = [];
    let filteredSchedules = [];
    
    // Get all schedule data from the page
    const scheduleTableBody = document.getElementById('scheduleTableBody');
    const rows = Array.from(scheduleTableBody.querySelectorAll('tr'));
    
    // Convert table rows to schedule objects
    allSchedules = rows.map(row => ({
        employeeName: row.cells[0].textContent,
        employeeId: row.cells[1].textContent,
        role: row.cells[2].textContent,
        date: row.cells[3].textContent,
        shift: row.cells[4].textContent
    }));
    
    filteredSchedules = [...allSchedules];

    function renderTable() {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const schedulesToDisplay = filteredSchedules.slice(start, end);
        
        scheduleTableBody.innerHTML = '';
        schedulesToDisplay.forEach(schedule => {
            const row = `
                <tr>
                    <td>${schedule.employeeName}</td>
                    <td>${schedule.employeeId}</td>
                    <td>${schedule.role}</td>
                    <td>${schedule.date}</td>
                    <td>${schedule.shift}</td>
                    <td>
                        <a href="/employees/schedule/${schedule.employeeId}" class="btn btn-info btn-sm">
                            <i class="bi bi-eye"></i> Chi tiết
                        </a>
                    </td>
                </tr>
            `;
            scheduleTableBody.insertAdjacentHTML('beforeend', row);
        });

        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = 
            Math.ceil(filteredSchedules.length / rowsPerPage);
    }

    function filterSchedules() {
        const searchText = document.getElementById('searchEmployee').value.toLowerCase();
        const dateFilter = document.getElementById('dateFilter').value;
        const shiftFilter = document.getElementById('shiftFilter').value;

        filteredSchedules = allSchedules.filter(schedule => {
            const matchesSearch = schedule.employeeName.toLowerCase().includes(searchText);
            const matchesDate = !dateFilter || schedule.date === dateFilter;
            const matchesShift = !shiftFilter || schedule.shift === shiftFilter;
            return matchesSearch && matchesDate && matchesShift;
        });

        currentPage = 1;
        renderTable();
    }

    // Update saveNewSchedule function to use new endpoint
    document.getElementById('saveNewSchedule').addEventListener('click', async function() {
        const employeeId = document.getElementById('employeeSelect').value;
        const date = document.getElementById('newShiftDate').value;
        const shift = document.getElementById('newShift').value;
    
        if (!employeeId || !date || !shift) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
    
        try {
            const response = await fetch(`/employees/schedule/append/${employeeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    schedule: [{
                        date: date,
                        shift: shift
                    }]
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add schedule');
            }
    
            // Add new schedule to the list
            const selectedOption = document.getElementById('employeeSelect').options[document.getElementById('employeeSelect').selectedIndex];
            const employeeName = selectedOption.text.split(' (')[0];
            const role = selectedOption.text.split('(')[1].replace(')', '');
    
            allSchedules.push({
                employeeName: employeeName,
                employeeId: employeeId,
                role: role,
                date: date,
                shift: shift
            });
    
            filteredSchedules = [...allSchedules];
            renderTable();
    
            // Close modal properly
            const modal = bootstrap.Modal.getInstance(document.getElementById('addScheduleModal'));
            modal.hide();
            // Add these lines to clean up modal artifacts
            document.querySelector('.modal-backdrop').remove();
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
    
            // Reset form
            document.getElementById('addScheduleForm').reset();
    
        } catch (error) {
            console.error('Error adding schedule:', error);
            alert('Failed to add schedule. Please try again.');
        }
    });

    // Event Listeners
    document.getElementById('searchBtn').addEventListener('click', filterSchedules);
    document.getElementById('filterBtn').addEventListener('click', filterSchedules);

    // Pagination
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
        const totalPages = Math.ceil(filteredSchedules.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    document.getElementById('nextPageBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredSchedules.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage = totalPages;
            renderTable();
        }
    });

    // Initial render
    renderTable();
});