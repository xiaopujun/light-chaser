export interface HttpResponse {
    code: number;
    msg: string;
    data: any;
}

export default class FetchUtil {
    static async get(url: string, options: RequestInit = {}): Promise<HttpResponse> {
        options.method = 'GET';
        return FetchUtil.request(url, options);
    }

    static async post(url: string, data: any, options: RequestInit = {}): Promise<HttpResponse> {
        options.method = 'POST';
        //默认'Content-Type': 'application/json',
        options.headers = options.headers || {};
        if (!options.headers || !('Content-Type' in options.headers)) {
            (options.headers as any)['Content-Type'] = 'application/json';
        }

        const contentType = (options.headers as any)['Content-Type'] || 'application/json';
        if (contentType === 'application/json') {
            options.body = JSON.stringify(data);
        } else if (contentType === 'application/x-www-form-urlencoded') {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(data)) {
                params.append(key, value as string);
            }
            options.body = params.toString();
        } else if (contentType === 'multipart/form-data') {
            // multipart/form-data 不能直接设置 Content-Type，因为需要由浏览器自动生成
            delete (options.headers as any)['Content-Type'];
            if (data instanceof FormData) {
                options.body = data;
            } else {
                const formData = new FormData();
                data.values().forEach((value: any, key: string) => {
                    formData.append(key, value as Blob | string);
                })
                options.body = formData;
            }
        } else {
            // 默认处理为 text/plain
            options.body = data.toString();
        }
        return FetchUtil.request(url, options);
    }

    private static async request(url: string, options: RequestInit = {}): Promise<HttpResponse> {
        try {
            const response = await fetch(url, options);
            if (!response.ok)
                return {code: response.status, msg: response.statusText, data: null};

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const res = await response.json();
                if (typeof res === 'object' && 'code' in res && 'msg' in res && 'data' in res)
                    return res;
                else
                    return {code: 200, msg: 'success', data: res};
            } else if (contentType && contentType.includes('text/html')) {
                const text = await response.text()
                return {code: 200, msg: 'success', data: text}
            } else {
                const blob = await response.blob()
                return {code: 200, msg: 'success', data: blob}
            }
        } catch (error: any) {
            return {code: 500, msg: error.msg, data: null};
        }
    }

    static async doRequest(url: string, method: string, headers: Record<string, string>, params: FormData | Record<string, any>): Promise<HttpResponse> {
        const options: RequestInit = {
            method: method.toUpperCase(),
            headers: headers,
        };

        if (params) {
            if (method.toUpperCase() === 'GET') {
                const queryString = new URLSearchParams(params as Record<string, string>).toString();
                url = `${url}?${queryString}`;
            } else {
                options.headers = {
                    'Content-Type': 'application/json',
                    ...options.headers,
                };
                options.body = JSON.stringify(params);
            }
        }

        return FetchUtil.request(url, options);
    }
}