export default class FileUtil {
    public static async getFileHash(file: File): Promise<string> {
        const buffer = await file.arrayBuffer();
        const hashArray = await crypto.subtle.digest('SHA-256', buffer);
        return Array.from(new Uint8Array(hashArray))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
}