document.addEventListener('DOMContentLoaded', function() {

    const enterButton = document.getElementById('enter-button');
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('page-content');
    const scrollArrow = document.querySelector('.scroll-arrow');

    // 1. Loader Logic
    if (enterButton && loader && pageContent) {
        enterButton.addEventListener('click', () => {
            loader.style.opacity = '0';
            // Wait for fade out animation to finish before hiding
            setTimeout(() => {
                loader.style.display = 'none';
                pageContent.classList.remove('hidden');
            }, 500);
        });
    }

    // 2. Sidebar Logic
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function toggleSidebar() {
        if (sidebar && overlay) {
            sidebar.classList.toggle('is-open');
            overlay.classList.toggle('is-visible');
        }
    }

    if (menuIcon) {
        menuIcon.addEventListener('click', toggleSidebar);
    }
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }

    // 3. Smooth Scrolling Logic
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (sidebar && sidebar.classList.contains('is-open')) {
                toggleSidebar();
            }

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Scroll Arrow Animation
    if (scrollArrow) {
        window.addEventListener('scroll', () => {
            const welcomeScreen = document.getElementById('welcome-grid');
            if (!welcomeScreen) return;

            // Calculate the effective scrollable height of the welcome screen
            const scrollableHeight = welcomeScreen.offsetHeight - window.innerHeight;
            
            if (window.scrollY > 0 && window.scrollY < scrollableHeight) {
                // Calculate how far into the welcome screen the user has scrolled
                const scrollPercent = window.scrollY / scrollableHeight;
                // Grow the arrow from 30px to 60px based on scroll progress
                const newHeight = 30 + (30 * scrollPercent); 
                scrollArrow.style.height = `${newHeight}px`;
            } else if (window.scrollY >= scrollableHeight) {
                 // Max out the height if scrolled past the welcome screen
                 scrollArrow.style.height = `60px`;
            } else {
                // Reset to initial height if at the very top
                scrollArrow.style.height = `30px`;
            }
        });
    }
});

