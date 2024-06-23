export default class Base64Util {
    public static toBase64(str: string) {
        const utf8Array = new TextEncoder().encode(str);
        let binaryString = "";
        utf8Array.forEach((byte) => {
            binaryString += String.fromCharCode(byte);
        });
        return btoa(binaryString);
    }

    public static fromBase64(base64: string) {
        const binaryString = atob(base64);
        const utf8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            utf8Array[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder().decode(utf8Array);
    }

}