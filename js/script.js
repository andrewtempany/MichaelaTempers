/**
 * Main JavaScript Functions
 * Includes Google Sheets integration, utilities, and app initialization
 */

(function() {
    'use strict';
    
    /**
     * Format date string to readable format
     * @param {string} dateString - ISO date string (YYYY-MM-DD)
     * @returns {string} Formatted date (e.g., "Saturday, February 15, 2026")
     */
    function formatDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-NZ', options);
    }
    
    /**
     * Check if a date is in the past
     * @param {string} dateString - ISO date string (YYYY-MM-DD)
     * @returns {boolean}
     */
    function isPastDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    }
    
    /**
     * Show loading state
     */
    function showLoadingState() {
        const loadingElement = document.getElementById('loading-state');
        if (loadingElement) {
            loadingElement.style.display = 'block';
        }
    }
    
    /**
     * Hide loading state
     */
    function hideLoadingState() {
        const loadingElement = document.getElementById('loading-state');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
    
    /**
     * Show error state
     */
    function showErrorState() {
        hideLoadingState();
        const errorElement = document.getElementById('error-state');
        if (errorElement) {
            errorElement.style.display = 'block';
        }
    }
    
    /**
     * Show empty state
     */
    function showEmptyState() {
        hideLoadingState();
        const emptyElement = document.getElementById('empty-state');
        if (emptyElement) {
            emptyElement.style.display = 'block';
        }
    }
    
    /**
     * Create a show card element
     * @param {Object} show - Show data object
     * @returns {string} HTML string for show card
     */
    function createShowCard(show) {
        const formattedDate = formatDate(show.date);
        const status = show.status || 'On Sale';
        const ticketLink = show.ticketLink || '';
        
        let buttonHTML = '';
        if (status.toLowerCase() === 'sold out') {
            buttonHTML = '<button class="button button-disabled" disabled>Sold Out</button>';
        } else if (status.toLowerCase() === 'tba' || !ticketLink) {
            buttonHTML = '<button class="button button-disabled" disabled>Tickets TBA</button>';
        } else {
            buttonHTML = `<a href="${ticketLink}" class="button" target="_blank" rel="noopener noreferrer">Get Tickets</a>`;
        }
        
        return `
            <div class="show-card">
                <div class="show-date">
                    <div class="show-date-day">${new Date(show.date + 'T00:00:00').getDate()}</div>
                    <div class="show-date-month">${new Date(show.date + 'T00:00:00').toLocaleDateString('en-NZ', { month: 'short' })}</div>
                </div>
                <div class="show-details">
                    <h3 class="show-venue">${show.venue}</h3>
                    <p class="show-location">${show.city}</p>
                    <p class="show-full-date">${formattedDate}</p>
                </div>
                <div class="show-actions">
                    ${buttonHTML}
                </div>
            </div>
        `;
    }
    
    /**
     * Fetch and display shows from Google Sheets
     * @param {string} sheetId - Google Sheet ID
     */
    function fetchShowsFromGoogleSheets(sheetId) {
        // If no sheet ID provided or placeholder, show empty state
        if (!sheetId || sheetId === 'YOUR_SHEET_ID') {
            console.warn('Google Sheets ID not configured. Using empty state.');
            showEmptyState();
            return;
        }
        
        showLoadingState();
        
        // Construct the Google Sheets CSV export URL
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch shows data');
                }
                return response.text();
            })
            .then(csvText => {
                const shows = parseCSV(csvText);
                const upcomingShows = shows
                    .filter(show => !isPastDate(show.date))
                    .sort((a, b) => new Date(a.date) - new Date(b.date));
                
                hideLoadingState();
                
                if (upcomingShows.length === 0) {
                    showEmptyState();
                } else {
                    displayShows(upcomingShows);
                }
            })
            .catch(error => {
                console.error('Error fetching shows:', error);
                showErrorState();
            });
    }
    
    /**
     * Parse CSV text into array of show objects
     * @param {string} csvText - CSV formatted text
     * @returns {Array} Array of show objects
     */
    function parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const shows = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            
            const values = lines[i].split(',').map(v => v.trim());
            const show = {};
            
            headers.forEach((header, index) => {
                // Map common header variations
                if (header === 'date') show.date = values[index];
                else if (header === 'venue') show.venue = values[index];
                else if (header === 'city') show.city = values[index];
                else if (header === 'ticketlink') show.ticketLink = values[index];
                else if (header === 'status') show.status = values[index];
            });
            
            // Only add if we have required fields
            if (show.date && show.venue && show.city) {
                shows.push(show);
            }
        }
        
        return shows;
    }
    
    /**
     * Display shows in the shows container
     * @param {Array} shows - Array of show objects
     */
    function displayShows(shows) {
        const container = document.getElementById('shows-container');
        if (!container) return;
        
        container.innerHTML = shows.map(show => createShowCard(show)).join('');
        container.style.display = 'grid';
    }
    
    /**
     * Handle external links (open in new tab)
     */
    function handleExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }
    
    /**
     * Initialize the app
     */
    function initializeApp() {
        handleExternalLinks();
    }
    
    // Make functions available globally
    window.fetchShowsFromGoogleSheets = fetchShowsFromGoogleSheets;
    window.formatDate = formatDate;
    window.initializeApp = initializeApp;
    
    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
})();
