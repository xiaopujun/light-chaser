export default class FileUtil {
    public static async getFileHash(file: File): Promise<string> {
        const buffer = await file.arrayBuffer();
        const hashArray = await crypto.subtle.digest('SHA-256', buffer);
        return Array.from(new Uint8Array(hashArray))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('').substring(0, 16); //直接截取16位hash值可能会增加hash碰撞的风险。此时需要尤其关注使用情况
    }
}