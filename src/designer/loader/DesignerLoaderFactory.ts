import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {DesignerMode} from "../DesignerType";

const editorDesignerLoader = import('./EditorDesignerLoader').then(module => module.default);
const viewDesignerLoader = import('./ViewDesignerLoader').then(module => module.default);

const loaderMap = new Map<DesignerMode, Promise<AbstractDesignerLoader>>();
loaderMap.set(DesignerMode.EDIT, editorDesignerLoader);
loaderMap.set(DesignerMode.VIEW, viewDesignerLoader);

export default class DesignerLoaderFactory {
    /**
     * 获取设计器加载器，根据不同模式获取不同的设计器加载器
     * @param mode 当前模式 --> DesignerMode 存在编辑模式、预览模式两种。默认加载编辑模式
     * @returns 设计器加载器实例对象
     */
    public static async getLoader(mode?: DesignerMode): Promise<AbstractDesignerLoader> {
        if (mode && loaderMap.has(mode))
            return loaderMap.get(mode)!;
        else
            return editorDesignerLoader;
    }
}