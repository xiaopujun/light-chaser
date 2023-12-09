import EditorDesignerLoader from "./EditorDesignerLoader";
import {ViewDesignerLoader} from "./ViewDesignerLoader";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import URLUtil, {DesignerMode} from "../../utils/URLUtil";

const loaderMap = new Map<DesignerMode, AbstractDesignerLoader>();
loaderMap.set(DesignerMode.EDIT, EditorDesignerLoader.getInstance());
loaderMap.set(DesignerMode.VIEW, ViewDesignerLoader.getInstance());

export default class DesignerLoaderFactory {
    public static getLoader(): AbstractDesignerLoader {
        const {mode} = URLUtil.parseUrlParams();
        if (mode && loaderMap.has(mode as DesignerMode)) {
            return loaderMap.get(mode as DesignerMode)!;
        } else {
            return EditorDesignerLoader.getInstance();
        }
    }
}