/**
 * ==========================================================================
 * PREMIUM INTERACTIONS & UX CONTROLLER
 * Ensures high-performance scrolling, accessible navigation, and smooth state management.
 * ==========================================================================
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. DOM ELEMENT CACHING
    // ==========================================================================
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.header .navbar');
    const menuBtn = document.querySelector('#menu-btn');
    const navClose = document.querySelector('#nav-close');
    
    const searchBtn = document.getElementById('search-btn');
    const closeSearch = document.getElementById('close-search');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('search-box');
    
    const ctaTop = document.querySelector('#ctaTop');

    // ==========================================================================
    // 2. NAVIGATION & MOBILE MENU CONTROL
    // ==========================================================================
    const toggleMenu = (isActive) => {
        if (!navbar) return;
        if (isActive) {
            navbar.classList.add('active');
            document.body.style.overflow = 'hidden'; // Premium UX: Prevents background scrolling
        } else {
            navbar.classList.remove('active');
            document.body.style.overflow = ''; // Restores background scrolling
        }
    };

    if (menuBtn) menuBtn.addEventListener('click', () => toggleMenu(true));
    if (navClose) navClose.addEventListener('click', () => toggleMenu(false));

    // Automatically close mobile menu when a navigation link is clicked
    if (navbar) {
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // ==========================================================================
    // 3. ENHANCED SEARCH OVERLAY (ACCESSIBLE & KEYBOARD FRIENDLY)
    // ==========================================================================
    const toggleSearch = (isActive) => {
        if (!searchForm) return;
        if (isActive) {
            searchForm.classList.add('active');
            document.body.style.overflow = 'hidden'; 
            // Premium UX: Automatically focus the input field after transition
            if (searchInput) setTimeout(() => searchInput.focus(), 150); 
        } else {
            searchForm.classList.remove('active');
            document.body.style.overflow = ''; 
            if (searchInput) searchInput.blur();
        }
    };

    if (searchBtn) searchBtn.addEventListener('click', () => toggleSearch(true));
    if (closeSearch) closeSearch.addEventListener('click', () => toggleSearch(false));

    // Premium UX: Global 'Escape' Key Listener to close overlays
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (searchForm && searchForm.classList.contains('active')) toggleSearch(false);
            if (navbar && navbar.classList.contains('active')) toggleMenu(false);
        }
    });

    // ==========================================================================
    // 4. STICKY HEADER & SCROLL MANAGEMENT (HIGH PERFORMANCE)
    // ==========================================================================
    
    // Throttle helper: Limits execution for peak scroll performance
    const throttle = (fn, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };

    const handleScrollEffects = () => {
        const currentScroll = window.scrollY;

        // Premium Sticky Header state transition
        if (header) {
            if (currentScroll > 20) {
                header.classList.add('active');
            } else {
                header.classList.remove('active');
            }
        }

        // Back-to-top CTA visibility with fade
        if (ctaTop) {
            if (currentScroll > 400) {
                ctaTop.classList.add('show');
            } else {
                ctaTop.classList.remove('show');
            }
        }
    };

    // Listeners using the throttle configuration + passive true for buttery smooth scrolling
    window.addEventListener('scroll', throttle(handleScrollEffects, 50), { passive: true });
    
    // Initial check on load in case the user refreshes halfway down the page
    handleScrollEffects();

    // ==========================================================================
    // 5. SMOOTH BACK-TO-TOP EXECUTION
    // ==========================================================================
    if (ctaTop) {
        ctaTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});