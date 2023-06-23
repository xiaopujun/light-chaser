import {customAlphabet} from "nanoid";

class IdGenerate {

    public generateId(): string {
        const generateUniqueId = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
        return generateUniqueId();
    }
}

const idGenerate = new IdGenerate();

export default IdGenerate;
export {idGenerate}

