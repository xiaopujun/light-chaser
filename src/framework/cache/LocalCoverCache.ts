import AbstractCache from "./AbstractCache";

class LocalCoverCache extends AbstractCache<any> {

    public getAllCoverCache(): string[] {
        return Array.from(this.getCachePool().values()) || [];
    }

    public clearCoverCache(): void {
        this.getAllCoverCache().forEach((url: string) => {
            URL.revokeObjectURL(url);
        });
    }
}

const localCoverCache = new LocalCoverCache();
export default localCoverCache;

