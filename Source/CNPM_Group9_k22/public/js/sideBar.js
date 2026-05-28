document.addEventListener('DOMContentLoaded', () => {
    const menus = document.querySelectorAll('.sidebar-collapse');
    menus.forEach(menu => {
        menu.classList.add('show');
        const link = document.querySelector(`[data-bs-target="#${menu.id}"]`);
        if (link) {
            link.setAttribute('aria-expanded', 'true');
        }
    });
});