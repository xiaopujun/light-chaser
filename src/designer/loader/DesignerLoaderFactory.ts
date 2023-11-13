import EditorDesignerLoader from "./EditorDesignerLoader";
import {ViewDesignerLoader} from "./ViewDesignerLoader";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import URLUtil from "../../utils/URLUtil";

const loaderMap = new Map<string, AbstractDesignerLoader>();
loaderMap.set("edit", EditorDesignerLoader.getInstance());
loaderMap.set("create", EditorDesignerLoader.getInstance());
loaderMap.set("view", ViewDesignerLoader.getInstance());

export default class DesignerLoaderFactory {
    public static getLoader(): AbstractDesignerLoader {
        let urlParams = URLUtil.parseUrlParams();
        const {action} = urlParams;
        if (action && loaderMap.has(action)) {
            return loaderMap.get(action)!;
        } else {
            return EditorDesignerLoader.getInstance();
        }
    }
}