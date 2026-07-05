/* ==========================================================
   LAJED INTERIORS — main.js
   Rewritten: fixes an invalid `querySelector('> a')` call that
   threw a DOMException and stopped every line of code after it
   from ever running (mega menu setup used to sit in the middle
   of the file, which is why sections below it, like Services,
   Why Choose Us, Featured Projects and Testimonials, never
   received their `.in` reveal class and stayed invisible).
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    /* ---------- Sticky top bar + navbar ---------- */
    var navbar = document.querySelector('.navbar');
    var toTop = document.querySelector('.to-top');

    function onScroll() {
        if (window.scrollY > 60) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
        if (toTop) {
            if (window.scrollY > 700) {
                toTop.classList.add('show');
            } else {
                toTop.classList.remove('show');
            }
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile nav toggle ---------- */
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile nav on plain link click (but not on dropdown parent links)
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 992 && link.closest('.has-dd') && !link.parentElement.classList.contains('has-dd')) {
                    // links inside an open mega menu: close everything after navigating
                }
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Mega menu: hoverable, focusable, click-safe ----------
       Fix: the previous version used `item.querySelector('> a')`, an
       invalid selector without a `:scope` prefix, which throws and
       aborts the whole script. It's replaced below with a safe,
       tree-order-based lookup. The open/close state is now driven by
       a small delay timer so moving the mouse from the trigger link
       down into the panel (or tabbing through it with a keyboard)
       never causes it to disappear before you can click a link.
    ---------------------------------------------------------------- */
    var ddItems = document.querySelectorAll('.has-dd');
    var CLOSE_DELAY = 300; // ms grace period before a mega menu closes

    ddItems.forEach(function (item) {
        var mega = item.querySelector('.mega');
        var trigger = item.querySelector('a'); // first <a> in DOM order = the trigger link
        if (!mega || !trigger) return;

        var closeTimer = null;

        function openMenu() {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            item.classList.add('open');
        }

        function scheduleClose() {
            if (closeTimer) clearTimeout(closeTimer);
            closeTimer = setTimeout(function () {
                item.classList.remove('open');
            }, CLOSE_DELAY);
        }

        // Desktop: hover the trigger OR the panel keeps it open
        item.addEventListener('mouseenter', openMenu);
        item.addEventListener('mouseleave', scheduleClose);
        mega.addEventListener('mouseenter', openMenu);
        mega.addEventListener('mouseleave', scheduleClose);

        // Keyboard accessibility: opening on focus, closing when focus fully leaves
        item.addEventListener('focusin', openMenu);
        item.addEventListener('focusout', function (e) {
            // if the newly focused element is still inside this item, keep it open
            if (item.contains(e.relatedTarget)) return;
            scheduleClose();
        });

        // Mobile / touch: tap the trigger link to toggle the panel instead of navigating
        trigger.addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                var willOpen = !item.classList.contains('open');
                ddItems.forEach(function (other) {
                    other.classList.remove('open');
                });
                if (willOpen) item.classList.add('open');
            }
        });
    });

    /* ---------- Hero carousel: auto-rotating, animated slides,
       each with its own headline and paragraph swapped in sync ---------- */
    var heroSlides = document.querySelectorAll('.hero-slide');
    var heroHeadline = document.querySelector('.hero-headline');
    var heroSub = document.querySelector('.hero-sub');

    function paintHeroText(slide) {
        if (!slide) return;
        var headline = slide.getAttribute('data-headline');
        var sub = slide.getAttribute('data-sub');
        if (heroHeadline && headline) heroHeadline.innerHTML = headline;
        if (heroSub && sub) heroSub.textContent = sub;
    }

    if (heroSlides.length) {
        var heroIndex = 0;
        var HERO_INTERVAL = 6000;
        var TEXT_FADE = 450;

        function showHeroSlide(nextIndex) {
            heroSlides[heroIndex].classList.remove('is-active');
            heroSlides[heroIndex].classList.add('is-prev');
            setTimeout(function (finishedIndex) {
                heroSlides[finishedIndex].classList.remove('is-prev');
            }, 1400, heroIndex);

            heroIndex = nextIndex;
            heroSlides[heroIndex].classList.add('is-active');

            if (heroHeadline && heroSub) {
                heroHeadline.style.transition = 'opacity ' + TEXT_FADE + 'ms ease';
                heroSub.style.transition = 'opacity ' + TEXT_FADE + 'ms ease';
                heroHeadline.style.opacity = '0';
                heroSub.style.opacity = '0';
                setTimeout(function () {
                    paintHeroText(heroSlides[heroIndex]);
                    heroHeadline.style.opacity = '1';
                    heroSub.style.opacity = '1';
                }, TEXT_FADE);
            }
        }

        setInterval(function () {
            var next = (heroIndex + 1) % heroSlides.length;
            showHeroSlide(next);
        }, HERO_INTERVAL);
    }

    /* ---------- Scroll reveal ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        );
        revealEls.forEach(function (el) {
            io.observe(el);
        });
    } else {
        // No IntersectionObserver support: show everything immediately
        revealEls.forEach(function (el) {
            el.classList.add('in');
        });
    }

    /* ---------- Animated counters ---------- */
    var counters = document.querySelectorAll('.num[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
        var counterIO = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
                    var suffix = el.getAttribute('data-suffix') || '';
                    var duration = 1400;
                    var start = null;

                    function step(ts) {
                        if (!start) start = ts;
                        var progress = Math.min((ts - start) / duration, 1);
                        var current = Math.floor(progress * target);
                        el.textContent = current + suffix;
                        if (progress < 1) requestAnimationFrame(step);
                        else el.textContent = target + suffix;
                    }
                    requestAnimationFrame(step);
                    counterIO.unobserve(el);
                });
            },
            { threshold: 0.5 }
        );
        counters.forEach(function (el) {
            counterIO.observe(el);
        });
    }

    /* ---------- Wavy auto scrolling carousel ---------- */
    var track = document.querySelector('.wave-track');
    if (track && track.children.length) {
        var cards = Array.from(track.children);
        // duplicate cards for a seamless loop
        cards.forEach(function (c) {
            track.appendChild(c.cloneNode(true));
        });
        var allCards = Array.from(track.children);

        var pos = 0;
        var speed = 0.4;
        var paused = false;
        var t = 0;

        track.addEventListener('mouseenter', function () {
            paused = true;
        });
        track.addEventListener('mouseleave', function () {
            paused = false;
        });

        function animateWave() {
            if (!paused) {
                pos -= speed;
                var loopWidth = track.scrollWidth / 2;
                if (Math.abs(pos) >= loopWidth) pos = 0;
                t += 0.02;
            }
            allCards.forEach(function (card, i) {
                var wave = Math.sin(t + i * 0.6) * 14;
                var scale = 1 + Math.sin(t + i * 0.6) * 0.02;
                card.style.transform = 'translateY(' + wave + 'px) scale(' + scale + ')';
            });
            track.style.transform = 'translateX(' + pos + 'px)';
            requestAnimationFrame(animateWave);
        }
        requestAnimationFrame(animateWave);
    }

    /* ---------- Testimonials slider ---------- */
    var slides = document.querySelectorAll('.t-slide');
    var dotsWrap = document.querySelector('.t-dots');
    var activeIdx = 0;
    if (slides.length && dotsWrap) {
        slides.forEach(function (s, i) {
            var dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function () {
                showSlide(i);
            });
            dotsWrap.appendChild(dot);
        });
        var dots = dotsWrap.querySelectorAll('button');

        function showSlide(idx) {
            slides[activeIdx].classList.remove('active');
            dots[activeIdx].classList.remove('active');
            activeIdx = idx;
            slides[activeIdx].classList.add('active');
            dots[activeIdx].classList.add('active');
        }

        setInterval(function () {
            showSlide((activeIdx + 1) % slides.length);
        }, 5500);
    }

    /* ---------- Floating contact dock ---------- */
    var dock = document.querySelector('.dock');
    var dockToggle = document.querySelector('.dock-toggle');
    if (dock && dockToggle) {
        dockToggle.setAttribute('aria-expanded', 'false');
        dockToggle.addEventListener('click', function () {
            var isOpen = dock.classList.toggle('open');
            dockToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close the dock if the user clicks anywhere outside of it
        document.addEventListener('click', function (e) {
            if (dock.classList.contains('open') && !dock.contains(e.target)) {
                dock.classList.remove('open');
                dockToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ---------- Back to top ---------- */
    if (toTop) {
        toTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- Newsletter (front end only placeholder) ---------- */
    var newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = newsletterForm.querySelector('input');
            if (input) {
                input.value = '';
                input.placeholder = 'Thank you, you are subscribed';
            }
        });
    }
});