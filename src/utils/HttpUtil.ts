export default class HttpUtil {
    public static async sendHttpRequest(url: string, method: string, headers: any, params: any) {
        const requestOptions: any = {
            method: method.toUpperCase(),
            headers: headers,
        };
        if (method.toUpperCase() === 'POST') {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(params);
        } else if (method.toUpperCase() === 'GET') {
            const queryParams = new URLSearchParams(params).toString();
            url += `?${queryParams}`;
        }
        const response = await fetch(url, requestOptions);
        return await response.json();
    };
}
