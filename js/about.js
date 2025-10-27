document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('active'); // Activates body fade-in animation on page load

    const header = document.querySelector('.main-header');
    const navContainer = document.querySelector('.main-nav-container');
    const hero = document.querySelector('.hero');
    const body = document.body;
    const navLinks = document.querySelectorAll('nav.main-nav a');
    const contentWrapper = document.querySelector('.content-wrapper');

    const scrollThreshold = 50; // Scroll distance to trigger header changes

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled'); // Adds scrolled style to header
            navContainer.classList.add('scrolled'); // Adds scrolled style to nav
            body.style.paddingTop = `${header.offsetHeight}px`; // Adjusts body padding for fixed header
            hero.classList.add('scrolled'); // Adds scrolled style to hero section
        } else {
            header.classList.remove('scrolled');
            navContainer.classList.remove('scrolled');
            body.style.paddingTop = 0; // Resets body padding
            hero.classList.remove('scrolled');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevents immediate navigation
            navLinks.forEach(navLink => navLink.classList.remove('active')); // Removes active class from other links
            this.classList.add('active'); // Highlights clicked nav link

            if (contentWrapper) {
                contentWrapper.classList.add('fade-out'); // Triggers fade-out animation
                setTimeout(() => {
                    window.location.href = this.getAttribute('href'); // Navigates after animation
                }, 300);
            } else {
                window.location.href = this.getAttribute('href'); // Direct navigation if no content wrapper
            }
        });
    });

    const homeLink = document.querySelector('nav.main-nav a[href="homepage.html"]');
    if (homeLink) {
        homeLink.classList.add('active'); // Highlights homepage link by default
    }
});

// Duplicate event listener (consider removing to avoid redundancy)
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('active'); // Activates body fade-in animation (redundant)
});