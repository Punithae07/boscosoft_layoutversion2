// Styles are loaded via <link> tags in the HTML for static deployment.

document.addEventListener('DOMContentLoaded', () => {
  const animateCounter = (target) => {
    if (!target || target.dataset.counted === 'true') return;

    const endVal = parseInt(target.getAttribute('data-val'), 10);
    const suffix = target.getAttribute('data-suffix') || '+';

    if (isNaN(endVal)) return;

    target.dataset.counted = 'true';

    const startVal = 0;
    const duration = 2000;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * (endVal - startVal) + startVal);
      const formattedValue = endVal >= 1000 ? currentVal.toLocaleString() : currentVal.toString();

      target.textContent = `${formattedValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        target.textContent = `${endVal.toLocaleString()}${suffix}`;
      }
    };

    requestAnimationFrame(updateCount);
  };
  
  // 1. STICKY HEADER & SCROLL STATE
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initially
  
  // 2. MOBILE NAVIGATION DRAWER
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Mobile menu sublinks click expand (since hover isn't present on mobile)
  const navDropdowns = document.querySelectorAll('.nav-item > a');
  navDropdowns.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        const parent = link.parentElement;
        const hasMega = parent.querySelector('.mega-menu');
        if (hasMega) {
          e.preventDefault(); // Stop navigating
          parent.classList.toggle('active');
        }
      }
    });
  });

  // Close mobile menu on clicking any direct link inside mega menu
  const megaLinks = document.querySelectorAll('.mega-item a');
  megaLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      }
    });
  });

  // 3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // If it's a capability grid or cards group, let the children reveal in order
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before coming fully into view
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 4. STATS COUNT-UP ANIMATION
  const statNumbers = document.querySelectorAll('.hero-trust-number');
  if (statNumbers.length > 0) {
    if ('IntersectionObserver' in window) {
      const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const target = entry.target.matches('.hero-trust-number')
            ? entry.target
            : entry.target.querySelector('.hero-trust-number');

          animateCounter(target);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.2 });

      statNumbers.forEach(stat => {
        const triggerTarget = stat.closest('.hero-trust-item') || stat;
        countUpObserver.observe(triggerTarget);
      });
    } else {
      statNumbers.forEach(animateCounter);
    }

    window.setTimeout(() => {
      statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          animateCounter(stat);
        }
      });
    }, 350);
  }

  // 5. INTERACTIVE PLATFORMS Showcase (TABS SWITCHER)
  const tabButtons = document.querySelectorAll('#platform-tabs .tab-btn');
  const tabPanels = document.querySelectorAll('.tabs-display .tabs-content');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);

      if (!targetPanel) return;
      
      // Update buttons active state
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update panels active state
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });

      targetPanel.classList.add('active');
      
      // Trigger bar heights animation in mockups inside the panel
      const bars = targetPanel.querySelectorAll('.mock-dash-bar');
      bars.forEach(bar => {
        bar.classList.remove('animate');
        void bar.offsetWidth; // Force reflow to restart animation
        bar.classList.add('animate');
      });
    });
  });

  // Trigger bars animation in active tab on load
  const activeBars = document.querySelectorAll('.tabs-content.active .mock-dash-bar');
  activeBars.forEach(bar => {
    bar.classList.add('animate');
  });

  // 6. SCROLL PARALLAX SYSTEM FOR FLOATING WIDGETS
  const parallaxItems = document.querySelectorAll('.parallax-item');
  
  window.addEventListener('scroll', () => {
    // Only process on desktop to prevent mobile performance drops
    if (window.innerWidth > 768) {
      const scrollY = window.scrollY;
      
      parallaxItems.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-speed')) || 1;
        // Calculate offset based on scroll, capped to prevent cards drifting off-screen
        const offset = (scrollY * 0.05 * speed);
        item.style.transform = `translateY(${offset}px)`;
      });
    }
  });

  // 7. 3D TESTIMONIAL STACKED DECK
  const stackCards = document.querySelectorAll('.testimonial-stack-card');
  const prevStackBtn = document.getElementById('prev-stack-btn');
  const nextStackBtn = document.getElementById('next-stack-btn');
  const stackDots = document.querySelectorAll('.stack-dot');
  
  if (stackCards.length > 0) {
    let currentIdx = 0;
    let isTransitioning = false;
    
    const updateStack = () => {
      stackCards.forEach((card, index) => {
        card.classList.remove('active-card', 'behind-1', 'behind-2', 'hidden-card', 'swipe-left', 'swipe-right');
        
        const n = stackCards.length;
        const relativeIndex = (index - currentIdx + n) % n;
        
        if (relativeIndex === 0) {
          card.classList.add('active-card');
        } else if (relativeIndex === 1) {
          card.classList.add('behind-1');
        } else if (relativeIndex === 2) {
          card.classList.add('behind-2');
        } else {
          card.classList.add('hidden-card');
        }
      });
      
      stackDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIdx);
      });
      
      isTransitioning = false;
    };
    
    const rotateStack = (direction) => {
      if (isTransitioning) return;
      isTransitioning = true;
      
      const activeCard = document.querySelector('.testimonial-stack-card.active-card');
      if (activeCard) {
        activeCard.classList.add(direction === 'next' ? 'swipe-left' : 'swipe-right');
      }
      
      setTimeout(() => {
        if (direction === 'next') {
          currentIdx = (currentIdx + 1) % stackCards.length;
        } else {
          currentIdx = (currentIdx - 1 + stackCards.length) % stackCards.length;
        }
        updateStack();
      }, 300); // Wait for swipe animation to finish
    };
    
    if (nextStackBtn) {
      nextStackBtn.addEventListener('click', () => rotateStack('next'));
    }
    
    if (prevStackBtn) {
      prevStackBtn.addEventListener('click', () => rotateStack('prev'));
    }
    
    stackDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (currentIdx === index || isTransitioning) return;
        isTransitioning = true;
        
        const activeCard = document.querySelector('.testimonial-stack-card.active-card');
        if (activeCard) {
          activeCard.classList.add(index > currentIdx ? 'swipe-left' : 'swipe-right');
        }
        
        setTimeout(() => {
          currentIdx = index;
          updateStack();
        }, 300);
      });
    });
    
    // Initialize stack positions
    updateStack();
  }

  // 8. ACTIVE MENU LINK HIGHLIGHT
  const initActiveLinks = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a, .logo-container, .footer-links a');
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (!linkPath) return;
      
      if (linkPath === '/' || linkPath === '#') {
        if (currentPath === '/' || currentPath === '/index.html' || currentPath === '') {
          link.classList.add('active');
        }
      } else {
        const cleanPath = currentPath.replace(/^\/|\/$/g, '');
        const cleanLink = linkPath.replace(/^\/|\/$/g, '');
        
        if (cleanPath === cleanLink || (cleanLink && cleanPath.startsWith(cleanLink))) {
          link.classList.add('active');
          const parentItem = link.closest('.nav-item');
          if (parentItem) {
            const dropdownToggle = parentItem.querySelector('.nav-link');
            if (dropdownToggle) {
              dropdownToggle.classList.add('active');
            }
          }
        }
      }
    });
  };
  initActiveLinks();

  // 9. MODULES CAROUSEL FOR PRODUCT PAGES
  const initModulesCarousel = () => {
    const container = document.getElementById('modulesScrollContainer');
    const track = document.getElementById('modulesScrollTrack');
    const leftBtn = document.getElementById('btnScrollLeft');
    const rightBtn = document.getElementById('btnScrollRight');
    const pagination = document.getElementById('modulesPagination');

    if (!container || !track) return;

    const cards = Array.from(track.querySelectorAll('.module-new-card'));
    if (!cards.length) return;

    // Create pagination dots dynamically if they don't exist
    if (pagination && pagination.children.length === 0) {
      const numDots = Math.min(3, cards.length); 
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        pagination.appendChild(dot);
      }
    }
    const dots = Array.from(document.querySelectorAll('#modulesPagination .dot'));

    let autoTimer = null;
    let resumeTimer = null;
    let hovering = false;

    function getScrollableCards() {
      const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth, 0);
      return cards.filter(card => card.offsetLeft <= maxScrollLeft + 2);
    }

    function getActiveCards() {
      const scrollableCards = getScrollableCards();
      return scrollableCards.length ? scrollableCards : [cards[0]];
    }

    function getCurrentIndex() {
      const activeCards = getActiveCards();
      const currentLeft = container.scrollLeft;
      let closestIndex = 0;
      let smallestDistance = Infinity;

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
      if (!dots.length) return;

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

      if (!targetCard) return;

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
      if (hovering || container.scrollWidth <= container.clientWidth) return;

      autoTimer = setInterval(() => {
        const activeCards = getActiveCards();
        const currentIndex = getCurrentIndex();
        const nextIndex = currentIndex >= activeCards.length - 1 ? 0 : currentIndex + 1;
        goToIndex(nextIndex);
      }, 3000);
    }

    function pauseThenResume() {
      stopAuto();
      if (resumeTimer) clearTimeout(resumeTimer);

      resumeTimer = setTimeout(() => {
        resumeTimer = null;
        if (!hovering) startAuto();
      }, 7000);
    }

    if (leftBtn) {
      leftBtn.addEventListener('click', () => {
        const activeCards = getActiveCards();
        const currentIndex = getCurrentIndex();
        const targetIndex = currentIndex <= 0 ? activeCards.length - 1 : currentIndex - 1;
        goToIndex(targetIndex);
        pauseThenResume();
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        const activeCards = getActiveCards();
        const currentIndex = getCurrentIndex();
        const targetIndex = currentIndex >= activeCards.length - 1 ? 0 : currentIndex + 1;
        goToIndex(targetIndex);
        pauseThenResume();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const activeCards = getActiveCards();
        const targetIndex = Math.round((index / Math.max(dots.length - 1, 1)) * (activeCards.length - 1));
        goToIndex(targetIndex);
        pauseThenResume();
      });
    });

    container.addEventListener('scroll', updateDots, { passive: true });
    container.addEventListener('mouseenter', () => {
      hovering = true;
      stopAuto();
    });
    container.addEventListener('mouseleave', () => {
      hovering = false;
      if (!resumeTimer) startAuto();
    });

    window.addEventListener('resize', updateDots);

    updateDots();
    startAuto();
  };
  initModulesCarousel();

  // 10. 3D TILT EFFECT ON HOVER
  const tiltCards = document.querySelectorAll('.tilt-card, .module-new-card, .testimonial-card, .what-we-do-card:not(.what-we-do-impact-card)');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      const mouseX = e.clientX - cardRect.left - cardWidth / 2;
      const mouseY = e.clientY - cardRect.top - cardHeight / 2;
      
      const maxTilt = 8; // degrees
      const tiltX = (mouseY / (cardHeight / 2)) * -maxTilt;
      const tiltY = (mouseX / (cardWidth / 2)) * maxTilt;
      
      const isWhatWeDo = card.classList.contains('what-we-do-card');
      const translateY = isWhatWeDo ? 'translateY(-8px) ' : '';
      
      card.style.transform = `perspective(1000px) ${translateY}rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
});

