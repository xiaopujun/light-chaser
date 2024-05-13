export enum HotKeyTriggerType {
    //单次触发
    SINGLE,
    //连续触发
    COILED
}

export interface HotKeyConfigType {
    [key: string]: {
        //快捷键处理函数
        handler: Function | Function[],
        //快捷键生效范围，布设置（默认）所有范围内可用。值为css选择器
        range?: string,
        //快捷键触发类型
        triggerType?: HotKeyTriggerType
    }
}