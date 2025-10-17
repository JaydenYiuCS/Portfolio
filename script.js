document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DEBUGGING DARK MODE ===');
    
    // Test if we can find the dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    console.log('darkModeToggle element:', darkModeToggle);
    
    // List all elements with IDs to see what's available
    console.log('All elements with IDs:');
    document.querySelectorAll('[id]').forEach(el => {
        console.log(' -', el.id, ':', el.tagName, el.className);
    });
    
    // List all buttons to see what's available
    console.log('All buttons on page:');
    document.querySelectorAll('button').forEach(btn => {
        console.log(' -', btn.id || 'no id', ':', btn.className, btn.innerHTML);
    });

    // Only proceed if we found the toggle
    if (!darkModeToggle) {
        console.error('❌ DARK MODE TOGGLE NOT FOUND!');
        console.error('Please check your HTML for element with id="darkModeToggle"');
        return;
    }

    console.log('✅ Dark mode toggle found! Initializing...');

    // Rest of your dark mode code...
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme or preferred scheme
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');

    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    console.log('Applied theme:', currentTheme);

    // Toggle theme function
    darkModeToggle.addEventListener('click', function() {
        console.log('🎯 Dark mode button clicked!');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Changing theme from', currentTheme, 'to', newTheme);
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

    // Your other existing code (hamburger menu, smooth scroll, etc.)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
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
    }

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
});