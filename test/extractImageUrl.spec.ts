import { extractImageUrlFromBackground } from "../src/utils/extractImageUrl"

describe('extractImageUrlFromBackground', () => {
    it('returns the image URL from background property', () => {
        const background = 'url("https://example.com/image.jpg") center center / cover no-repeat';
        const imageUrl = extractImageUrlFromBackground(background);
        expect(imageUrl).toEqual('https://example.com/image.jpg');
    });

    it('returns undefined if there is no image URL in background property', () => {
        const background = 'linear-gradient(45deg, #FFC107, #FF9800)';
        const imageUrl = extractImageUrlFromBackground(background);
        expect(imageUrl).toBeNull();
    });

    it('handles single quotes in url()', () => {
        const background = "url('https://example.com/image.jpg') center center / cover no-repeat";
        const imageUrl = extractImageUrlFromBackground(background);
        expect(imageUrl).toEqual('https://example.com/image.jpg');
    });

    it('handles missing quotes in url()', () => {
        const background = 'url(https://example.com/image.jpg) center center / cover no-repeat';
        const imageUrl = extractImageUrlFromBackground(background);
        expect(imageUrl).toEqual('https://example.com/image.jpg');
    });
});
