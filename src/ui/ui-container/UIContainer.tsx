import React from "react";
import './UIContainer.less';
import {Tooltip} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";

export interface UIContainerProps {
    label?: string;
    tip?: string;
    className?: string;
    children?: React.ReactNode;
    padding?: string | number;
    margin?: string | number;
}

export const UIContainer: React.FC<UIContainerProps> = (props) => {
    const {label, tip, children, className, margin, padding} = props;
    return (
        <div className={`ui-container ${className}`} style={{margin, padding}}>
            {label && <div className={'ui-container-label'}>
                <div>{label}</div>
                &nbsp;
                {tip && <div className={'ui-container-tip'}><Tooltip title={tip}><QuestionCircleOutlined/>
                    &nbsp;&nbsp;</Tooltip></div>}
            </div>}
            <div className={'ui-container-content'}>{children}</div>
        </div>
    )
}
