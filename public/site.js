(function () {
    'use strict';

    var sections = Array.prototype.slice.call(document.querySelectorAll('.section'));
    var fields = Array.prototype.slice.call(document.querySelectorAll('.view-field'));
    var glyphs = Array.prototype.slice.call(document.querySelectorAll('.glyph'));
    var mobile = Array.prototype.slice.call(document.querySelectorAll('.mobile-nav button'));
    var body = document.body;
    var announce = document.getElementById('sr-announce');

    var names = [
        '00 // HERO',
        '01 // SHARED STATE',
        '02 // EVERY SURFACE',
        '03 // ANY SHAPE',
        '04 // HYPERWEAVE',
        '05 // INSTALL'
    ];

    var state = { idx: 0, total: sections.length, wheelLock: false };
    var mq = window.matchMedia('(max-width: 900px)');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var srcOf = {};
    var releaseTimer = 0;
    var scrollSync = 0;
    var navHold = 0;
    var navHoldTimer = 0;

    fields.forEach(function (el) {
        var key = el.getAttribute('data-field');
        srcOf[key] = el.getAttribute('src') || el.getAttribute('data-src');
    });

    function mountField(el) {
        if (!el) return;
        var key = el.getAttribute('data-field');
        if (srcOf[key] && el.getAttribute('src') !== srcOf[key]) el.setAttribute('src', srcOf[key]);
    }

    function showField(index) {
        var ahead = String(index + 1);
        fields.forEach(function (el) {
            var key = el.getAttribute('data-field');
            var on = key === String(index);
            if (on || (mq.matches && key === ahead)) mountField(el);
            el.classList.toggle('is-on', on);
        });
        window.clearTimeout(releaseTimer);
        if (mq.matches) return;
        releaseTimer = window.setTimeout(function () {
            fields.forEach(function (el) {
                if (!el.classList.contains('is-on')) el.removeAttribute('src');
            });
        }, reduce.matches ? 0 : 520);
    }

    function warmFields() {
        Object.keys(srcOf).forEach(function (key) {
            if (key === '0' || !srcOf[key]) return;
            var img = new Image();
            img.decoding = 'async';
            img.src = srcOf[key];
        });
    }

    function setChrome(index) {
        body.dataset.view = String(index);
        showField(index);

        glyphs.forEach(function (btn, i) {
            var on = i === index;
            btn.classList.toggle('is-on', on);
            if (on) btn.setAttribute('aria-current', 'true');
            else btn.removeAttribute('aria-current');
        });

        mobile.forEach(function (btn, i) {
            var on = i === index;
            btn.classList.toggle('is-on', on);
            if (on) btn.setAttribute('aria-current', 'true');
            else btn.removeAttribute('aria-current');
        });

        if (announce) {
            announce.textContent = 'Section ' + (index + 1) + ': ' + names[index];
        }
    }

    function navigateTo(index, fromWheel) {
        if (index === state.idx) return;
        if (index < 0 || index >= state.total) return;
        if (fromWheel && state.wheelLock) return;

        if (mq.matches) {
            holdNav();
            if (sections[index]) {
                sections[index].scrollIntoView({
                    behavior: reduce.matches ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
            setChrome(index);
            state.idx = index;
            return;
        }

        sections[state.idx].classList.remove('is-on');
        sections[index].classList.add('is-on');
        setChrome(index);
        state.idx = index;

        if (fromWheel) {
            state.wheelLock = true;
            window.setTimeout(function () { state.wheelLock = false; }, reduce.matches ? 0 : 460);
        }
    }

    function changeSection(dir, fromWheel) {
        navigateTo(state.idx + dir, fromWheel);
    }

    document.querySelectorAll('[data-index]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            navigateTo(parseInt(btn.getAttribute('data-index'), 10));
        });
    });

    document.querySelectorAll('[data-dir]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            changeSection(parseInt(btn.getAttribute('data-dir'), 10));
        });
    });

    document.querySelectorAll('[data-go]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo(parseInt(el.getAttribute('data-go'), 10));
        });
    });

    window.addEventListener('keydown', function (e) {
        var t = e.target;
        var interactive = t && t.closest && t.closest('a, button, input, textarea, select, [contenteditable="true"]');
        if (e.key === ' ' && interactive) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            changeSection(1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            changeSection(-1);
        } else if (e.key === 'Home') {
            e.preventDefault();
            navigateTo(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            navigateTo(state.total - 1);
        }
    });

    var wheelAccum = 0;
    var wheelTimer = null;
    var THRESHOLD = 110;

    window.addEventListener('wheel', function (e) {
        if (mq.matches || state.wheelLock) return;
        var delta = e.deltaMode === 1 ? e.deltaY * 28 : e.deltaY;
        wheelAccum += delta;
        window.clearTimeout(wheelTimer);
        wheelTimer = window.setTimeout(function () { wheelAccum = 0; }, 160);
        if (wheelAccum > THRESHOLD) {
            changeSection(1, true);
            wheelAccum = 0;
        } else if (wheelAccum < -THRESHOLD) {
            changeSection(-1, true);
            wheelAccum = 0;
        }
    }, { passive: true });

    var touchY = 0;
    var touchX = 0;
    window.addEventListener('touchstart', function (e) {
        if (e.touches.length) {
            touchY = e.touches[0].clientY;
            touchX = e.touches[0].clientX;
        }
    }, { passive: true });
    window.addEventListener('touchend', function (e) {
        if (!e.changedTouches.length) return;
        var dy = touchY - e.changedTouches[0].clientY;
        var dx = touchX - e.changedTouches[0].clientX;
        var swipe = Math.abs(dy) > 52 && Math.abs(dy) > Math.abs(dx) * 1.4;
        if (mq.matches) return;
        if (swipe) {
            changeSection(dy > 0 ? 1 : -1);
        }
    }, { passive: true });

    function holdNav() {
        navHold = 1;
        window.clearTimeout(navHoldTimer);
        navHoldTimer = window.setTimeout(releaseNav, 900);
    }

    function releaseNav() {
        navHold = 0;
        syncChromeFromScroll();
    }

    function bumpNavHold() {
        if (!navHold) return;
        window.clearTimeout(navHoldTimer);
        navHoldTimer = window.setTimeout(releaseNav, 180);
    }

    function syncChromeFromScroll() {
        if (!mq.matches || navHold) return;
        var h = window.innerHeight || document.documentElement.clientHeight || 1;
        var line = h * 0.72;
        var slack = 64;
        var idx = state.idx;
        var steps = 0;
        while (steps++ < sections.length && idx < sections.length - 1 &&
            sections[idx + 1].getBoundingClientRect().top <= line) {
            idx++;
        }
        steps = 0;
        while (steps++ < sections.length && idx > 0 &&
            sections[idx].getBoundingClientRect().top > line + slack) {
            idx--;
        }
        if (idx !== state.idx) {
            setChrome(idx);
            state.idx = idx;
        }
    }

    function queueScrollSync() {
        if (scrollSync) return;
        scrollSync = window.requestAnimationFrame(function () {
            scrollSync = 0;
            syncChromeFromScroll();
        });
    }

    function onViewportScroll() {
        if (!mq.matches) return;
        if (navHold) {
            bumpNavHold();
            return;
        }
        queueScrollSync();
    }

    window.addEventListener('scroll', onViewportScroll, { passive: true });
    window.addEventListener('touchmove', onViewportScroll, { passive: true });
    window.addEventListener('resize', queueScrollSync);
    if (mq.addEventListener) mq.addEventListener('change', queueScrollSync);

    function copyNow(text) {
        var area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0';
        document.body.appendChild(area);
        area.focus();
        area.select();
        area.setSelectionRange(0, text.length);
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
        document.body.removeChild(area);
        return ok;
    }

    document.querySelectorAll('[data-copy]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var text = btn.getAttribute('data-copy');
            var shown = false;
            function show() {
                if (shown) return;
                shown = true;
                btn.classList.add('is-copied');
                btn.setAttribute('aria-label', 'Copied!');
                window.clearTimeout(btn._copyTimer);
                btn._copyTimer = window.setTimeout(function () {
                    btn.classList.remove('is-copied');
                    btn.setAttribute('aria-label', 'Copy command');
                }, 2000);
            }
            var legacyOk = copyNow(text);
            if (legacyOk) show();
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(show).catch(function () {});
            }
        });
    });

    setChrome(0);
    queueScrollSync();
    if ('requestIdleCallback' in window) window.requestIdleCallback(warmFields);
    else window.setTimeout(warmFields, 400);
})();
