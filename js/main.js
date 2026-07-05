/* ==========================================================
   LAJED INTERIORS — main.js
   FIX LOG (this revision):
   1) Mega-menu race condition on touch devices: tapping a link
      fires a synthetic `mouseenter`/`focusin` just before `click`.
      The old code opened the panel on hover/focus AND toggled it
      on click, so a tap opened it (via mouseenter) and then the
      click handler immediately read "already open" and closed it
      again — the sub-menu flashed and vanished. Hover/focus based
      opening is now gated to desktop widths only; mobile is
      driven exclusively by the explicit click toggle.
   2) Top bar / navbar overlap on mobile: the navbar used a
      hardcoded --topbar-h-mobile (56px) offset, but the top bar
      wraps onto more lines than that on narrow screens, so the
      navbar sat on top of it. We now measure the real top bar
      height on load/resize and write it into --topbar-h, which
      the navbar always reads from (see style.css).
   3) Closing the mobile nav drawer (via the toggle button, a
      plain link, or an outside click) now also closes any open
      mega submenus, so re-opening the drawer starts clean.
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    /* ---------- Keep the navbar's top offset in sync with the
       top bar's real (possibly multi-line) height ---------- */
    var topBarEl = document.querySelector('.top-bar');
    function syncTopBarHeight() {
        if (!topBarEl) return;
        var h = Math.ceil(topBarEl.getBoundingClientRect().height);
        document.documentElement.style.setProperty('--topbar-h', h + 'px');
    }
    syncTopBarHeight();
    window.addEventListener('load', syncTopBarHeight);
    window.addEventListener('resize', syncTopBarHeight);
    // top bar content can reflow shortly after fonts load
    setTimeout(syncTopBarHeight, 300);
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(syncTopBarHeight);
    }

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
    var ddItems = document.querySelectorAll('.has-dd');

    function isDesktopNav() {
        return window.innerWidth > 992;
    }

    function closeAllMegas() {
        ddItems.forEach(function (el) {
            el.classList.remove('open');
        });
    }

    function closeMobileNav() {
        if (!navLinks || !navToggle) return;
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        closeAllMegas();
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (!isOpen) closeAllMegas();
        });

        // Close mobile nav on a plain (non-dropdown-trigger) link click
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                var parentLi = link.parentElement;
                var isDropdownTrigger = parentLi && parentLi.classList.contains('has-dd');
                // Dropdown triggers are handled by the mega-menu click
                // handler below (they toggle the panel instead of
                // navigating on mobile). Real destination links close
                // the whole drawer.
                if (!isDesktopNav() && isDropdownTrigger) return;
                closeMobileNav();
            });
        });

        // Close the drawer if the user taps outside of it
        document.addEventListener('click', function (e) {
            if (!navLinks.classList.contains('open')) return;
            if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
            closeMobileNav();
        });
    }

    /* ---------- Mega menu: hoverable on desktop, tap-toggle on mobile ----------
       Desktop (>992px): opens on hover/focus with a short close-delay
       grace period so moving the pointer from the trigger into the
       panel doesn't close it prematurely.
       Mobile (<=992px): hover/focus listeners are inert (guarded by
       isDesktopNav()) and the trigger's click handler does a plain,
       predictable open/close toggle — no competing state changes.
    ---------------------------------------------------------------- */
    var CLOSE_DELAY = 300; // ms grace period before a desktop mega menu closes

    ddItems.forEach(function (item) {
        var mega = item.querySelector('.mega');
        var trigger = item.querySelector(':scope > a');
        if (!mega || !trigger) return;

        var closeTimer = null;

        function openMenu() {
            if (!isDesktopNav()) return;
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            item.classList.add('open');
        }

        function scheduleClose() {
            if (!isDesktopNav()) return;
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

        // Keyboard accessibility (desktop only — on mobile the tap
        // handler below owns opening/closing so focus doesn't race it)
        item.addEventListener('focusin', openMenu);
        item.addEventListener('focusout', function (e) {
            if (!isDesktopNav()) return;
            if (item.contains(e.relatedTarget)) return;
            scheduleClose();
        });

        // Mobile / touch: tap the trigger link to toggle the panel
        // instead of navigating. This is the single source of truth
        // for open/close state on mobile — nothing else mutates the
        // 'open' class at these widths.
        trigger.addEventListener('click', function (e) {
            if (!isDesktopNav()) {
                e.preventDefault();
                e.stopPropagation();
                var willOpen = !item.classList.contains('open');
                closeAllMegas();
                if (willOpen) item.classList.add('open');
            }
        });
    });

    // If the viewport crosses into desktop width with menus open
    // (e.g. rotating a tablet, or resizing a browser window), reset
    // everything so neither mode inherits stale state from the other.
    window.addEventListener('resize', function () {
        if (isDesktopNav()) {
            closeAllMegas();
            closeMobileNav();
        }
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