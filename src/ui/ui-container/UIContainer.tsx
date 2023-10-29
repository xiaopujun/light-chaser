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
    gridColumn?: string;
}

export const UIContainer: React.FC<UIContainerProps> = (props) => {
    const {label, tip, children, className, ...rest} = props;
    return (
        <div className={`ui-container ${className || ''}`} style={{...rest}}>
            {label &&
            <div className={'ui-container-label'}>
                <div>{label}</div>
                {tip && <div className={'ui-container-tip'}>
                    <Tooltip title={tip} style={{marginLeft: 1}}><QuestionCircleOutlined/></Tooltip></div>}
            </div>}
            <div className={'ui-container-content'}>{children}</div>
        </div>
    )
}
