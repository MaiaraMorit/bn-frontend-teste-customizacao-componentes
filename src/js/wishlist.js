/**
 * Wishlist module - handles wishlist operations using LocalStorage
 * @module wishlist
 */

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
    }
}

/**
 * Remove an ID from the wishlist
 * @param {string} id - ID of the product to be removed
 */
function removeFromWishlist(id) {
    const wishlist = getWishlist();
    const index = wishlist.indexOf(id);
    if (index > -1) {
        wishlist.splice(index, 1);
        saveWishlist(wishlist);
    }
}

/**
 * Check if an ID is in the wishlist
 * @param {string} id - ID of the product to be verified
 * @returns {boolean} True if the ID is in the wishlist
 */
function isInWishlist(id) {
    const wishlist = getWishlist();
    return wishlist.includes(id);
}

/**
 * Get the storage key used for wishlist
 * @returns {string} The storage key
 */
function getWishlistStorageKey() {
    return WISHLIST_STORAGE_KEY;
}

// Export for Node.js/Jest testing environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getWishlist,
        saveWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistStorageKey
    };
}

// Make functions available globally for browser use
if (typeof window !== 'undefined') {
    window.WishlistModule = {
        getWishlist,
        saveWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistStorageKey
    };
}

