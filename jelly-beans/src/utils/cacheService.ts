type CacheEntry<T> = {
    value: T;
    expiry: number;
  };
  
  const cache: Record<string, CacheEntry<any>> = {};
  
  export function setCache<T>(key: string, value: T, ttlMs: number) {
    const expiry = Date.now() + ttlMs;
    cache[key] = { value, expiry };
  }
  
  export function getCache<T>(key: string): T | null {
    const entry = cache[key];
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      delete cache[key];
      return null;
    }
    return entry.value;
  }
  
  export function clearCache(key: string) {
    delete cache[key];
  }