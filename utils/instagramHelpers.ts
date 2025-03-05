/**
 * Helper functions for Instagram embedding
 */

/**
 * Extracts the Instagram post ID from a URL
 * @param url Instagram post URL
 * @returns The post ID or null if not found
 */
export function extractInstagramPostId(url: string): string | null {
  // Extract Instagram post ID from URL
  // Instagram URLs format: https://www.instagram.com/p/POST_ID/ or https://instagram.com/p/POST_ID/
  const match = url.match(/instagram\.com\/p\/([^\/]+)/);
  return match ? match[1] : null;
}

/**
 * Check if URL is a valid Instagram post URL
 * @param url The URL to check
 * @returns true if the URL is a valid Instagram post URL
 */
export const isValidInstagramUrl = (url: string): boolean => {
  if (!url) return false;
  return url.includes('instagram.com/p/') && !!extractInstagramPostId(url);
};

/**
 * Generate the HTML for an Instagram embed
 * @param postId Instagram post ID
 * @returns HTML string for embedding the Instagram post
 */
export const generateInstagramEmbed = (postId: string): string => {
  if (!postId) return '';
  return `<iframe 
    src="https://www.instagram.com/p/${postId}/embed/captioned/" 
    width="100%" 
    height="100%" 
    style="border:0" 
    scrolling="no" 
    allowtransparency="true"></iframe>`;
};