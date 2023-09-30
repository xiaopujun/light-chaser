import React from "react";
import './VerticalItem.less';

interface VerticalItemProps {
    label?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}


export const VerticalItem: React.FC<VerticalItemProps> = (props) => {
    const {label, children, style} = props;
    return (
        <div className={'vertical-item'} style={style}>
            <div className={'vertical-content'}>{children}</div>
            <div className={'vertical-label'}>{label}</div>
        </div>
    )
}
