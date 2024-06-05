import {AMap} from '@amap/amap-jsapi-types';

declare global {
    interface Window {
        AMap_Key: string;
        AMap_securityJsCode: string;
        _AMapSecurityConfig: {
            securityJsCode: string;
        };
    }
}