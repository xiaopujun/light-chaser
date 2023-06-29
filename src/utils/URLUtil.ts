export function parseUrlParams() {
    const urlParams: any = new URLSearchParams(window.location.search);
    const params: any = {};
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    return params;
}

export function buildUrlParams(obj: any) {
    const urlParams = new URLSearchParams();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            urlParams.append(key, obj[key]);
        }
    }
    return urlParams.toString();
}
