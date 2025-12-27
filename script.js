// Typing Effect
const typingTexts = [
    'Web Developer',
    'Data Science Enthusiast',
    'Problem Solver',
    'Creative Thinker'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Counter Animation for Stats
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const countUp = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => countUp(counter), 10);
    } else {
        counter.innerText = target;
    }
};

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => {
                counter.innerText = '0';
                countUp(counter);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Smooth Scroll for all links
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

// Parallax Effect for Hero Section (disabled on mobile/tablet to avoid overlap)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;

    if (window.innerWidth > 1024) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    } else {
        heroImage.style.transform = 'translateY(0)';
    }
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Initialize animations on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent right-click on images (optional)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
// Image Loading with Error Handling
function handleImageLoad() {
    const lazyImages = document.querySelectorAll('.lazy-img');
    
    lazyImages.forEach(img => {
        const container = img.closest('.image-container, .project-image, .about-image');
        const loader = container?.querySelector('.img-loader');
        const errorDiv = container?.querySelector('.img-error');
        const imgSrc = img.getAttribute('data-src') || img.getAttribute('src');
        
        // Show loader initially
        if (loader) loader.style.display = 'block';
        if (errorDiv) errorDiv.style.display = 'none';
        
        // Create new image to test loading
        const testImg = new Image();
        
        testImg.onload = function() {
            // Image loaded successfully
            img.src = imgSrc;
            img.classList.add('loaded');
            if (loader) loader.style.display = 'none';
        };
        
        testImg.onerror = function() {
            // Image failed to load - show error
            if (loader) loader.style.display = 'none';
            if (errorDiv) {
                errorDiv.style.display = 'block';
            }
            img.style.opacity = '0';
        };
        
        // Start loading
        testImg.src = imgSrc;
        
        // Timeout fallback (10 seconds)
        setTimeout(() => {
            if (!img.classList.contains('loaded')) {
                if (loader) loader.style.display = 'none';
                if (errorDiv) {
                    errorDiv.style.display = 'block';
                }
                img.style.opacity = '0';
            }
        }, 10000);
    });
}

// Run image loader when DOM is ready
document.addEventListener('DOMContentLoaded', handleImageLoad);