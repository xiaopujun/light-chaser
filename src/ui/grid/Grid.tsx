import React from "react";
import './Grid.less';
import {Tooltip} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";

export interface GridProps {
    children?: React.ReactNode;
    columns?: number;
    tip?: string;
    label?: string;
    gridGap?: string;
}

export const Grid: React.FC<GridProps> = (props) => {
    const {children, columns = 1, tip, label, gridGap} = props;
    const gtc = `repeat(${columns}, 1fr)`;
    const gridStyle = {gridTemplateColumns: gtc, gridGap}
    return (
        <div className={'lc-grid-container'}>
            {label && <div className={'lc-grid-label'}>{label}</div>}
            {tip && <div className={'lc-grid-tip'}>
                <Tooltip title={tip}><QuestionCircleOutlined/>&nbsp;&nbsp;</Tooltip>
            </div>}
            <div style={gridStyle} className={'lc-grid-layout'}>{children}</div>
        </div>

    )
}
