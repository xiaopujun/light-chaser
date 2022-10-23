/**
 * 组件基础属性
 */
export interface ElemBaseProps {
    padding: string;
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
    id?: number, //大屏id
    globalSet: {
        saveType: string,//数据存储方式 local(本地）server（远程服务）
        screenRatio: string,//屏幕比例
        designerState: string,//设计器状态 edit(编辑）readonly(只读)
        screenName: string,
        screenWidth: number,
        screenHeight: number,
        elemInterval: number,//元素间隔
        columns: number,//列个数
        elemBaseLineHeight: number,//元素基准高度
        elemCount: number,//元素个数
    },
    active: {     //激活组件信息
        id: number;
        type: string;
    };
    chartConfigs: any;
    layoutConfig: Array<any>;
    elemPropSetDialog: {
        visible: boolean;
    }
}