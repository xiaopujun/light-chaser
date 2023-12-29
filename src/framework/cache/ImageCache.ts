export default class ImageCache {
    private static imageCachePool = new Map<string, string>();

    public static addImageCache(key: string, value: string): void {
        ImageCache.imageCachePool.set(key, value);
    }

    public static getImageCache(key: string): string | null {
        return ImageCache.imageCachePool.get(key) || null;
    }

    public static removeImageCache(key: string): void {
        ImageCache.imageCachePool.delete(key);
    }

    public static clearImageCache(): void {
        ImageCache.imageCachePool.clear();
    }

    public static isExistImageCache(key: string): boolean {
        return ImageCache.imageCachePool.has(key);
    }
}