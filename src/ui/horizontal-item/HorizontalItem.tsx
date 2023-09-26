import React from "react";
import './HorizontalItem.less';

interface HorizontalItemProps {
    label?: string;
    children?: React.ReactNode;
}

/**
 * 水平布局
 * @param label
 * @param children
 * @constructor
 */
export const HorizontalItem: React.FC<HorizontalItemProps> = ({label, children}) => {
    return (
        <div className={'horizontal-item'}>
            <div className={'horizontal-label'}>{label}</div>
            <div className={'horizontal-content'}>{children}</div>
        </div>
    )
}
