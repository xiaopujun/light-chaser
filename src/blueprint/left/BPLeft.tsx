import React, {useEffect} from "react";
import './BPLeft.less';
import {
    ApartmentOutlined,
    CodeSandboxOutlined,
    FilterOutlined,
    GatewayOutlined,
    NodeIndexOutlined
} from "@ant-design/icons";
import {AnchorPointType, BPNode} from "../node/BPNode";
import bpStore from "../store/BPStore";
import ReactDOM from "react-dom";
import {idGenerate} from "../../utils/IdGenerate";

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

    useEffect(() => {
        const dropContainer = document.getElementById("bp-node-container");
        const dragElements = document.getElementsByClassName("bp-node-list-item");
        Array.from(dragElements).forEach((element) => {
            element.addEventListener('dragstart', (event) => {
                // 设置拖拽数据
                // event.dataTransfer.setData('text/plain', element.textContent);
            });
        });
        dropContainer && dropContainer.addEventListener('dragover', (event) => {
            event.preventDefault(); // 阻止默认行为以允许拖放
        });
        dropContainer && dropContainer.addEventListener('drop', (event) => {
            event.preventDefault();
            //获取鼠标位置
            const position = {x: event.offsetX, y: event.offsetY};
            const {addNodes} = bpStore;
            addNodes({
                title: '测试节点',
                position: position,
                input: [{
                    id: idGenerate.generateId(),
                    title: '输入1',
                    type: AnchorPointType.INPUT
                }],
                output: [{
                    id: idGenerate.generateId(),
                    title: '输出1',
                    type: AnchorPointType.OUTPUT
                }],
            })
        });
    })
    return (
        <div className={'bp-node-list'}>
            <div className={'bp-node-list-header'}>
                <div className={'bp-node-list-header-label'}>图层节点(取自画布已有组件)</div>
            </div>
            <div className={'bp-node-list-body'}>
                <div className={'bp-node-list-item'} draggable={true}>
                    <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                    <div className={'bpn-li-label'}>折线图</div>
                </div>
                <div className={'bp-node-list-item'} draggable={true}>
                    <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                    <div className={'bpn-li-label'}>饼图</div>
                </div>
                <div className={'bp-node-list-item'} draggable={true}>
                    <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                    <div className={'bpn-li-label'}>选择框</div>
                </div>
                <div className={'bp-node-list-item'} draggable={true}>
                    <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                    <div className={'bpn-li-label'}>文字</div>
                </div>
                <div className={'bp-node-list-item'} draggable={true}>
                    <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                    <div className={'bpn-li-label'}>列表</div>
                </div>
            </div>
        </div>
    )
}
