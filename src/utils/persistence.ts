
type Persistence = {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
};

const localStorageFallback: Persistence = {
  async setItem(key, value) {
    localStorage.setItem(key, value);
  },
  async getItem(key) {
    return localStorage.getItem(key);
  },
  async removeItem(key) {
    localStorage.removeItem(key);
  },
  async clear() {
    localStorage.clear();
  },
};

export const persistence: Persistence = typeof window !== 'undefined' && window.persistentStorage
  ? {
      setItem(key, value) {
        return window.persistentStorage.setItem(key, value);
      },
      getItem(key) {
        return window.persistentStorage.getItem(key);
      },
      removeItem(key) {
        return window.persistentStorage.removeItem(key);
      },
      clear() {
        return window.persistentStorage.clear();
      },
    }
  : localStorageFallback;
