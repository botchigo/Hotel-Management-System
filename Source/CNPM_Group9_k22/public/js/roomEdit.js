document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.getElementById('delete-room-btn');
    deleteButton.addEventListener('click', () => {
        if (confirm("Bạn có chắc muốn xóa phòng này?")) {
            deleteButton.closest('form').submit();
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const successMessage = urlParams.get('success');
    if (successMessage) {
        showToast(successMessage);
    }
});

function showToast(message) {
    const toastElement = document.getElementById('successToast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}