import {AbstractComponentDefinition} from "../../framework/core/AbstractComponentDefinition";
import {HeaderItemProps} from "../header/HeaderTypes";
import {AbstractOperator} from "../../framework/operate/AbstractOperator";
import AbstractConvert from "../../framework/convert/AbstractConvert";

export abstract class AbstractDesignerLoader {

    //自定义组件信息映射
    public customComponentInfoMap: Record<string, AbstractComponentDefinition> = {};
    //头部操作菜单实例
    public headerItemInstances: HeaderItemProps[] = [];
    //项目数据操作映射
    public abstractOperatorMap: { [key: string]: AbstractOperator } = {};
    //数据转换器
    public abstractConvertMap: { [key: string]: AbstractConvert } = {};

    /**
     * 加载设计器
     */
    public load(): void {
        this.scanComponents();
        this.loadProjectData();
    }

    /**
     * 扫描设计器组件
     */
    protected abstract scanComponents(): void;

    /**
     * 加载设计器项目数据
     */
    protected abstract loadProjectData(): void;
}