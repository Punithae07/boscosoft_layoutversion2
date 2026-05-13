(function () {
    'use strict';

    const servicePages = [
        'app-modernization.html',
        'bespoke-solutions.html',
        'erp-customization.html',
        'staff-augmentation.html',
        'digital-marketing.html'
    ];

    function initServiceMenuState() {
        const pathParts = window.location.pathname.split('/');
        const currentPage = pathParts[pathParts.length - 1] || 'index.html';

        if (!servicePages.includes(currentPage)) {
            return;
        }

        document.querySelectorAll('.navbar .nav-link.active, .navbar .dropdown-item.active, .navbar .mega-menu-item.active')
            .forEach((element) => element.classList.remove('active'));

        const servicesToggle = document.querySelectorAll('.has-mega-menu > .nav-link.dropdown-toggle')[1];
        if (servicesToggle) {
            servicesToggle.classList.add('active');
        }

        document.querySelectorAll(`.mega-menu-item[href="${currentPage}"]`).forEach((link) => {
            link.classList.add('active');
        });
    }

    function initServiceParallax() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const scopes = Array.from(document.querySelectorAll('[data-service-parallax-scope]'));
        if (!scopes.length) {
            return;
        }

        const visibleScopes = new Set();
        let ticking = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visibleScopes.add(entry.target);
                } else {
                    visibleScopes.delete(entry.target);
                }
            });

            requestTick();
        }, {
            threshold: 0,
            rootMargin: '150px 0px 150px 0px'
        });

        scopes.forEach((scope) => observer.observe(scope));

        function updateParallax() {
            ticking = false;

            visibleScopes.forEach((scope) => {
                const rect = scope.getBoundingClientRect();
                const midPoint = window.innerHeight * 0.5;
                const offset = (rect.top + rect.height * 0.5 - midPoint) / window.innerHeight;

                scope.querySelectorAll('[data-service-parallax]').forEach((node) => {
                    const speed = parseFloat(node.getAttribute('data-service-parallax')) || 0;
                    const translateY = Math.max(-24, Math.min(24, offset * speed * -18));
                    node.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
                });
            });
        }

        function requestTick() {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(updateParallax);
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
        window.addEventListener('resize', requestTick);
        requestTick();
    }

    function forceVisibleServiceSections() {
        const selectors = [
            '.service-hero-section .reveal',
            '.service-hero-section .reveal-left',
            '.service-hero-section .reveal-right',
            '.service-hero-section .reveal-up',
            '.service-story-section .reveal',
            '.service-story-section .reveal-left',
            '.service-story-section .reveal-right',
            '.service-story-section .reveal-up'
        ];

        document.querySelectorAll(selectors.join(', ')).forEach((element) => {
            element.classList.add('active');
        });
    }

    function initServicePages() {
        initServiceMenuState();
        initServiceParallax();
        forceVisibleServiceSections();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServicePages);
    } else {
        initServicePages();
    }

    window.addEventListener('load', initServicePages);
})();
