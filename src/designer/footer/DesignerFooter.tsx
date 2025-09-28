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
import './DesignerFooter.less';

const DesignerFooter = observer(() => {
    const [enableEvent, setEnableEvent] = useState(false);
    const {hotKeyVisible, snapShotVisible, configCodeVisible} = footerStore;
    const {scale} = eventOperateStore;
    const {layerConfigs, enableAdsorption} = layerManager;

    const toggleHotKeyDes = () => footerStore.setHotKeyVisible(!hotKeyVisible);
    const toggleSnapShot = () => footerStore.setSnapShotVisible(!snapShotVisible);
    const toggleEnableEvent = () => {
        layerManager.setEnableEvent(!enableEvent);
        setEnableEvent(!enableEvent);
    };
    const toggleAdsorption = () => layerManager.setEnableAdsorption(!enableAdsorption);
    const toggleConfigCode = () => {
        const {targetIds} = eventOperateStore;
        if (targetIds.length === 1 && layerConfigs[targetIds[0]].type !== 'group')
            footerStore.setConfigCodeVisible(true);
    };

    return (
        <div className="lc-designer-footer">
            <div className="footer-left">
                <Tooltip title="快捷键" overlayClassName="designer-tooltip">
                    <div
                        className={`footer-item ${hotKeyVisible ? 'active' : ''}`}
                        onClick={toggleHotKeyDes}
                    >
                        <Keyboard theme="outline" size={18} strokeWidth={2}/>
                    </div>
                </Tooltip>
                <Tooltip title="封面设置" overlayClassName="designer-tooltip">
                    <div
                        className={`footer-item ${snapShotVisible ? 'active' : ''}`}
                        onClick={toggleSnapShot}
                    >
                        <MaterialThree theme="outline" size={18} strokeWidth={2}/>
                    </div>
                </Tooltip>
            </div>

            <div className="footer-center">
                <Tooltip title="编辑模式下允许触发组件原生事件" overlayClassName="designer-tooltip">
                    <div
                        className={`footer-center-item ${enableEvent ? 'active' : ''}`}
                        onClick={toggleEnableEvent}
                    >
                        <Lightning theme="outline" size={18} strokeWidth={2}/>
                    </div>
                </Tooltip>
                <Tooltip title="开启后排版会有吸附效果" overlayClassName="designer-tooltip">
                    <div
                        className={`footer-center-item ${enableAdsorption ? 'active' : ''}`}
                        onClick={toggleAdsorption}
                    >
                        <Magnet theme="outline" size={18} strokeWidth={2}/>
                    </div>
                </Tooltip>
                <Tooltip title="以代码方式直接编辑组件配置项" overlayClassName="designer-tooltip">
                    <div
                        className={`footer-center-item ${configCodeVisible ? 'active' : ''}`}
                        onClick={toggleConfigCode}
                    >
                        <CodeBrackets theme="outline" size={18} strokeWidth={2}/>
                    </div>
                </Tooltip>
            </div>

            <div className="footer-right">
                <div className="right-info-item">缩放: {(scale * 100).toFixed(0)}%</div>
                <div className="right-info-item">图层: {Object.keys(layerConfigs).length}</div>
            </div>

            {hotKeyVisible && <HotKeyDes onClose={toggleHotKeyDes}/>}
            {snapShotVisible && <CoverConfig onClose={toggleSnapShot}/>}
            {configCodeVisible && <ConfigCode/>}
        </div>
    );
});

export default DesignerFooter;