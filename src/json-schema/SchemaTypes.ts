export type BaseDataType = string | boolean | number;

export type ControlValueType = BaseDataType | BaseDataType[];

export interface Control {
    id?: string;
    key?: string; //有key则需要作为数据更新片段链条的一部分，无key则数据片段自动跳过本层级，应该直接连接父级和子级
    label?: string;//有label应该渲染label，无label则直接渲染控件
    type?: string;//有type则需要渲染控件，无type则直接忽略本层级的渲染
    tip?: string;
    value?: ControlValueType;
    direction?: "vertical" | "horizontal";//有direction则需要渲染布局，无direction则直接渲染控件.有label无direction默认按照horizontal渲染
    config?: Record<string, any>;
    rules?: string;
    children?: Control[];
    parent?: Control;
}

