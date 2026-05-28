document.getElementById('bookingPaymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const bookingData = {
        room_id: document.getElementById('roomId').textContent,
        customer_id: document.getElementById('customerId').value,
        check_in_date: document.getElementById('checkInDate').value,
        check_out_date: document.getElementById('checkOutDate').value,
        payment_method: document.getElementById('paymentMethod').value,
        status: 'Confirmed',
        total_price: document.getElementById('price').textContent
    };

    console.log("Booking data to be sent:", bookingData);

    fetch('/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => {
        console.log("Response received:", response);
        return response.json();
    })
    .then(data => {
        console.log("Data received:", data);
        if (data.success) {
            alert('Thanh toán thành công!');
            window.location.href = '/booking-history';
        } else {
            alert('Thanh toán thất bại. Vui lòng thử lại.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Thanh toán thất bại. Vui lòng thử lại.');
    });
});