import {ReactNode} from "react";

export interface AccordionProps {
    /**
     * 标题
     */
    label?: string;
    /**
     * 说明文字
     */
    tip?: string;
    // 开关值变化回调
    onChange?: (data: boolean) => void;
    // 开关状态值（受控）
    value?: boolean;
    // 开关状态值（非受控）
    defaultValue?: boolean;
    children?: ReactNode;
}