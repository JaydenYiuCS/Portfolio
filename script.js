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

// Dark Mode Toggle - Enhanced with debugging
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing dark mode');
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    console.log('Dark mode toggle element:', darkModeToggle);
    console.log('Prefers dark scheme:', prefersDarkScheme.matches);

    // Check for saved theme or preferred scheme
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme:', savedTheme);
    
    const currentTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
    console.log('Current theme to apply:', currentTheme);

    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    console.log('Applied data-theme:', currentTheme);

    // Toggle theme function
    if (darkModeToggle) {
        console.log('Adding click event to dark mode toggle');
        darkModeToggle.addEventListener('click', function() {
            console.log('Dark mode toggle clicked');
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log('Changing theme from', currentTheme, 'to', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            console.log('Theme changed and saved');
        });
    } else {
        console.error('Dark mode toggle button not found!');
        console.log('Available elements with ID darkModeToggle:', document.getElementById('darkModeToggle'));
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
});