import React from "react";
import './VerticalItem.less';

interface VerticalItemProps {
    label?: string;
    children?: React.ReactNode;
}


export const VerticalItem: React.FC<VerticalItemProps> = ({label, children}) => {
    return (
        <div className={'vertical-item'}>
            <div className={'vertical-content'}>{children}</div>
            <div className={'vertical-label'}>{label}</div>
        </div>
    )
}
