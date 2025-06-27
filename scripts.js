    // Wait until DOM is fully loaded
    document.addEventListener("DOMContentLoaded", () => {
        const navbar = document.querySelector('.navbar');
        const searchInput = document.getElementById('search-input');
        const menuItems = document.querySelectorAll('.menu-item');

        // 1. Hide navbar on initial load
        navbar.classList.add('navbar-hidden');

        // 2. Show navbar only when user scrolls or search is active
        window.addEventListener('scroll', () => {
            const isSearchActive = searchInput === document.activeElement || searchInput.value.trim() !== '';
            if (window.scrollY > 0 || isSearchActive) {
                navbar.classList.remove('navbar-hidden');
            } else {
                navbar.classList.add('navbar-hidden');
            }
        });

        // 3. Ensure it shows if the user types in the search bar (even if no scroll)
        searchInput.addEventListener('input', () => {
            const isSearchActive = searchInput === document.activeElement || searchInput.value.trim() !== '';
            if (isSearchActive) {
                navbar.classList.remove('navbar-hidden');
            }
        });

        // 4. Smooth scrolling for nav links
        document.querySelectorAll('.nav-link').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                // Highlight active link
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // 5. Highlight active link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.menu-section');
            const navbarHeight = navbar.offsetHeight;
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= navbarHeight + 50) {
                    currentSection = section.getAttribute('id');
                }
            });
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });

        // 6. Search filtering
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            menuItems.forEach(item => {
                const name = item.querySelector('.item-name').textContent.toLowerCase();
                const ingredients = item.querySelector('.item-ingredients').textContent.toLowerCase();
                const matches = name.includes(searchTerm) || ingredients.includes(searchTerm);
                item.style.display = matches ? '' : 'none';

                const section = item.closest('.menu-section');
                const sectionItems = section.querySelectorAll('.menu-item');
                const hasVisibleItems = Array.from(sectionItems).some(i => i.style.display !== 'none');
                section.style.display = hasVisibleItems ? '' : 'none';
            });
        });

        function updateNavbarVisibility() {
            const isSearchActive = searchInput === document.activeElement || searchInput.value.trim() !== '';
            if (window.scrollY > 0 || isSearchActive) {
                navbar.classList.remove('navbar-hidden');
            } else {
                navbar.classList.add('navbar-hidden');
            }
        }

        window.addEventListener('scroll', updateNavbarVisibility);
        searchInput.addEventListener('input', updateNavbarVisibility);

        // 🔁 Call it once right away to apply correct state
        updateNavbarVisibility();
    });