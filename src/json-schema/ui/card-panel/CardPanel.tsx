import React from "react";
import "./CardPanel.less";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";

export interface ItemPanelProps {
    label: string;
    tip?: string;
    children: React.ReactNode;
    contentStyle?: React.CSSProperties;
}

export const CardPanel: React.FC<ItemPanelProps> = (props) => {
    const {label, tip, contentStyle, children} = props;
    return (
        <div className={"card-panel"}>
            <div className={"card-panel-label"}>
                {label} {tip && <Tooltip title={tip}>&nbsp;<QuestionCircleOutlined/>&nbsp;</Tooltip>}
            </div>
            <div style={{...contentStyle}} className={"card-panel-content"}>{children}</div>
        </div>
    )
}
