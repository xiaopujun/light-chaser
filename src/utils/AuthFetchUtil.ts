import FetchUtil, {HttpResponse} from "./FetchUtil.ts";
import AuthTools from "./AuthTools.ts";
import {globalMessage} from "../framework/message/GlobalMessage.tsx";

/**
 * 带有权限验证的Fetch工具类
 */
export default class AuthFetchUtil {
    public static async post(url: string, data: any, options?: RequestInit): Promise<HttpResponse> {
        options = AuthFetchUtil.addToken(options);
        const response = await FetchUtil.post(url, data, options);
        AuthFetchUtil.statusAuth(response);
        return response;
    }

    public static async get(url: string, options?: RequestInit): Promise<HttpResponse> {
        options = AuthFetchUtil.addToken(options);
        const response = await FetchUtil.get(url, options);
        AuthFetchUtil.statusAuth(response);
        return response;
    }

    private static addToken(options?: RequestInit): RequestInit {
        options = options || {};
        const token = AuthTools.getToken();
        options.headers = options.headers || {};
        (options.headers as any)['Authorization'] = token;
        return options;
    }

    private static statusAuth(response: HttpResponse): void {
        const {code, msg} = response;
        if (code === 401) {
            AuthTools.removeToken();
            globalMessage.messageApi?.error(msg);
            const timer = setTimeout(() => {
                clearTimeout(timer);
                window.location.href = '/login';
            }, 2000)
        }
        if (code === 408) {

        }
    }
}