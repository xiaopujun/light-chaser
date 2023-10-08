import React from "react";
import './BPLeft.less';
import {
    ApartmentOutlined,
    CodeSandboxOutlined,
    CodeSandboxSquareFilled,
    ControlFilled, DeploymentUnitOutlined,
    FilterOutlined, GatewayOutlined
} from "@ant-design/icons";

export const BPLeft: React.FC = () => {
    return (
        <div className={'bp-left'}>
            <div className={'bp-left-item'}>
                <div className={'bp-item-icon'}><CodeSandboxOutlined/></div>
                <div className={'bp-item-label'}>图层节点</div>
            </div>
            <div className={'bp-left-item'}>
                <div className={'bp-item-icon'}><ApartmentOutlined/></div>
                <div className={'bp-item-label'}>逻辑节点</div>
            </div>
            <div className={'bp-left-item'}>
                <div className={'bp-item-icon'}><GatewayOutlined/></div>
                <div className={'bp-item-label'}>全局变量</div>
            </div>
            <div className={'bp-left-item'}>
                <div className={'bp-item-icon'}><FilterOutlined/></div>
                <div className={'bp-item-label'}>过滤器</div>
            </div>
        </div>
    )
}
