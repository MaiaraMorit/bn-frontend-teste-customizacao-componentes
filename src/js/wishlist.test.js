const {
    getWishlist,
    saveWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistStorageKey
} = require('./wishlist.js');

describe('Wishlist Module', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('getWishlist', () => {
        test('should return empty array when localStorage is empty', () => {
            expect(getWishlist()).toEqual([]);
        });

        test('should return parsed array from localStorage', () => {
            localStorage.setItem('wishlist', JSON.stringify(['123', '456']));
            expect(getWishlist()).toEqual(['123', '456']);
        });

        test('should return empty array when localStorage has invalid JSON', () => {
            localStorage.setItem('wishlist', 'invalid json');
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            expect(getWishlist()).toEqual([]);
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('saveWishlist', () => {
        test('should save wishlist to localStorage', () => {
            const wishlist = ['123', '456', '789'];
            saveWishlist(wishlist);
            expect(localStorage.getItem('wishlist')).toBe(JSON.stringify(wishlist));
        });

        test('should handle errors when saving to localStorage', () => {
            // Mock localStorage.setItem to throw an error
            const originalSetItem = localStorage.setItem;
            localStorage.setItem = jest.fn(() => {
                throw new Error('Storage quota exceeded');
            });

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            saveWishlist(['123']);
            expect(consoleSpy).toHaveBeenCalled();

            localStorage.setItem = originalSetItem;
            consoleSpy.mockRestore();
        });
    });

    describe('addToWishlist', () => {
        test('should add new ID to empty wishlist', () => {
            addToWishlist('123');
            expect(getWishlist()).toContain('123');
            expect(getWishlist().length).toBe(1);
        });

        test('should add new ID to existing wishlist', () => {
            localStorage.setItem('wishlist', JSON.stringify(['123']));
            addToWishlist('456');
            const wishlist = getWishlist();
            expect(wishlist).toContain('123');
            expect(wishlist).toContain('456');
            expect(wishlist.length).toBe(2);
        });

        test('should not add duplicate ID', () => {
            localStorage.setItem('wishlist', JSON.stringify(['123']));
            addToWishlist('123');
            const wishlist = getWishlist();
            expect(wishlist.filter(id => id === '123').length).toBe(1);
        });
    });

    describe('removeFromWishlist', () => {
        test('should remove ID from wishlist', () => {
            localStorage.setItem('wishlist', JSON.stringify(['123', '456', '789']));
            removeFromWishlist('456');
            const wishlist = getWishlist();
            expect(wishlist).not.toContain('456');
            expect(wishlist).toContain('123');
            expect(wishlist).toContain('789');
            expect(wishlist.length).toBe(2);
        });

        test('should not remove ID that does not exist', () => {
            localStorage.setItem('wishlist', JSON.stringify(['123', '456']));
            removeFromWishlist('789');
            const wishlist = getWishlist();
            expect(wishlist.length).toBe(2);
        });

        test('should handle empty wishlist', () => {
            removeFromWishlist('123');
            expect(getWishlist()).toEqual([]);
        });
    });

    describe('isInWishlist', () => {
        test('should return true when ID is in wishlist', () => {
            localStorage.setItem('wishlist', JSON.stringify(['123', '456']));
            expect(isInWishlist('123')).toBe(true);
            expect(isInWishlist('456')).toBe(true);
        });

        test('should return false when ID is not in wishlist', () => {
            localStorage.setItem('wishlist', JSON.stringify(['123', '456']));
            expect(isInWishlist('789')).toBe(false);
        });

        test('should return false for empty wishlist', () => {
            expect(isInWishlist('123')).toBe(false);
        });
    });

    describe('getWishlistStorageKey', () => {
        test('should return the storage key', () => {
            expect(getWishlistStorageKey()).toBe('wishlist');
        });
    });

    describe('Integration tests', () => {
        test('should handle complete wishlist workflow', () => {
            // Start with empty wishlist
            expect(getWishlist()).toEqual([]);

            // Add items
            addToWishlist('item1');
            addToWishlist('item2');
            addToWishlist('item3');
            expect(getWishlist().length).toBe(3);
            expect(isInWishlist('item1')).toBe(true);
            expect(isInWishlist('item2')).toBe(true);
            expect(isInWishlist('item3')).toBe(true);

            // Remove item
            removeFromWishlist('item2');
            expect(getWishlist().length).toBe(2);
            expect(isInWishlist('item2')).toBe(false);
            expect(isInWishlist('item1')).toBe(true);
            expect(isInWishlist('item3')).toBe(true);

            // Try to add duplicate
            addToWishlist('item1');
            expect(getWishlist().length).toBe(2);

            // Remove all items
            removeFromWishlist('item1');
            removeFromWishlist('item3');
            expect(getWishlist()).toEqual([]);
        });
    });
});

