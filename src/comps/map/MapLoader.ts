import AMapLoader from "@amap/amap-jsapi-loader";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";

class MapLoader {

    loadPromise: Promise<Window["AMap"] | null> | null = null;

    public async load(key: string, securityJsCode: string): Promise<Window["AMap"] | null> {
        if (window.AMap) {
            return window.AMap;
        } else {
            if (!securityJsCode || securityJsCode === "")
                globalMessage.messageApi?.info("缺少安全密钥")
            window._AMapSecurityConfig = {
                securityJsCode: securityJsCode,
            };

            if (this.loadPromise)
                return this.loadPromise;
            this.loadPromise = new Promise<Window["AMap"] | null>((resolve) => {
                AMapLoader.load({
                    key: key,
                    version: "2.0",
                    plugins: ["AMap.Scale"],
                    Loca: {
                        "version": '2.0.0'
                    }
                }).then((AMap) => {
                    if (AMap) {
                        window.AMap = AMap;
                        window.AMap_Key = key;
                        window.AMap_securityJsCode = securityJsCode;
                        resolve(AMap);
                    } else {
                        globalMessage.messageApi?.error("地图加载失败...")
                        resolve(null);
                    }
                });
            });
            return this.loadPromise;
        }
    }
}

const mapLoader = new MapLoader();
export default mapLoader;