export default class AbstractCache<T = any> {
    private cachePool = new Map<string, T>();

    public addCache(key: string, value: T): void {
        this.cachePool.set(key, value);
    }

    public getCache(key: string): T | null {
        return this.cachePool.get(key) || null;
    }

    public removeCache(key: string): void {
        this.cachePool.delete(key);
    }

    public clearCache(): void {
        this.cachePool.clear();
    }

    public isExistCache(key: string): boolean {
        return this.cachePool.has(key);
    }

    public getCachePool(): Map<string, T> {
        return this.cachePool;
    }
}