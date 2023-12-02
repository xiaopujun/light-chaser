import {ThemeItemType} from "../../designer/DesignerType";
import AbstractController from "./AbstractController";

abstract class AbstractDesignerController<I = any, C = any> extends AbstractController<I, C> {

    /**
     * 设置组件数据
     * @param data
     */
    setData(data: Object): void {

    }

    /**
     * 获取组件数据
     */
    getData(): Object {
        return {};
    }

    /**
     * 更新本组件的主题样式方法，用于在全局切换主题时使用
     * @param newTheme 新主题
     */
    updateTheme(newTheme: ThemeItemType): void {
        
    }

}

export default AbstractDesignerController;
