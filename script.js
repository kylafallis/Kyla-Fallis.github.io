document.addEventListener('DOMContentLoaded', function() {

    // --- Sidebar Logic ---
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    function toggleSidebar() {
        sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
    }

    menuIcon.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // --- Smooth Scrolling for All Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Close sidebar if clicking a link inside it
            if (sidebar.classList.contains('is-open') && this.closest('#sidebar')) {
                toggleSidebar();
            }

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

