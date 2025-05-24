/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import './DesignerFooter.less';
import {observer} from "mobx-react";
import {HotKeyDes} from "./hotkey-des/HotKeyDes";
import footerStore from "./FooterStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {CoverConfig} from "./cover/CoverConfig.tsx";
import {useState} from "react";
import {Tooltip} from "antd";
import {CodeBrackets, Keyboard, Lightning, Magnet, MaterialThree} from "@icon-park/react";
import layerManager from "../manager/LayerManager.ts";
import ConfigCode from "../../comps/common-component/config-code/ConfigCode.tsx";

const DesignerFooter = observer(() => {

    const [enableEvent, setEnableEvent] = useState(false);

    const toggleHotKeyDes = () => {
        const {hotKeyVisible, setHotKeyVisible} = footerStore;
        setHotKeyVisible(!hotKeyVisible)
    }

    const toggleSnapShot = () => {
        const {snapShotVisible, setSnapShotVisible} = footerStore;
        setSnapShotVisible(!snapShotVisible)
    }

    const toggleEnableEvent = () => {
        layerManager.setEnableEvent(!enableEvent)
        setEnableEvent(!enableEvent)
    }

    const toggleAdsorption = () => {
        layerManager.setEnableAdsorption(!layerManager.enableAdsorption)
    }

    const toggleConfigCode = () => {
        const {targetIds} = eventOperateStore;
        if (targetIds.length === 1 && layerConfigs[targetIds[0]].type !== 'group')
            footerStore.setConfigCodeVisible(true)
    }


    const {layerConfigs, enableAdsorption} = layerManager;
    const {hotKeyVisible, snapShotVisible, configCodeVisible} = footerStore;
    const {scale} = eventOperateStore;
    return (
        <div className={'lc-designer-footer'}>
            <div className={'footer-left'}>
                <div className={'footer-item'} onClick={toggleHotKeyDes}>
                    <Keyboard/>
                    <span>快捷键</span>
                </div>
                <div className={'footer-item'} onClick={toggleSnapShot}>
                    <MaterialThree/>
                    <span>封面</span>
                </div>
            </div>
            <div className={'footer-center'}>
                <div className={`footer-center-item ${enableEvent ? 'footer-center-item-active' : ''}`}
                     onClick={toggleEnableEvent}>
                    <Tooltip mouseEnterDelay={1} title={'编辑模式下允许触发组件原生事件'}>
                        <Lightning/></Tooltip>
                </div>
                <div className={`footer-center-item ${enableAdsorption ? 'footer-center-item-active' : ''}`}
                     onClick={toggleAdsorption}>
                    <Tooltip mouseEnterDelay={1} title={'开启后排版会有吸附效果'}>
                        <Magnet/></Tooltip>
                </div>
                <div className={`footer-center-item`}
                     onClick={toggleConfigCode}>
                    <Tooltip mouseEnterDelay={1} title={'以代码方式直接编辑组件配置项'}>
                        <CodeBrackets/></Tooltip>
                </div>
            </div>
            <div className={'footer-right'}>
                <div className={'right-info-item'}>缩放 : {(scale * 100).toFixed(0)}%</div>
                <div className={'right-info-item'}>图层 : {Object.keys(layerConfigs).length}</div>
            </div>
            {hotKeyVisible && <HotKeyDes onClose={toggleHotKeyDes}/>}
            {snapShotVisible && <CoverConfig onClose={toggleSnapShot}/>}
            {configCodeVisible && <ConfigCode/>}
        </div>
    );
})

export default DesignerFooter;