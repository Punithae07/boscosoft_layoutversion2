/**
 * BoscoSoftTech - Main JavaScript
 * Handles: counters, reveals, carousels, mega menus, back-to-top, mobile nav
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initAll();
});

function initAll() {
    // Core features
    initRevealObserver();
    initCounters();
    initCarousels();
    initMegaMenus();
    initBackToTop();
    initMobileNav();
    initPortfolioSlider();
    initServicesCarousel();
    initTestimonialsCarousel();
    initCristoModules();
}

// ====================
// 1. REVEAL ANIMATIONS (Fixes hidden content)
// ====================
function initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });

    // Safety: Show all after 3s
    setTimeout(() => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            el.classList.add('active');
        });
    }, 3000);
}

// ====================
// 2. COUNTERS ANIMATION (Fixes TODO.md)
// ====================
function initCounters() {
    const counters = document.querySelectorAll('.counter-value[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    let current = 0;
    const increment = target / 100;
    const duration = 2000;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + suffix;
        }
    }, duration / 100);
}

// ====================
// 3. CAROUSELS
// ====================

function initCarousels() {
    const carouselElements = document.querySelectorAll('.carousel');

    carouselElements.forEach((carouselEl) => {
        if (window.bootstrap?.Carousel) {
            bootstrap.Carousel.getOrCreateInstance(carouselEl);
        }
    });
}

// Portfolio Sidebar (index.html)
function initPortfolioSlider() {
    const navItems = document.querySelectorAll('.portfolio-nav-item');
    const details = document.querySelectorAll('.product-detail');

    if (!navItems.length || !details.length) return;

    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            const productId = item.dataset.product;
            const activeDetail = productId ? document.getElementById(productId) : null;

            if (!activeDetail) return;

            // Remove active
            navItems.forEach(nav => nav.classList.remove('active'));
            details.forEach(detail => detail.classList.remove('active'));
            
            // Add active
            item.classList.add('active');
            activeDetail.classList.add('active');
        });
    });
}

// Services Carousel (index.html)
function initServicesCarousel() {
    const track = document.querySelector('.services-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = 340; // service-card width + gap
    let currentIndex = 0;

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        track.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        track.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    });
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    const track = document.querySelector('.testimonials-carousel');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');

    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = 420;
    let currentIndex = 0;

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        track.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        track.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    });
}

// CristO Modules (cristo.html)
function initCristoModules() {
    const container = document.getElementById('modulesScrollContainer');
    const track = document.getElementById('modulesScrollTrack');
    const leftBtn = document.getElementById('btnScrollLeft');
    const rightBtn = document.getElementById('btnScrollRight');
    const dots = document.querySelectorAll('#modulesPagination .dot');
    const cardWidth = 380; // module-new-card width + gap

    if (!container) return;

    let currentIndex = 0;
    const maxIndex = Math.floor(track.scrollWidth / cardWidth) - 1;

    function updateScroll() {
        container.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    leftBtn?.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateScroll();
    });

    rightBtn?.addEventListener('click', () => {
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateScroll();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateScroll();
        });
    });
}

// ====================
// 4. MEGA MENUS (Desktop hover)
// ====================
function initMegaMenus() {
    // Close mega menus on mobile scroll
    if (window.innerWidth <= 991) {
        document.addEventListener('scroll', () => {
            const megaMenus = document.querySelectorAll('.mega-menu');
            megaMenus.forEach(menu => menu.classList.remove('show'));
        }, { passive: true });
    }
}

// ====================
// 5. BACK TO TOP
// ====================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('active', 'show');
        } else {
            btn.classList.remove('active', 'show');
        }
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ====================
// 6. MOBILE NAVIGATION
// ====================
function initMobileNav() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }, 300);
        });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navbarCollapse?.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
}

// ====================
// 7. NAVBAR SCROLL EFFECT
// ====================
function initNavbarScroll() {
    let ticking = false;
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

// Initialize on load
initNavbarScroll();

// ====================
// 8. HERO CAROUSEL AUTO-PAUSE ON INTERACTION
// ====================
document.addEventListener('DOMContentLoaded', function() {
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', () => {
            heroCarousel.querySelector('.carousel').setAttribute('data-bs-interval', 'false');
        });
        heroCarousel.addEventListener('mouseleave', () => {
            heroCarousel.querySelector('.carousel').removeAttribute('data-bs-interval');
        });
    }
});

// ====================
// 9. PERF WATCH - PERFORMANCE MONITORING
// ====================
if ('PerformanceObserver' in window) {
    const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log(`LCP: ${Math.round(entry.startTime)}ms`);
            }
        }
    });
    po.observe({ entryTypes: ['largest-contentful-paint'] });
}

