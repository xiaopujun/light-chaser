export interface MovableItemType {
    //唯一标识
    id?: string | undefined;
    //组件名称
    name?: string | undefined;
    //组件类型
    type?: string | undefined;
    //宽度
    width?: number;
    //高度
    height?: number;
    //坐标
    position?: [number, number];
    //是否隐藏
    hide?: boolean;
    //是否锁定
    lock?: boolean;
    //顺序
    order?: number;
}