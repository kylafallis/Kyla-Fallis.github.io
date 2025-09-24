document.addEventListener('DOMContentLoaded', function() {

    const enterButton = document.getElementById('enter-button');
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('page-content');
    const scrollArrow = document.querySelector('.scroll-arrow');

    // 1. Loader Logic
    enterButton.addEventListener('click', () => {
        loader.style.opacity = '0';
        // Wait for fade out animation to finish before hiding
        setTimeout(() => {
            loader.style.display = 'none';
            pageContent.classList.remove('hidden');
        }, 500);
    });

    // 2. Sidebar Logic
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function toggleSidebar() {
        sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
    }

    menuIcon.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // 3. Smooth Scrolling Logic
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (sidebar.classList.contains('is-open')) {
                toggleSidebar();
            }

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Scroll Arrow Animation
    window.addEventListener('scroll', () => {
        const welcomeScreen = document.getElementById('welcome-grid');
        if (!welcomeScreen) return;
        
        // Use the height of the welcome screen container itself
        const scrollableHeight = welcomeScreen.offsetHeight;
        
        if (window.scrollY < scrollableHeight) {
            // Calculate percentage scrolled within the welcome screen
            const scrollPercent = Math.min(window.scrollY / (scrollableHeight - window.innerHeight), 1);
            const newHeight = 30 + (30 * scrollPercent); // Starts at 30px, grows to 60px
            if (scrollArrow) {
                scrollArrow.style.height = `${newHeight}px`;
            }
        }
    });
});

