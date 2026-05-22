(function () {
    'use strict';

    function initSolutionMenuState() {
        const pathParts = window.location.pathname.split('/');
        const currentPage = pathParts[pathParts.length - 1] || 'index.html';
        const solutionPages = [
            'acme-erp.html',
            'smart-school-plus.html',
            'higrade.html',
            'medsysb.html',
            'cristo.html',
            'microfund.html',
            'eaudithub.html'
        ];

        if (!solutionPages.includes(currentPage)) {
            return;
        }

        document.querySelectorAll('.navbar .nav-link.active, .navbar .dropdown-item.active, .navbar .mega-menu-item.active')
            .forEach((element) => element.classList.remove('active'));

        const solutionsToggle = document.querySelector('.has-mega-menu > .nav-link.dropdown-toggle');
        if (solutionsToggle) {
            solutionsToggle.classList.add('active');
        }

        document.querySelectorAll(`.mega-menu-item[href="${currentPage}"]`).forEach((link) => {
            link.classList.add('active');
        });
    }

    function initModulesCarousel() {
        const container = document.getElementById('modulesScrollContainer');
        const track = document.getElementById('modulesScrollTrack');
        const leftBtn = document.getElementById('btnScrollLeft');
        const rightBtn = document.getElementById('btnScrollRight');
        const dots = Array.from(document.querySelectorAll('#modulesPagination .dot'));

        if (!container || !track || container.dataset.modulesCarouselReady === 'true') {
            return;
        }

        const cards = Array.from(track.querySelectorAll('.module-new-card'));
        if (!cards.length) {
            return;
        }

        container.dataset.modulesCarouselReady = 'true';

        let autoTimer = null;
        let resumeTimer = null;
        let hovering = false;

        function getScrollableCards() {
            const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth, 0);
            return cards.filter((card) => card.offsetLeft <= maxScrollLeft + 2);
        }

        function getActiveCards() {
            const scrollableCards = getScrollableCards();
            return scrollableCards.length ? scrollableCards : [cards[0]];
        }

        function getCurrentIndex() {
            const activeCards = getActiveCards();
            const currentLeft = container.scrollLeft;
            let closestIndex = 0;
            let smallestDistance = Number.POSITIVE_INFINITY;

            activeCards.forEach((card, index) => {
                const distance = Math.abs(card.offsetLeft - currentLeft);
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    closestIndex = index;
                }
            });

            return closestIndex;
        }

        function updateDots() {
            if (!dots.length) {
                return;
            }

            const activeCards = getActiveCards();
            const currentIndex = getCurrentIndex();
            const dotIndex = Math.min(
                dots.length - 1,
                Math.round((currentIndex / Math.max(activeCards.length - 1, 1)) * (dots.length - 1))
            );

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === dotIndex);
            });
        }

        function goToIndex(index) {
            const activeCards = getActiveCards();
            const safeIndex = Math.max(0, Math.min(index, activeCards.length - 1));
            const targetCard = activeCards[safeIndex];

            if (!targetCard) {
                return;
            }

            container.scrollTo({
                left: targetCard.offsetLeft,
                behavior: 'smooth'
            });
        }

        function stopAuto() {
            if (autoTimer) {
                clearInterval(autoTimer);
                autoTimer = null;
            }
        }

        function startAuto() {
            stopAuto();

            if (hovering || container.scrollWidth <= container.clientWidth) {
                return;
            }

            autoTimer = setInterval(() => {
                const activeCards = getActiveCards();
                const currentIndex = getCurrentIndex();
                const nextIndex = currentIndex >= activeCards.length - 1 ? 0 : currentIndex + 1;
                goToIndex(nextIndex);
            }, 3000);
        }

        function pauseThenResume() {
            stopAuto();

            if (resumeTimer) {
                clearTimeout(resumeTimer);
            }

            resumeTimer = setTimeout(() => {
                resumeTimer = null;
                if (!hovering) {
                    startAuto();
                }
            }, 7000);
        }

        if (leftBtn) {
            leftBtn.addEventListener('click', function () {
                const activeCards = getActiveCards();
                const currentIndex = getCurrentIndex();
                const targetIndex = currentIndex <= 0 ? activeCards.length - 1 : currentIndex - 1;
                goToIndex(targetIndex);
                pauseThenResume();
            });
        }

        if (rightBtn) {
            rightBtn.addEventListener('click', function () {
                const activeCards = getActiveCards();
                const currentIndex = getCurrentIndex();
                const targetIndex = currentIndex >= activeCards.length - 1 ? 0 : currentIndex + 1;
                goToIndex(targetIndex);
                pauseThenResume();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                const activeCards = getActiveCards();
                const targetIndex = Math.round((index / Math.max(dots.length - 1, 1)) * (activeCards.length - 1));
                goToIndex(targetIndex);
                pauseThenResume();
            });
        });

        container.addEventListener('scroll', updateDots, { passive: true });
        container.addEventListener('mouseenter', function () {
            hovering = true;
            stopAuto();
        });
        container.addEventListener('mouseleave', function () {
            hovering = false;
            if (!resumeTimer) {
                startAuto();
            }
        });

        window.addEventListener('resize', updateDots);

        updateDots();
        startAuto();
    }

    function initSolutionPage() {
        initSolutionMenuState();
        initModulesCarousel();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSolutionPage);
    } else {
        initSolutionPage();
    }

    window.addEventListener('load', initSolutionPage);
})();
