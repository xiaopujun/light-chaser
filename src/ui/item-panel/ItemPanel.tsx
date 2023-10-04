import React from "react";
import "./ItemPanel.less";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";

export interface ItemPanelProps {
    label: string;
    tip?: string;
    labelStyle?: React.CSSProperties;
    children: React.ReactNode;
}

export const ItemPanel: React.FC<ItemPanelProps> = (props) => {
    const {label, children, tip, labelStyle} = props;
    return (
        <div className={"item-panel"}>
            <div className={"item-panel-label"} style={labelStyle}>
                {label} {tip && <Tooltip title={tip}>&nbsp;<QuestionCircleOutlined/>&nbsp;</Tooltip>}
            </div>
            <div className={"item-panel-content"}>{children}</div>
        </div>
    )
}
