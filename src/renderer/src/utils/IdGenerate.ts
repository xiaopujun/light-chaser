import {customAlphabet} from "nanoid";

class IdGenerate {

    public static generateId(): string {
        const generateUniqueId = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
        return generateUniqueId();
    }
}

export default IdGenerate;

