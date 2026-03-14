/**
 * Developer Portfolio - JavaScript
 * Handles all interactive functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functions
    initTypedJS();
    initAOS();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initFormSubmission();
    initScrollAnimations();
});

/**
 * Typed.js - Typing Animation in Hero Section
 */
function initTypedJS() {
    const typedElement = document.getElementById('typed-output');

    if (typedElement) {
        const typed = new Typed('#typed-output', {
            strings: [
                'Full Stack Developer',
                'Python & Django Developer',
                'Automation Tester',
                'Beginner DevOps Engineer'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            loopCount: Infinity,
            showCursor: true,
            cursorChar: '|',
            autoInsertCSS: true
        });
    }
}

/**
 * AOS - Animate On Scroll Library Initialization
 */
function initAOS() {
    // Check if AOS is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
            disable: false,
            mirror: false
        });
    }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            // Toggle button animation
            mobileMenuBtn.classList.toggle('active');

            // Toggle menu visibility
            mobileMenu.classList.toggle('hidden');

            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
        });

        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Initial check
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
    }
}

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Submission Handler
 */
function initFormSubmission() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission (replace with actual endpoint)
            simulateFormSubmission(name, email, message);
        });
    }
}

/**
 * Simulate Form Submission
 */
function simulateFormSubmission(name, email, message) {
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<span class="mr-2">⏳</span> Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

        // Reset form
        document.querySelector('.contact-form').reset();
    }, 1500);
}

/**
 * Show Notification
 */
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="fixed top-24 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full">
            <div class="flex items-center">
                <span class="mr-3">
                    ${type === 'success' ? '✓' : '✕'}
                </span>
                <span class="font-mono text-sm">${message}</span>
            </div>
        </div>
    `;

    // Add custom styles
    notification.firstElementChild.style.background = type === 'success' ? '#111' : '#1a1a1a';
    notification.firstElementChild.style.border = type === 'success' ? '1px solid #00ff88' : '1px solid #ff5f56';
    notification.firstElementChild.style.color = type === 'success' ? '#00ff88' : '#ff5f56';

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.firstElementChild.classList.remove('translate-x-full');
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.firstElementChild.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/**
 * Additional Scroll Animations
 */
function initScrollAnimations() {
    // Parallax effect for hero background
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.getElementById('hero');

        if (hero) {
            const rate = scrolled * 0.3;
            hero.style.backgroundPositionY = rate + 'px';
        }
    });

    // Reveal elements on scroll using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function (e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
});

/**
 * Preload fonts for better performance
 */
if ('fonts' in document) {
    document.fonts.ready.then(function () {
        console.log('Fonts loaded successfully');
    });
}

// ==========================================
// CUSTOMIZATION GUIDE - EDIT THIS SECTION
// ==========================================

/*
CUSTOMIZATION INSTRUCTIONS:
============================

1. PERSONAL INFORMATION
   - Open index.html
   - Search for "John Doe" and replace with your name
   - Update email: hello@developer.com → your email
   - Update GitHub: github.com/johndoe → your username
   - Update LinkedIn: linkedin.com/in/johndoe → your profile

2. SKILLS
   - In index.html, find the Skills section
   - Replace skill tags with your own skills
   - Each skill is a <span class="skill-tag"> element

3. PROJECTS
   - In index.html, find the Projects section
   - Each project is an <article> element with class "project-card"
   - Update:
     * Project title (h3)
     * Description (p)
     * Tech stack (tech-tag spans)
     * GitHub link (href)
     * Live demo link (href)

4. ACHIEVEMENTS
   - In index.html, find the Achievements section
   - Each achievement is a <div> with class "achievement-card"
   - Update titles, descriptions, and dates

5. COLORS
   - Open styles.css
   - Find :root section at the top
   - Modify color variables to match your preference

6. ANIMATIONS
   - Typed.js strings in initTypedJS() function
   - AOS settings in initAOS() function
   - Custom animations in styles.css

7. CONTENT
   - About section: Edit the code-block in index.html
   - GitHub stats: Update the numbers in the GitHub section
   - Footer: Edit copyright and social links

NOTE: All changes should be made in index.html and styles.css
*/

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initTypedJS,
        initAOS,
        initMobileMenu,
        initNavbarScroll,
        initSmoothScroll,
        initFormSubmission,
        initScrollAnimations
    };
}
