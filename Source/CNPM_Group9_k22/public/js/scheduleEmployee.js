let editingIndex = null;
const employee = JSON.parse(document.getElementById('employeeInfoTableBody').dataset.employee);
const scheduleModal = new bootstrap.Modal(document.getElementById('scheduleModal'));
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

// Pagination variables
let currentPage = 1;
const rowsPerPage = 4;

// Database update function
async function updateScheduleInDatabase() {
    try {
        const response = await fetch(`/employees/schedule/update/${employee.employee_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ schedule: employee.schedule }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to update schedule');
        }
    } catch (error) {
        console.error('Error updating schedule:', error);
        alert('Failed to update schedule. Please try again.');
    }
}

function renderScheduleTable() {
    const tbody = document.getElementById('shiftTableBody');
    tbody.innerHTML = '';
    
    if (employee.schedule && employee.schedule.length > 0) {
        // Calculate pagination
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const schedulesToDisplay = employee.schedule.slice(start, end);

        schedulesToDisplay.forEach((schedule, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${schedule.date}</td>
                <td>${schedule.shift}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openEditModal(${start + index})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${start + index})">Xóa</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Update pagination display
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = Math.ceil(employee.schedule.length / rowsPerPage);
    }
}

function openAddModal() {
    editingIndex = null;
    document.getElementById('scheduleForm').reset();
    document.getElementById('scheduleModalLabel').textContent = 'Thêm lịch trực';
    scheduleModal.show();
}

function openEditModal(index) {
    editingIndex = index;
    const schedule = employee.schedule[index];
    document.getElementById('shiftDate').value = schedule.date;
    document.getElementById('shift').value = schedule.shift;
    document.getElementById('scheduleModalLabel').textContent = 'Sửa lịch trực';
    scheduleModal.show();
}

async function saveSchedule() {
    const date = document.getElementById('shiftDate').value;
    const shift = document.getElementById('shift').value;

    if (!date || !shift) {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
    }

    try {
        if (editingIndex !== null) {
            // Update existing schedule
            employee.schedule[editingIndex] = { date, shift };
        } else {
            // Add new schedule
            if (!employee.schedule) {
                employee.schedule = [];
            }
            employee.schedule.push({ date, shift });
        }

        await updateScheduleInDatabase();
        renderScheduleTable();
        scheduleModal.hide();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to update schedule. Please try again.');
    }
}

function openDeleteModal(index) {
    editingIndex = index;
    deleteModal.show();
}

async function deleteSchedule() {
    if (editingIndex !== null) {
        try {
            employee.schedule.splice(editingIndex, 1);
            await updateScheduleInDatabase();
            renderScheduleTable();
            deleteModal.hide();
            // Add this line to remove modal backdrop
            document.querySelector('.modal-backdrop').remove();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete schedule');
        }
    }
}

// Pagination event listeners
document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage = 1;
        renderScheduleTable();
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderScheduleTable();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const totalPages = Math.ceil((employee.schedule?.length || 0) / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderScheduleTable();
    }
});

document.getElementById('nextPageBtn').addEventListener('click', () => {
    const totalPages = Math.ceil((employee.schedule?.length || 0) / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage = totalPages;
        renderScheduleTable();
    }
});

// Initial render
renderScheduleTable();