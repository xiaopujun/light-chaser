/**
 * 1. 控件定义
 * 2. 布局定义
 * 3. 数据定义
 * 4. 分组定义
 */

export type BaseDataType = string | boolean | number | null;

export type ControlValueType = BaseDataType | BaseDataType[] | Control[];

//todo 使用递归，从里向外解析，解析的过程中生成UI、数据、布局、分组
export interface Control {
    id?: string;
    key?: string; //有key则需要作为数据更新片段链条的一部分，无key则数据片段自动跳过本层级，应该直接连接父级和子级
    label?: string;//有label应该渲染label，无label则直接渲染控件
    type?: string;//有type则需要渲染控件，无type则直接忽略本层级的渲染
    tip?: string;
    value?: any;
    defaultValue?: any;
    direction?: "vertical" | "horizontal";//有direction则需要渲染布局，无direction则直接渲染控件.有label无direction默认按照horizontal渲染
    config?: Record<string, any>;
    rules?: string;
    children?: Control[];
    parent?: Control;
}

