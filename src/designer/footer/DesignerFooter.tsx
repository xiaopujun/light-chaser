import './DesignerFooter.less';
import {observer} from "mobx-react";
import layerManager from "../manager/LayerManager.ts";
import {HotKeyDes} from "./hotkey-des/HotKeyDes";
import footerStore from "./FooterStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {CoverConfig} from "./cover/CoverConfig.tsx";
import {useState} from "react";
import {Tooltip} from "antd";
import {Keyboard, Lightning, Magnet, MaterialThree} from "@icon-park/react";

//将DesignerFooter调整为hook组件
const DesignerFooter = () => {

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

    const {layerConfigs, enableAdsorption} = layerManager;
    const {hotKeyVisible, snapShotVisible} = footerStore;
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
            </div>
            <div className={'footer-right'}>
                <div className={'right-info-item'}>缩放 : {(scale * 100).toFixed(0)}%</div>
                <div className={'right-info-item'}>图层 : {Object.keys(layerConfigs).length}</div>
            </div>
            {hotKeyVisible && <HotKeyDes onClose={toggleHotKeyDes}/>}
            {snapShotVisible && <CoverConfig onClose={toggleSnapShot}/>}
        </div>
    );

}

export default observer(DesignerFooter);