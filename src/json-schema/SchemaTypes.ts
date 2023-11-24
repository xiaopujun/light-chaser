export type BaseType = string | boolean | number | object | null | undefined;

export type BaseDataType = BaseType | Record<string, BaseType>;

export type ControlValueType = BaseDataType | BaseDataType[];

export type UIType =
    "accordion" |
    "button" |
    "grid" |
    "input" |
    "radio" |
    "select" |
    "switch" |
    "code-editor" |
    "color-picker" |
    "colors-picker" |
    "color-mode" |
    "image-upload" |
    "text-only" |
    "text-area" |
    "slider" |
    "group-button" |
    "item-panel";

export interface Control {
    id?: string;
    key?: string; //有key则需要作为数据更新片段链条的一部分，无key则数据片段自动跳过本层级，应该直接连接父级和子级
    label?: string;//有label应该渲染label，无label则直接渲染控件
    type?: UIType;//有type则需要渲染控件，无type则直接忽略本层级的渲染
    tip?: string;
    value?: ControlValueType;
    config?: Record<string, any>;
    rules?: string;
    reRender?: boolean; //标识该控件的值发生变更后是否需要触发整个schema的重新渲染
    children?: Control[];
    parent?: Control;
}

