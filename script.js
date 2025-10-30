const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Mobile menu functionality
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

// Smooth scrolling for anchor links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing dark mode');
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme or preferred scheme
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');

    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Toggle theme function
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });

    // Initialize scroll animations
    initScrollAnimations();
});

// Scroll Animation Functionality
function initScrollAnimations() {
    const sections = document.querySelectorAll('.scroll-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Track which sections have been animated
    const animatedSections = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedSections.has(entry.target)) {
                // Add visible class with a slight delay for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    animatedSections.add(entry.target);
                }, 100);
                
                // Unobserve after animation to prevent re-animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

/* Sheep game script */
(function(){
    const area = document.getElementById('sheepArea');
    const countEl = document.getElementById('sheepCount');
    const spawnBtn = document.getElementById('spawnBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (!area) return;

    let clicked = 0;
    let idCounter = 0;

    function updateCounter() {
        countEl.textContent = String(clicked);
    }

    function randomPos(size=64) {
        const rect = area.getBoundingClientRect();
        const padding = 8;
        const maxX = Math.max(0, rect.width - size - padding);
        const maxY = Math.max(0, rect.height - size - padding);
        const x = Math.floor(Math.random() * maxX) + padding;
        const y = Math.floor(Math.random() * maxY) + padding;
        return { x, y };
    }

    function createSheep(animate=true) {
        const s = document.createElement('div');
        s.className = 'sheep';
        s.dataset.sheepId = String(++idCounter);
        s.innerText = '🐑';
        const pos = randomPos();
        s.style.left = pos.x + 'px';
        s.style.top = pos.y + 'px';
        if (animate) s.classList.add('spawn-pop');
        area.appendChild(s);
        // remove the spawn-pop class after animation so hover works normally
        setTimeout(()=> s.classList.remove('spawn-pop'), 300);
        return s;
    }

    function spawnMany(n=1) {
        for (let i=0;i<n;i++) createSheep();
    }

    function handleSheepClick(sheepEl) {
        // create smoke at same position
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        smoke.innerText = '💨';
        smoke.style.left = sheepEl.style.left;
        smoke.style.top = sheepEl.style.top;
        area.appendChild(smoke);

        // remove sheep
        sheepEl.remove();

        // increment counter
        clicked++;
        updateCounter();

        // remove smoke after animation and spawn a replacement
        setTimeout(()=> {
            smoke.remove();
            // spawn one new sheep to keep game active
            createSheep();
        }, 700);
    }

    // event delegation for clicks inside area
    area.addEventListener('click', (ev)=>{
        const target = ev.target;
        if (target.classList.contains('sheep')) {
            handleSheepClick(target);
        }
    });

    // controls
    spawnBtn && spawnBtn.addEventListener('click', ()=> spawnMany(3));
    resetBtn && resetBtn.addEventListener('click', ()=>{
        // clear area
        area.querySelectorAll('.sheep, .smoke').forEach(n=>n.remove());
        clicked = 0;
        updateCounter();
        // spawn a starter set
        spawnMany(5);
    });

    // initial spawn
    spawnMany(15);
    updateCounter();

})();
