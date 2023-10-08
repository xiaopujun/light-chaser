import React from "react";
import './BPLeft.less';
import {
    ApartmentOutlined,
    CodeSandboxOutlined,
    FilterOutlined,
    GatewayOutlined,
    NodeIndexOutlined
} from "@ant-design/icons";

export const BPLeft: React.FC = () => {
    return (
        <div className={'bp-left'}>
            <BPNodeSortList/>
            <BPNodeList/>
        </div>
    )
}

export const BPNodeSortList = () => {
    return (
        <div className={'bp-node-sort-list'}>
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

export const BPNodeList = () => {
    return (
        <div className={'bp-node-list'}>
            <div className={'bp-node-list-header'}>
                <div className={'bp-node-list-header-label'}>图层节点(取自画布已有组件)</div>
            </div>
            <div className={'bp-node-list-body'}>
                <div className={'bp-node-list-item'}>
                    <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                    <div className={'bpn-li-label'}>折线图</div>
                </div>
                <div className={'bp-node-list-item'}>
                    <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                    <div className={'bpn-li-label'}>饼图</div>
                </div>
                <div className={'bp-node-list-item'}>
                    <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                    <div className={'bpn-li-label'}>选择框</div>
                </div>
                <div className={'bp-node-list-item'}>
                    <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                    <div className={'bpn-li-label'}>文字</div>
                </div>
                <div className={'bp-node-list-item'}>
                    <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                    <div className={'bpn-li-label'}>列表</div>
                </div>
            </div>
        </div>
    )
}
