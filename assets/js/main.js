/* ========================================
   TLV Bet - Supreme Bet
   Premium Sports Betting & Casino
   Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // =========================================
    // MOBILE NAVIGATION
    // =========================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainNav = document.getElementById('mainNav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            hamburgerBtn.classList.toggle('active', isOpen);
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close nav on link click
        mainNav.querySelectorAll('.header__link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close nav on outside click
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('open') &&
                !mainNav.contains(e.target) &&
                !hamburgerBtn.contains(e.target)) {
                mainNav.classList.remove('open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }


    // =========================================
    // STICKY HEADER
    // =========================================
    const header = document.getElementById('header');
    let lastScrollY = 0;

    function handleHeaderScroll() {
        const scrollY = window.scrollY;
        if (header) {
            header.classList.toggle('scrolled', scrollY > 60);
        }
        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });


    // =========================================
    // ACTIVE NAV LINK ON SCROLL
    // =========================================
    const sections = document.querySelectorAll('section[id]');
    const headerLinks = document.querySelectorAll('.header__link');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        headerLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });


    // =========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // =========================================
    // COUNTER ANIMATION (Intersection Observer)
    // =========================================
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 2000;
        const startTime = performance.now();

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentVal = Math.floor(easedProgress * target);

            el.textContent = currentVal.toLocaleString('he-IL');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString('he-IL');
            }
        }

        requestAnimationFrame(update);
    }

    const counterElements = document.querySelectorAll('[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counterElements.forEach(el => counterObserver.observe(el));


    // =========================================
    // FAQ ACCORDION
    // =========================================
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all
            faqItems.forEach(other => {
                other.classList.remove('open');
                const btn = other.querySelector('.faq__question');
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                }
                const answer = other.querySelector('.faq__answer');
                if (answer) {
                    answer.setAttribute('aria-hidden', 'true');
                }
            });

            // Open clicked if not already open
            if (!isOpen) {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
                const answer = item.querySelector('.faq__answer');
                if (answer) {
                    answer.setAttribute('aria-hidden', 'false');
                }
            }
        });
    });


    // =========================================
    // MODALS (Login / Register)
    // =========================================
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // Focus first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function closeAllModals() {
        [loginModal, registerModal].forEach(m => closeModal(m));
    }

    // Open login
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            closeAllModals();
            openModal(loginModal);
        });
    }

    // Open register from multiple triggers
    const registerTriggers = [
        document.getElementById('registerBtn'),
        document.getElementById('heroRegisterBtn'),
        document.getElementById('ctaRegisterBtn'),
        document.getElementById('vipJoinBtn')
    ];
    registerTriggers.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                closeAllModals();
                openModal(registerModal);
            });
        }
    });

    // Switch between modals
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    if (switchToRegister) {
        switchToRegister.addEventListener('click', () => {
            closeModal(loginModal);
            openModal(registerModal);
        });
    }
    if (switchToLogin) {
        switchToLogin.addEventListener('click', () => {
            closeModal(registerModal);
            openModal(loginModal);
        });
    }

    // Close modals on overlay / close button click
    document.querySelectorAll('[data-close-modal]').forEach(el => {
        el.addEventListener('click', closeAllModals);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
            // Also close mobile nav
            if (mainNav && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });


    // =========================================
    // SPORTS TAB SWITCHING
    // =========================================
    const sportTabs = document.querySelectorAll('.sports__tab');
    const betSlips = document.querySelectorAll('.bet-slip');

    sportTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sport = tab.getAttribute('data-sport');

            // Update active tab
            sportTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Show/hide bet slips
            betSlips.forEach(slip => {
                const slipSport = slip.getAttribute('data-sport');
                if (sport === 'all' || slipSport === sport) {
                    slip.style.display = '';
                    slip.style.animation = 'fadeInUp 0.4s ease both';
                } else {
                    slip.style.display = 'none';
                }
            });
        });
    });


    // =========================================
    // CASINO FILTER SWITCHING
    // =========================================
    const casinoFilters = document.querySelectorAll('.casino__filter');
    const casinoCards = document.querySelectorAll('.casino-card');

    casinoFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-filter');

            // Update active filter
            casinoFilters.forEach(f => {
                f.classList.remove('active');
                f.setAttribute('aria-selected', 'false');
            });
            filter.classList.add('active');
            filter.setAttribute('aria-selected', 'true');

            // Filter cards
            casinoCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease both';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // =========================================
    // CASINO CARD FLIP (touch devices)
    // =========================================
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    if (isTouchDevice) {
        casinoCards.forEach(card => {
            card.addEventListener('click', () => {
                // Close others
                casinoCards.forEach(c => {
                    if (c !== card) c.classList.remove('flipped');
                });
                card.classList.toggle('flipped');
            });
        });
    }

    // Keyboard accessibility for casino cards
    casinoCards.forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });


    // =========================================
    // ODDS BUTTON SELECTION
    // =========================================
    document.querySelectorAll('.odds-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chip.classList.toggle('selected');
        });
    });


    // =========================================
    // BACK TO TOP BUTTON
    // =========================================
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        }
    }

    window.addEventListener('scroll', handleBackToTop, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // =========================================
    // PARALLAX EFFECT FOR HERO
    // =========================================
    const heroBgShield = document.querySelector('.hero__bg-shield');
    const heroSection = document.getElementById('hero');

    function handleParallax() {
        if (!heroSection || !heroBgShield) return;
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        if (scrollY < heroHeight) {
            const parallaxY = scrollY * 0.3;
            heroBgShield.style.transform = `translate(-50%, calc(-50% + ${parallaxY}px))`;
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });


    // =========================================
    // 3D TILT EFFECT ON HERO SHIELD
    // =========================================
    const hero3dShield = document.getElementById('hero3dShield');

    if (hero3dShield) {
        const svg = hero3dShield.querySelector('.hero__3d-svg');

        hero3dShield.addEventListener('mousemove', (e) => {
            const rect = hero3dShield.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            if (svg) {
                svg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        hero3dShield.addEventListener('mouseleave', () => {
            if (svg) {
                svg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
    }


    // =========================================
    // CARD 3D TILT ON MOUSE MOVE (bet slips)
    // =========================================
    if (!isTouchDevice) {
        document.querySelectorAll('.bet-slip').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }


    // =========================================
    // INTERSECTION OBSERVER - FADE IN
    // =========================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));


    // =========================================
    // LIVE TICKER - DUPLICATE FOR INFINITE SCROLL
    // =========================================
    const liveTicker = document.getElementById('liveTicker');
    if (liveTicker) {
        const tickerItems = liveTicker.querySelector('.live-ticker__items');
        if (tickerItems) {
            const clone = tickerItems.innerHTML;
            tickerItems.innerHTML = clone + clone;
        }
    }


    // =========================================
    // GOLDEN PARTICLES IN HERO
    // =========================================
    const heroParticles = document.getElementById('heroParticles');

    if (heroParticles) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            const particleCount = 40;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('span');
                particle.classList.add('particle');

                const size = Math.random() * 3 + 1;
                const left = Math.random() * 100;
                const delay = Math.random() * 8;
                const duration = Math.random() * 6 + 6;
                const opacity = Math.random() * 0.5 + 0.2;

                particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${left}%;
                    top: -10px;
                    animation-delay: ${delay}s;
                    animation-duration: ${duration}s;
                    opacity: ${opacity};
                `;

                heroParticles.appendChild(particle);
            }
        }
    }


    // =========================================
    // FORM SUBMISSION PREVENTION (Demo)
    // =========================================
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    function handleFormSubmit(form, modal) {
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span> מעבד...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                submitBtn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> בוצע!';
                submitBtn.style.opacity = '1';

                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    closeModal(modal);
                    form.reset();
                }, 1000);
            }, 1500);
        });
    }

    handleFormSubmit(loginForm, loginModal);
    handleFormSubmit(registerForm, registerModal);


    // =========================================
    // TICKER PAUSE ON HOVER
    // =========================================
    if (liveTicker) {
        const tickerItems = liveTicker.querySelector('.live-ticker__items');
        if (tickerItems) {
            liveTicker.addEventListener('mouseenter', () => {
                tickerItems.style.animationPlayState = 'paused';
            });
            liveTicker.addEventListener('mouseleave', () => {
                tickerItems.style.animationPlayState = 'running';
            });
        }
    }


    // =========================================
    // DYNAMIC YEAR IN FOOTER (future-proof)
    // =========================================
    const copyrightEl = document.querySelector('.footer__copyright');
    if (copyrightEl) {
        const year = new Date().getFullYear();
        copyrightEl.innerHTML = copyrightEl.innerHTML.replace(/\d{4}/, year);
    }

    // =========================================
    // FLOATING WHATSAPP TOGGLE
    // =========================================
    const whatsappToggle = document.getElementById('whatsappToggle');
    const whatsappMenu = document.getElementById('whatsappMenu');
    if (whatsappToggle && whatsappMenu) {
        whatsappToggle.addEventListener('click', () => {
            const isOpen = whatsappMenu.classList.toggle('active');
            whatsappToggle.setAttribute('aria-expanded', isOpen);
            whatsappMenu.setAttribute('aria-hidden', !isOpen);
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.whatsapp-float')) {
                whatsappMenu.classList.remove('active');
                whatsappToggle.setAttribute('aria-expanded', 'false');
                whatsappMenu.setAttribute('aria-hidden', 'true');
            }
        });
    }

});
