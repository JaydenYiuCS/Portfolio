const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
const contactForm = document.querySelector('.contact-form');
const popup = document.getElementById('thankYouPopup');

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show popup
    popup.style.display = 'block';
    
    // Prevent scrolling when popup is open
    document.body.style.overflow = 'hidden';
    
    // Clear form
    this.reset();
});

// Close popup functions
function closePopup() {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close buttons
document.querySelector('.close-popup').addEventListener('click', closePopup);
document.querySelector('.popup-close-btn').addEventListener('click', closePopup);

// Close when clicking outside content
popup.addEventListener('click', function(e) {
    if (e.target === popup) {
        closePopup();
    }
});

// Close with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.style.display === 'block') {
        closePopup();
    }
});
// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or prefered scheme
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply the current theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme function
darkModeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    }
});