/**
 * 组件基础属性
 */
export interface ElemBaseProps {
    padding: string;
    margin: string;
    border: string;
    backgroundColor: string;
}

/**
 * redux-action类型
 */
export interface Action {
    type: string;  //操作
    data: any;     //数据
}

/**
 * 布局设计器，store类型定义
 */
export interface LCDesignerProps {
    count: number;//当前画板中组件总个数
    active: {     //激活组件信息
        id: number;
        type: string;
    };
    chartConfigMap: Map<number, any>;
    layoutConfig: Array<any>;
    elemPropSetDialog: {
        visible: boolean;
    }
}