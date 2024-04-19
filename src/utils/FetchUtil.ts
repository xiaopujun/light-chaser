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
        if (data instanceof FormData) {
            options.body = data;
        } else {
            options.headers = {
                'Content-Type': 'application/json',
                ...options.headers,
            };
            options.body = JSON.stringify(data);
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
                if ('code' in res && 'msg' in res && 'data' in res)
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