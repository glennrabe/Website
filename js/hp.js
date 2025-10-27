document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('active'); // Triggers body fade-in animation

    const header = document.querySelector('.main-header');
    const navContainer = document.querySelector('.main-nav-container');
    const hero = document.querySelector('.hero');
    const body = document.body;
    const navLinks = document.querySelectorAll('nav.main-nav a');
    const contentWrapper = document.querySelector('.content-wrapper');

    const scrollThreshold = 50; // Scroll distance for header changes

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled'); // Adds scrolled style to header
            navContainer.classList.add('scrolled'); // Adds scrolled style to nav
            body.style.paddingTop = `${header.offsetHeight}px`; // Adjusts body padding for fixed header
            hero.classList.add('scrolled'); // Adds scrolled style to hero
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
            this.classList.add('active'); // Highlights clicked link
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

// Mobile Menu Toggle with Closing State (Animated Icon)
function openNav() {
    const sidenav = document.getElementById("mySidenav");
    const hamburger = document.getElementById("hamburger");
    const cart = document.getElementById("cart");
    sidenav.style.width = "250px"; // Opens sidenav
    hamburger.classList.add("change"); // Animates hamburger icon
    hamburger.style.display = "none"; // Hides header hamburger
    sidenav.insertBefore(hamburger, sidenav.firstChild); // Moves hamburger to sidenav
    hamburger.style.display = "inline-block"; // Shows hamburger in sidenav
    hamburger.onclick = closeNav; // Sets hamburger to close sidenav
    cart.style.display = "block"; // Shows cart in sidenav
}

function closeNav() {
    const sidenav = document.getElementById("mySidenav");
    const hamburger = document.getElementById("hamburger");
    const cart = document.getElementById("cart");
    const header = document.querySelector(".main-header");
    sidenav.style.width = "0"; // Closes sidenav
    hamburger.classList.remove("change"); // Resets hamburger icon
    hamburger.style.display = "none"; // Hides sidenav hamburger
    header.insertBefore(hamburger, document.querySelector(".main-nav-container")); // Moves hamburger back to header
    hamburger.style.display = "inline-block"; // Shows hamburger in header
    hamburger.onclick = openNav; // Restores open function
    cart.style.display = "none"; // Hides cart in sidenav
}

function myFunction(x) {
    x.classList.toggle("change"); // Toggles hamburger icon animation
}

function toggleDropdown(element) {
    const dropdownContent = element.nextElementSibling;
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block'; // Toggles dropdown visibility
    element.parentElement.classList.toggle('active'); // Toggles active class
}

let isSidenavOpen = false; // Tracks sidenav state

function toggleNav(element) {
    const sidenav = document.getElementById("mySidenav");
    const hamburger = document.getElementById("hamburger");
    const hamburgerSidenav = document.getElementById("hamburger-sidenav");
    const cart = document.getElementById("cart");

    if (isSidenavOpen) {
        sidenav.style.width = "0"; // Closes sidenav
        hamburger.classList.remove("change");
        hamburgerSidenav.classList.remove("change");
        hamburger.style.display = "inline-block"; // Shows header hamburger
        hamburgerSidenav.style.display = "none"; // Hides sidenav hamburger
        cart.style.display = "none"; // Hides cart
    } else {
        sidenav.style.width = "250px"; // Opens sidenav
        hamburger.classList.add("change");
        hamburgerSidenav.classList.add("change");
        hamburger.style.display = "none"; // Hides header hamburger
        hamburgerSidenav.style.display = "inline-block"; // Shows sidenav hamburger
        cart.style.display = "block"; // Shows cart
    }
    isSidenavOpen = !isSidenavOpen; // Toggles sidenav state
}

function toggleDropdown(element) {
    const dropdownContent = element.nextElementSibling;
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block'; // Toggles dropdown visibility
    element.parentElement.classList.toggle('active'); // Toggles active class
}