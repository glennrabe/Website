document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('active');
});
const header = document.querySelector('.main-header');
const navContainer = document.querySelector('.main-nav-container');
const scrollThreshold = 100; 
window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
        navContainer.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        navContainer.classList.remove('scrolled');
    }
});
const sectionToPin = document.querySelector('.pin-section');
const pinThreshold = 300;

window.addEventListener('scroll', () => {
    if (window.scrollY > pinThreshold) {
        sectionToPin.classList.add('pinned');
    } else {
        sectionToPin.classList.remove('pinned');
    }
});
