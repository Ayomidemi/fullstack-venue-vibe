const Storage = {
  /**
   * @description Adds data to local storage.
   * @param key Key of the data to be added to storage.
   * @param value Value of the data to be added to storage.
   */
  setItem: (key: string, value: string) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Error setting item to localStorage:', e);
    }
  },

  /**
   * @description Retrieves data from local storage.
   * @param key Key of the data to be retrieved from storage.
   * @param shouldParse Boolean value indicating whether the key should be parsed like a JSON object.
   * @returns {Any} Value matching the supplied key.
   */
  getItem: (key: string, shouldParse = true) => {
    try {
      if (typeof window !== 'undefined') {
        const value = localStorage.getItem(key);
        return value != null ? (shouldParse ? JSON.parse(value) : value) : null;
      }
      return null;
    } catch (e) {
      console.error('Error retrieving item from localStorage:', e);
      return null;
    }
  },

  /**
   * @description Removes data from local storage.
   * @param key Key of the data to be removed from storage.
   */
  removeItem: (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.error('Error removing item from localStorage:', e);
    }
  },
};

export { Storage };
