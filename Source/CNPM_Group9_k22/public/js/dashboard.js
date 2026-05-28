document.addEventListener('DOMContentLoaded', async function() {
    try {
        const [roomStats, revenueStats] = await Promise.all([
            fetch('/dashboard/api/room-stats').then(res => res.json()),
            fetch('/dashboard/api/revenue-stats').then(res => res.json())
        ]);

        // Room Chart
        new Chart(document.getElementById('roomChart'), {
            type: 'bar',
            data: {
                labels: roomStats.labels,
                datasets: [{
                    label: 'Số Lượng Đặt',
                    data: roomStats.data,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                    ]
                }]
            }
        });

        // Revenue Chart
        new Chart(document.getElementById('revenueChart'), {
            type: 'line',
            data: {
                labels: revenueStats.months,
                datasets: [{
                    label: 'Doanh Thu (VND)',
                    data: revenueStats.revenue,
                    borderColor: 'rgba(54, 162, 235, 1)'
                }]
            }
        });

    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
});