export interface UrlParams {
    [key: string]: string;
}

export enum DesignerMode {
    //编辑项目
    EDIT = '0',
    //展示项目
    VIEW = '1',
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