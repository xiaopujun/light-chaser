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


    public static getUserId(): string | null {
        const token = AuthTools.getToken();
        if (token === null)
            return null;
        return token.split(':')[0];
    }
}