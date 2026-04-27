
/**
 * Utility to fetch data with local storage caching for offline support.
 * @param {string} url - The URL to fetch data from.
 * @param {string} cacheKey - The key to use for local storage caching.
 * @returns {Promise<any>} - The data from the server or cache.
 */
export const fetchWithCache = async (url, cacheKey) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Save to cache if it's an array or a valid object
    if (data) {
      localStorage.setItem(cacheKey, JSON.stringify(data));
    }
    
    return data;
  } catch (error) {
    console.warn(`Fetch failed for ${url}, attempting to load from cache:`, error);
    
    // Attempt to load from localStorage cache
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      try {
        return JSON.parse(cachedData);
      } catch (parseError) {
        console.error(`Error parsing cache for ${cacheKey}:`, parseError);
        return null;
      }
    }
    
    return null;
  }
};
