/**
 * Navigation Component
 * Injects consistent navigation across all pages
 */

(function() {
    'use strict';
    
    /**
     * Get the current page filename
     */
    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page === '' ? 'index.html' : page;
    }
    
    /**
     * Create the navigation HTML
     */
    function createNavigation() {
        const currentPage = getCurrentPage();
        
        const navHTML = `
            <div class="nav-container">
                <div class="nav-brand">
                    <a href="index.html" class="brand-link">Michaela Tempers</a>
                </div>
                
                <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                </button>
                
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="shows.html" class="nav-link ${currentPage === 'shows.html' ? 'active' : ''}">Shows</a>
                    </li>
                    <li class="nav-item">
                        <a href="press-kit.html" class="nav-link ${currentPage === 'press-kit.html' ? 'active' : ''}">Press Kit</a>
                    </li>
                    <li class="nav-item">
                        <a href="merch.html" class="nav-link ${currentPage === 'merch.html' ? 'active' : ''}">Merch</a>
                    </li>
                </ul>
            </div>
        `;
        
        return navHTML;
    }
    
    /**
     * Initialize navigation
     */
    function initNavigation() {
        const navElement = document.getElementById('main-nav');
        
        if (navElement) {
            navElement.innerHTML = createNavigation();
            
            // Setup mobile menu toggle
            const navToggle = navElement.querySelector('.nav-toggle');
            const navMenu = navElement.querySelector('.nav-menu');
            
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', function() {
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !isExpanded);
                    navMenu.classList.toggle('active');
                    this.classList.toggle('active');
                });
                
                // Close mobile menu when clicking outside
                document.addEventListener('click', function(event) {
                    const isClickInside = navElement.contains(event.target);
                    
                    if (!isClickInside && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Close mobile menu when clicking a link
                const navLinks = navMenu.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                    });
                });
            }
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
})();
