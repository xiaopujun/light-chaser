export default class FileUtil {
    public static async getFileHash(file: File): Promise<string> {
        const buffer = await file.arrayBuffer();
        const hashArray = await crypto.subtle.digest('SHA-256', buffer);
        return Array.from(new Uint8Array(hashArray))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('').substring(0, 16); //直接截取16位hash值可能会增加hash碰撞的风险。此时需要尤其关注使用情况
    }


    public static async blobToBase64(blobUrl: string): Promise<string | boolean> {
        return new Promise(async (resolve, reject): Promise<void> => {
            try {
                // 使用 fetch 获取 Blob 对象
                const response = await fetch(blobUrl);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result as string);
                };
                reader.onerror = () => {
                    reject("Failed to convert Blob to Base64");
                };
                reader.readAsDataURL(blob);
            } catch (e) {
                return resolve(false);
            }
        })
    }

    public static async base64ToBlob(base64: string): Promise<string | boolean> {
        return new Promise(async (resolve, reject): Promise<void> => {
            try {
                const response = await fetch(base64);
                if (response.ok) {
                    const blob = await response.blob();
                    resolve(URL.createObjectURL(blob));
                } else
                    resolve(false);
            } catch (e) {
                resolve(false);
            }
        })
    }

}