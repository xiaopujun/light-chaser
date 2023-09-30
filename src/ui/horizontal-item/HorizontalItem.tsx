import React from "react";
import './HorizontalItem.less';

interface HorizontalItemProps {
    label?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

/**
 * 水平布局
 * @param label
 * @param children
 * @constructor
 */
export const HorizontalItem: React.FC<HorizontalItemProps> = (props) => {
    const {label, children, style} = props;
    return (
        <div className={'horizontal-item'} style={style}>
            <div className={'horizontal-label'}>{label}</div>
            <div className={'horizontal-content'}>{children}</div>
        </div>
    )
}
