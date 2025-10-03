// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

// Global variables
let isLoaded = false;
const tl = gsap.timeline();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initNavigation();
    initSmoothScroll();
    initAnimations();
    initCounters();
    initContactForm();
    initParallax();
    handleInitialHash();
    initCodeAnimation();
});

// Handle initial hash navigation
function handleInitialHash() {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Wait for page to load completely
            setTimeout(() => {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}

// Loading Screen Animation
function initLoader() {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.progress');
    const logoSymbol = document.querySelector('.loader-logo-symbol');
    const logoText = document.querySelector('.logo-animation h1');
    
    // Animate logo
    const logoTl = gsap.timeline();
    logoTl
        .fromTo(logoSymbol, 
            { opacity: 0, y: 50, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
        )
        .fromTo(logoText, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.3"
        );
    
    // Animate progress bar
    gsap.to(progressBar, {
        width: '100%',
        duration: 2.5,
        ease: "power2.inOut",
        onComplete: function() {
            // Hide loader and show content
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: function() {
                    loader.style.display = 'none';
                    isLoaded = true;
                    initHeroAnimations();
                }
            });
        }
    });
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        }
    });
    
    // Active navigation link
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavigation() {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        // If we're at the very top, highlight home
        if (window.scrollY < 100) {
            current = 'home';
        }
        
        navigationLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Update on load
    updateActiveNavigation();
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                
                // Close mobile menu if open
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Try GSAP ScrollTo first, fallback to native smooth scroll
                if (gsap && gsap.plugins && gsap.plugins.ScrollToPlugin) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: offsetTop, autoKill: false },
                        ease: "power2.inOut"
                    });
                } else {
                    // Fallback to native smooth scrolling
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Hero section animations
function initHeroAnimations() {
    const heroTimeline = gsap.timeline();
    
    // Animate hero elements
    heroTimeline
        .from('.hero-main-heading', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out"
        })
        .from('.hero-image-container', {
            duration: 1.2,
            y: 30,
            opacity: 0,
            scale: 0.95,
            ease: "power2.out",
            clearProps: "all"
        }, "-=0.5")
        .from('.hero-description', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.6")
        .from('.hero-buttons', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.4")
        .from('.code-animation', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            ease: "back.out(1.7)"
        }, "-=0.8")
        .from('.code-line', {
            duration: 0.5,
            x: -20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.3")
        .from('.scroll-indicator', {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.2");
    
    // Floating icons animation
    gsap.set('.floating-icon', { opacity: 0, scale: 0 });
    gsap.to('.floating-icon', {
        opacity: 0.7,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 2
    });
}

// Initialize scroll-triggered animations
function initAnimations() {
    // Fade in elements
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Fade in from left
    gsap.utils.toArray('.fade-in-left').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Fade in from right
    gsap.utils.toArray('.fade-in-right').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            x: 50
        }, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Scale in elements
    gsap.utils.toArray('.scale-in').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            scale: 0.8
        }, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // About cards stagger animation
    gsap.fromTo('.about-card', {
        opacity: 0,
        y: 50,
        scale: 0.9
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.about-text',
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Service cards animation
    gsap.fromTo('.service-card', {
        opacity: 0,
        y: 50,
        rotationY: 15
    }, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.services-grid',
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Project cards animation
    gsap.fromTo('.project-card', {
        opacity: 0,
        y: 50,
        scale: 0.9
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.projects-grid',
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Contact section animation
    gsap.fromTo('.contact-content', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.contact',
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
        }
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        gsap.fromTo(counter, {
            innerHTML: 0
        }, {
            innerHTML: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: counter,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    // Security: Domain verification - only allow from your domain
    const allowedDomains = ['localhost', '127.0.0.1', 'your-domain.com', 'codeyatra.com'];
    const currentDomain = window.location.hostname;
    
    if (!allowedDomains.includes(currentDomain) && !currentDomain.includes('github.io')) {
        console.warn('EmailJS blocked: Unauthorized domain');
        return;
    }
    
    // Initialize EmailJS with your actual credentials
    const emailConfig = {
        pk: '6z2n46iyLDeBue3wD',
        sid: 'service_bh1kf2n',            
        tid: 'template_8o3axvs'
    };
    
    // Debug function - remove after fixing
    window.debugEmailJS = function() {
        console.log('🔍 EmailJS Configuration Debug:');
        console.log('Public Key:', emailConfig.pk);
        console.log('Service ID:', emailConfig.sid);
        console.log('Template ID:', emailConfig.tid);
        console.log('Current Domain:', window.location.hostname);
        console.log('EmailJS Loaded:', typeof emailjs !== 'undefined');
        
        // Test if EmailJS is properly loaded
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS library not loaded! Check your script tag.');
            return false;
        }
        
        console.log('✅ EmailJS library loaded successfully');
        return true;
    };
    
    emailjs.init({
        publicKey: emailConfig.pk,
        blockHeadless: true, // Security: Block headless browsers
        blockList: {
            list: ['foo@emailjs.com', 'bar@emailjs.com'], // Block specific emails if needed
        },
        limitRate: {
            throttle: 10000, // Security: 10 second throttle between requests
        }
    });
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Security: Rate limiting check
        const lastSubmission = localStorage.getItem('lastEmailSubmission');
        const now = Date.now();
        const cooldownTime = 60000; // 1 minute cooldown
        
        if (lastSubmission && (now - parseInt(lastSubmission)) < cooldownTime) {
            showNotification('Please wait a moment before sending another message.', 'error');
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Security: Input validation and sanitization
        const name = formData.get('name')?.trim().substring(0, 100);
        const email = formData.get('email')?.trim().toLowerCase().substring(0, 100);
        const subject = formData.get('subject')?.trim().substring(0, 200);
        const message = formData.get('message')?.trim().substring(0, 1000);
        
        // Security: Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Security: Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Security: Content filtering (basic spam detection)
        const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'urgent'];
        const contentToCheck = (name + ' ' + subject + ' ' + message).toLowerCase();
        if (spamKeywords.some(keyword => contentToCheck.includes(keyword))) {
            showNotification('Message contains suspicious content.', 'error');
            return;
        }
        
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_name: 'Code Yatra Team',
            website_url: window.location.href, // Security: Track source
            timestamp: new Date().toISOString(), // Security: Add timestamp
            user_agent: navigator.userAgent.substring(0, 200), // Security: Track browser
            ip_info: 'Client-side (hidden)', // Security note
            security_token: btoa(Date.now() + Math.random()).substring(0, 16) // Basic token
        };
        
        // Animate submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        gsap.to(submitButton, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;
        
        // Send email using EmailJS with obfuscated IDs
        emailjs.send(
            emailConfig.sid,
            emailConfig.tid,
            templateParams
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Security: Store successful submission timestamp
            localStorage.setItem('lastEmailSubmission', now.toString());
            
            // Success feedback
            submitButton.innerHTML = 'Message Sent! ✓';
            submitButton.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
            
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        })
        .catch(function(error) {
            console.error('EmailJS Error Details:', {
                error: error,
                status: error.status,
                text: error.text,
                publicKey: emailConfig.pk,
                serviceId: emailConfig.sid,
                templateId: emailConfig.tid,
                templateParams: templateParams
            });
            
            // Specific error messages based on status
            let errorMessage = 'Failed to send message. ';
            let debugInfo = '';
            
            if (error.status === 400) {
                errorMessage = '⚠️ Configuration Error: Invalid EmailJS setup. ';
                debugInfo = 'Check your Public Key, Service ID, and Template ID.';
            } else if (error.status === 401) {
                errorMessage = '🔐 Authentication Error: Invalid credentials. ';
                debugInfo = 'Verify your EmailJS Public Key.';
            } else if (error.status === 403) {
                errorMessage = '🚫 Access Denied: Domain restrictions. ';
                debugInfo = 'Check domain restrictions in EmailJS dashboard.';
            } else if (error.status === 404) {
                errorMessage = '❓ Not Found: Service or Template not found. ';
                debugInfo = 'Check your Service ID and Template ID.';
            } else if (error.status === 429) {
                errorMessage = '⏰ Rate Limited: Too many requests. ';
                debugInfo = 'Wait a moment before trying again.';
            } else {
                errorMessage = '🌐 Network Error: Connection failed. ';
                debugInfo = 'Check your internet connection.';
            }
            
            // Error feedback
            submitButton.innerHTML = 'Send Failed ✗';
            submitButton.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
            
            // Show detailed error message
            showNotification(errorMessage + debugInfo, 'error');
            
            // Console log for debugging
            console.log('🐛 EmailJS Debug Info:', {
                'Public Key': emailConfig.pk,
                'Service ID': emailConfig.sid, 
                'Template ID': emailConfig.tid,
                'Current Domain': window.location.hostname,
                'Template Data': templateParams
            });
            
            // Reset button after 5 seconds for errors
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 5000);
        });
    });
    
    // Form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Notification function for user feedback
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        maxWidth: '400px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        fontFamily: "'Poppins', sans-serif"
    });
    
    // Style notification content
    const content = notification.querySelector('.notification-content');
    Object.assign(content.style, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px'
    });
    
    // Style close button
    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '0',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effects
function initParallax() {
    // Hero parallax effect
    gsap.to('.floating-elements', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Section backgrounds parallax
    gsap.utils.toArray('.about, .projects').forEach(section => {
        gsap.to(section, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Mouse move effects
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Floating icons follow mouse
    gsap.to('.floating-icon', {
        x: mouseX * 20,
        y: mouseY * 20,
        duration: 2,
        ease: "power2.out",
        stagger: 0.1
    });
    
    // Code animation slight movement
    gsap.to('.code-animation', {
        rotationY: (mouseX - 0.5) * 10,
        rotationX: (mouseY - 0.5) * -10,
        duration: 1,
        ease: "power2.out"
    });
});

// Button hover effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    button.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Card hover effects
document.querySelectorAll('.service-card, .project-card, .about-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Typing animation for hero code
function initTypingAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    const texts = [
        'function codeYatra() {',
        '  return "Amazing experiences";',
        '};'
    ];
    
    codeLines.forEach((line, index) => {
        gsap.to(line, {
            text: texts[index],
            duration: 1,
            delay: index * 0.5 + 3,
            ease: "none"
        });
    });
}

// Initialize typing animation after page load
window.addEventListener('load', function() {
    setTimeout(initTypingAnimation, 2000);
});

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ffd700 0%, #ffed4e 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Text reveal animation on scroll
function initTextReveal() {
    gsap.utils.toArray('.section-subtitle').forEach(text => {
        gsap.fromTo(text, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Initialize text reveal
initTextReveal();

// Page visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when page is visible
        gsap.globalTimeline.resume();
    }
});

// Resize handler for responsive animations
window.addEventListener('resize', function() {
    ScrollTrigger.refresh();
});

// Custom cursor effect (optional)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #ffd700 0%, #b8860b 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
}

// Initialize custom cursor on desktop
if (window.innerWidth > 768) {
    initCustomCursor();
}

// Performance optimization
gsap.config({
    force3D: true,
    nullTargetWarn: false
});

// Set high performance mode for ScrollTrigger
ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true
});
function initCodeAnimation() {
    const codeSnippets = [
        [{text: 'function', type: 'keyword'}, {text: ' '}, {text: 'codeYatra', type: 'function'}, {text: '() {'}],
        [{text: '  '}, {text: 'return', type: 'keyword'}, {text: ' '}, {text: '"Amazing experiences"', type: 'string'}, {text: ';'}],
        [{text: '};'}],
        [{text: 'const', type: 'keyword'}, {text: ' buildWebsite = () => {'}],
        [{text: '  '}, {text: 'return', type: 'keyword'}, {text: ' '}, {text: '"Modern & Responsive"', type: 'string'}, {text: ';'}],
        [{text: '};'}],
        [{text: 'async', type: 'keyword'}, {text: ' '}, {text: 'function', type: 'keyword'}, {text: ' '}, {text: 'createApp', type: 'function'}, {text: '() {'}],
        [{text: '  '}, {text: 'await', type: 'keyword'}, {text: ' '}, {text: 'deploy', type: 'function'}, {text: '('}, {text: '"production"', type: 'string'}, {text: ');'}],
        [{text: '}'}],
        [{text: 'class', type: 'keyword'}, {text: ' DigitalMarketing {'}],
        [{text: '  '}, {text: 'boostSEO', type: 'function'}, {text: '() { '}, {text: 'return', type: 'keyword'}, {text: ' '}, {text: '"Top Rankings"', type: 'string'}, {text: '; }'}],
        [{text: '}'}],
        [{text: 'const', type: 'keyword'}, {text: ' cloudDeploy = '}, {text: 'async', type: 'keyword'}, {text: ' () => {'}],
        [{text: '  '}, {text: 'return', type: 'keyword'}, {text: ' '}, {text: '"AWS/Azure/GCP"', type: 'string'}, {text: ';'}],
        [{text: '};'}],
        [{text: 'function', type: 'keyword'}, {text: ' '}, {text: 'innovate', type: 'function'}, {text: '() {'}],
        [{text: '  '}, {text: 'return', type: 'keyword'}, {text: ' '}, {text: '"Build. Create. Grow."', type: 'string'}, {text: ';'}],
        [{text: '};'}]
    ];

    const snippetGroups = [[0,1,2], [3,4,5], [6,7,8], [9,10,11], [12,13,14], [15,16,17]];
    let groupIndex = 0;
    const [line1, line2, line3] = ['.line1', '.line2', '.line3'].map(s => document.querySelector('.code-line' + s));

    if (!line1) return;

    const buildLineText = tokens => tokens.map(t => t.text).join('');

    function typeLinePlain(el, text, idx, onDone) {
        if (idx >= text.length) return onDone();
        el.textContent = text.substring(0, idx + 1);
        setTimeout(() => typeLinePlain(el, text, idx + 1, onDone), 30);
    }

    function colorize(el, tokens) {
        el.innerHTML = '';
        tokens.forEach(t => {
            const span = document.createElement('span');
            if (t.type) span.className = t.type === 'function' ? 'function-name' : t.type;
            span.textContent = t.text;
            el.appendChild(span);
        });
    }

    function animate() {
        const [i1, i2, i3] = snippetGroups[groupIndex];
        [line1, line2, line3].forEach(l => l.textContent = '');

        typeLinePlain(line1, buildLineText(codeSnippets[i1]), 0, () => {
            colorize(line1, codeSnippets[i1]);
            typeLinePlain(line2, buildLineText(codeSnippets[i2]), 0, () => {
                colorize(line2, codeSnippets[i2]);
                typeLinePlain(line3, buildLineText(codeSnippets[i3]), 0, () => {
                    colorize(line3, codeSnippets[i3]);
                    groupIndex = (groupIndex + 1) % snippetGroups.length;
                    setTimeout(animate, 2000);
                });
            });
        });
    }

    setTimeout(animate, 500);
}
