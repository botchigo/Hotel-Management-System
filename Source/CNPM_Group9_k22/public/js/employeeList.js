document.addEventListener('DOMContentLoaded', () => {
    const addEmployeeForm = document.getElementById('addEmployeeForm');
    const editEmployeeForm = document.getElementById('editEmployeeForm');
    const saveAddEmployeeButton = document.getElementById('saveAddEmployeeButton');
    const saveEditEmployeeButton = document.getElementById('saveEditEmployeeButton');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const searchBtn = document.getElementById('searchBtn');
    const filterBtn = document.getElementById('filterButton');
    const searchEmployee = document.getElementById('searchEmployee');
    const roleFilter = document.getElementById('roleFilter');
    const employeeTableBody = document.getElementById('employeeTableBody');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    let editingEmployeeId = null;

    let originalEmployees = Array.from(employeeTableBody.querySelectorAll('tr')).map(row => {
        return {
            employee_id: row.cells[0].textContent,
            name: row.cells[1].textContent,
            role: row.cells[2].textContent,
            salary_coefficient: row.cells[3].textContent,
            performance_rating: row.cells[4].textContent,
            row: row
        };
    });

    let filteredEmployees = originalEmployees;
    let currentPage = 1;
    const rowsPerPage = 8;

    function renderTable() {
        employeeTableBody.innerHTML = '';
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const employeesToDisplay = filteredEmployees.slice(start, end);

        employeesToDisplay.forEach(employee => {
            employeeTableBody.appendChild(employee.row);
        });

        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = Math.ceil(filteredEmployees.length / rowsPerPage);
    }

    function filterEmployees() {
        const searchKeyword = searchEmployee.value.toLowerCase();
        const selectedRole = roleFilter.value;

        filteredEmployees = originalEmployees.filter(employee => {
            const matchesKeyword = Object.values(employee).some(value => 
                typeof value === 'string' && value.toLowerCase().includes(searchKeyword)
            );
            const matchesRole = !selectedRole || employee.role === selectedRole;

            return matchesKeyword && matchesRole;
        });

        currentPage = 1;
        renderTable();
    }

    saveAddEmployeeButton.addEventListener('click', () => {
        const employeeData = {
            employee_id: `E${Date.now()}`, // Generate a unique employee_id
            name: document.getElementById('addEmployeeName').value,
            role: document.getElementById('addEmployeeRole').value,
            salary_coefficient: document.getElementById('addSalaryCoefficient').value,
            performance_rating: document.getElementById('addPerformanceRating').value,
        };
        addEmployee(employeeData);
    });

    saveEditEmployeeButton.addEventListener('click', () => {
        const employeeData = {
            employee_id: document.getElementById('editEmployeeId').value,
            name: document.getElementById('editEmployeeName').value,
            role: document.getElementById('editEmployeeRole').value,
            salary_coefficient: document.getElementById('editSalaryCoefficient').value,
            performance_rating: document.getElementById('editPerformanceRating').value,
        };
        updateEmployee(editingEmployeeId, employeeData);
    });

    confirmDeleteBtn.addEventListener('click', () => {
        deleteEmployee(editingEmployeeId);
    });

    searchBtn.addEventListener('click', filterEmployees);
    filterBtn.addEventListener('click', filterEmployees);

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
        if (currentPage < Math.ceil(filteredEmployees.length / rowsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage = totalPages;
            renderTable();
        }
    });

    window.editEmployee = function (employeeId) {
        editingEmployeeId = employeeId;
        document.getElementById('editEmployeeModalLabel').textContent = 'Chỉnh sửa nhân viên';

        fetch(`/employees/edit/${employeeId}`)
            .then(response => response.json())
            .then(employee => {
                document.getElementById('editEmployeeId').value = employee.employee_id;
                document.getElementById('editEmployeeName').value = employee.name;
                document.getElementById('editEmployeeRole').value = employee.role;
                document.getElementById('editSalaryCoefficient').value = employee.salary_coefficient;
                document.getElementById('editPerformanceRating').value = employee.performance_rating;
            });
    };

    window.confirmDelete = function (employeeId) {
        editingEmployeeId = employeeId;
    };

    window.scheduleEmployee = function (employeeId) {
        console.log(`Navigating to schedule page for employee ID: ${employeeId}`);
        window.location.href = `/schedule/${employeeId}`;
    };

    function addEmployee(employeeData) {
        fetch('/employees/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        })
            .then(response => response.json())
            .then(() => {
                location.reload();
            });
    }

    function updateEmployee(employeeId, employeeData) {
        fetch(`/employees/edit/${employeeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        })
            .then(response => response.json())
            .then(() => {
                location.reload();
            });
    }

    function deleteEmployee(employeeId) {
        fetch(`/employees/delete/${employeeId}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(() => {
                location.reload();
            });
    }

    renderTable();
});