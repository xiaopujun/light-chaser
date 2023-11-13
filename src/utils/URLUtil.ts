export interface UrlParams {
    [key: string]: string;
}

export enum Mode {
    //新建项目
    CREATE,
    //编辑项目
    EDIT,
    //展示项目
    VIEW,
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

    public static buildUrlParams(obj: any) {
        const urlParams = new URLSearchParams();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                urlParams.append(key, obj[key]);
            }
        }
        return urlParams.toString();
    }

    public static getModeByUrl(): Mode | null {
        let urlParams = URLUtil.parseUrlParams();
        if ('action' in urlParams) {
            switch (urlParams.action) {
                case 'create':
                    return Mode.CREATE;
                case 'edit':
                    return Mode.EDIT;
                case 'view':
                    return Mode.VIEW;
            }
            return null;
        } else
            return null;
    }

}