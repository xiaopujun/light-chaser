
export interface UrlParams {
    [key: string]: string;
}


export default class URLUtil {

    public static parseUrlParams(): UrlParams {
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        const params: UrlParams = {};
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    }

}