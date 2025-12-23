document.addEventListener('DOMContentLoaded', function () {
    console.log('Main.js loaded');

    const WISHLIST_STORAGE_KEY = 'wishlist';

    /**
     * Get wishlist from LocalStorage
     * @returns {Array<string>} Array of IDs of the wishlist
     */
    function getWishlist() {
        const wishlistJson = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (wishlistJson) {
            try {
                return JSON.parse(wishlistJson);
            } catch (err) {
                console.error('Error parsing wishlist from LocalStorage:', err);
                return [];
            }
        }
        return [];
    }

    /**
     * Save wishlist to LocalStorage
     * @param {Array<string>} wishlist - Array of IDs of the wishlist
     */
    function saveWishlist(wishlist) {
        try {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
        } catch (err) {
            console.error('Error saving wishlist to LocalStorage:', err);
        }
    }

    /**
     * Add an ID to the wishlist
     * @param {string} id - ID of the product to be added
     */
    function addToWishlist(id) {
        const wishlist = getWishlist();
        if (!wishlist.includes(id)) {
            wishlist.push(id);
            saveWishlist(wishlist);
            // console.log(`ID ${id} added to wishlist. Current wishlist:`, wishlist);
        }
    }

    /**
     * Remove um ID da wishlist
     * @param {string} id - ID of the product to be removed
     */
    function removeFromWishlist(id) {
        const wishlist = getWishlist();
        const index = wishlist.indexOf(id);
        if (index > -1) {
            wishlist.splice(index, 1);
            saveWishlist(wishlist);
            // console.log(`ID ${id} removed from wishlist. Current wishlist:`, wishlist);
        }
    }

    /**
     * Verifica se um ID está na wishlist
     * @param {string} id - ID of the product to be verified
     * @returns {boolean} True if the ID is in the wishlist
     */
    function isInWishlist(id) {
        const wishlist = getWishlist();
        return wishlist.includes(id);
    }

    /**
     * Apply or remove the is-active-wishlist class based on the state of the wishlist
     * @param {HTMLElement} button - Wishlist button
     * @param {string} id - ID of the product
     */
    function updateButtonState(button, id) {
        if (isInWishlist(id)) {
            button.classList.add('is-active-wishlist');
        } else {
            button.classList.remove('is-active-wishlist');
        }
    }

    /**
     * Get wishlist ID from the detail-favoritos element in the same item
     * @param {HTMLElement} button - Wishlist button
     * @returns {string|null} The wishlist ID or null if not found
     */
    function getWishlistIdFromItem(button) {
        // Find the parent item container
        const item = button.closest('.beon-showcase__item');
        if (!item) {
            return null;
        }
        
        // Find the detail-favoritos element within the same item
        const favoritosElement = item.querySelector('.detail-favoritos');
        if (!favoritosElement) {
            return null;
        }
        
        // Get the ID from data-value attribute
        return favoritosElement.getAttribute('data-value');
    }

    /**
     * Initialize all wishlist buttons on the page
     */
    function initializeWishlistButtons() {
        const wishlistButtons = document.querySelectorAll('.beon-showcase__wishlist-icon[data-wishlist-id]');
        const wishlist = getWishlist();

        wishlistButtons.forEach((button, index) => {
            const id = button.getAttribute('data-wishlist-id');
            
            if (id) {
                // Apply the initial state based on the LocalStorage
                updateButtonState(button, id);
                
                if (isInWishlist(id)) {
                    console.log(`Button ${index + 1} (ID: ${id})  already in wishlist - applying is-active-wishlist class`);
                }

                // Add the event listener for the click (using once: false to allow multiple clicks)
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    // Get ID from detail-favoritos element (used only for LocalStorage logic)
                    const wishlistId = getWishlistIdFromItem(this);
                    
                    if (!wishlistId) {
                        console.error('does not have a data-wishlist-id');
                        return;
                    }
                    
                    if (isInWishlist(wishlistId)) {
                        removeFromWishlist(wishlistId);
                        this.classList.remove('is-active-wishlist');
                    } else {
                        addToWishlist(wishlistId);
                        this.classList.add('is-active-wishlist');
                    }
                });
            } else {
                console.warn(`Button ${index + 1} does not have a data-wishlist-id`);
            }
        });
    }

    initializeWishlistButtons();
    
    /**
     * Initialize product ratings with stars
     */
    function initializeProductRatings() {
        const ratingElements = document.querySelectorAll('.detail-notaMedia.details-bind');
        
        ratingElements.forEach((mediaRatingElement) => {
            // Find the details container
            const detailsContainer = mediaRatingElement.closest('.beon-showcase__item-details');
            if (!detailsContainer) return;
            
            // Check if rating already exists to avoid duplicates
            if (detailsContainer.querySelector('.product-rating')) return;
            
            // Get the media rating
            const mediaRating = parseFloat(mediaRatingElement.getAttribute('data-value')) || 0;
            
            // Find the reviews count element
            const reviewsCountElement = detailsContainer.querySelector('.detail-qtdAvaliacoes');
            const reviewsCountLink = reviewsCountElement ? reviewsCountElement.querySelector('a') : null;
            const reviewsCount = reviewsCountLink ? reviewsCountLink.textContent.trim() : '';
            
            // Hide the original reviews count element to avoid duplication
            if (reviewsCountElement) {
                reviewsCountElement.style.display = 'none';
            }
            
            // Create rating container
            const ratingContainer = document.createElement('div');
            ratingContainer.className = 'product-rating';
            
            // create stars container
            const starsContainer = document.createElement('div');
            starsContainer.className = 'stars-container';
            
            // Generate 5 stars based on the rating
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('span');
                star.className = 'star';
                
                if (mediaRating >= i) {
                    star.classList.add('filled');
                } else if (mediaRating >= i - 0.5) {
                    star.classList.add('half');
                }
                
                starsContainer.appendChild(star);
            }
            
            ratingContainer.appendChild(starsContainer);
            
            if (reviewsCount) {
                const ratingCount = document.createElement('span');
                ratingCount.className = 'rating-count';
                ratingCount.textContent = reviewsCount;
                ratingContainer.appendChild(ratingCount);
            }
            
            if (detailsContainer.firstChild) {
                detailsContainer.insertBefore(ratingContainer, detailsContainer.firstChild);
            } else {
                detailsContainer.appendChild(ratingContainer);
            }
        });
    }
    
    initializeProductRatings();
});
