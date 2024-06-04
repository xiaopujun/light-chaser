 import FetchUtil from "./FetchUtil.ts";

export default class AuthTools {
    public static getToken(): string | null {
        return localStorage.getItem('token') || null;
    }

    public static setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    public static removeToken(): void {
        localStorage.removeItem('token');
    }


    public static async doAuth(): Promise<boolean> {
        const token = AuthTools.getToken();
        if (!token)
            return false;
        const authRes = await FetchUtil.post("/api/authenticate/auth",
            {token},
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        const {code, data} = authRes;
        return code === 200 && data;
    }
}