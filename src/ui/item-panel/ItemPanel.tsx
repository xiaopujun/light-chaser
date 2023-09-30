import React from "react";
import "./ItemPanel.less";

export interface ItemPanelProps {
    label: string;
    children: React.ReactNode;
}

export const ItemPanel: React.FC<ItemPanelProps> = (props) => {
    const {label, children} = props;
    return (
        <div className={"item-panel"}>
            <div className={"item-panel-label"}>{label}</div>
            <div className={"item-panel-content"}>{children}</div>
        </div>
    )
}
