class StorageService {
  private memoryFallback: Map<string, string> = new Map();

  private isAvailable(): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  public getItem<T>(key: string, defaultValue: T): T {
    try {
      if (this.isAvailable()) {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : defaultValue;
      }
      const memItem = this.memoryFallback.get(key);
      return memItem ? (JSON.parse(memItem) as T) : defaultValue;
    } catch (e) {
      console.warn(`[StorageService] Failed to read key: ${key}`, e);
      return defaultValue;
    }
  }

  public setItem<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      if (this.isAvailable()) {
        window.localStorage.setItem(key, serialized);
      } else {
        this.memoryFallback.set(key, serialized);
      }
      return true;
    } catch (e) {
      console.warn(`[StorageService] Failed to save key: ${key}`, e);
      return false;
    }
  }

  public removeItem(key: string): void {
    try {
      if (this.isAvailable()) {
        window.localStorage.removeItem(key);
      } else {
        this.memoryFallback.delete(key);
      }
    } catch (e) {
      console.warn(`[StorageService] Failed to remove key: ${key}`, e);
    }
  }
}

export const storageService = new StorageService();
