import editorDesignerLoader from "./EditorDesignerLoader";
import viewDesignerLoader from "./ViewDesignerLoader";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import URLUtil from "../../utils/URLUtil";
import {DesignerMode} from "../DesignerType";

const loaderMap = new Map<DesignerMode, AbstractDesignerLoader>();
loaderMap.set(DesignerMode.EDIT, editorDesignerLoader);
loaderMap.set(DesignerMode.VIEW, viewDesignerLoader);

export default class DesignerLoaderFactory {
    public static getLoader(): AbstractDesignerLoader {
        const {mode} = URLUtil.parseUrlParams();
        if (mode && loaderMap.has(mode as DesignerMode)) {
            return loaderMap.get(mode as DesignerMode)!;
        } else {
            return editorDesignerLoader;
        }
    }
}