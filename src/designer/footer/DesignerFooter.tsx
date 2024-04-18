import './DesignerFooter.less';
import {observer} from "mobx-react";
import layerManager from "../manager/LayerManager.ts";
import {HotKeyDes} from "./hotkey-des/HotKeyDes";
import footerStore from "./FooterStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {CameraOutlined, FileMarkdownOutlined, GithubOutlined, LaptopOutlined} from "@ant-design/icons";
import {CoverConfig} from "./cover/CoverConfig.tsx";

//将DesignerFooter调整为hook组件
const DesignerFooter = () => {

    const toggleHotKeyDes = () => {
        const {hotKeyVisible, setHotKeyVisible} = footerStore;
        setHotKeyVisible(!hotKeyVisible)
    }

    const toggleSnapShot = () => {
        const {snapShotVisible, setSnapShotVisible} = footerStore;
        setSnapShotVisible(!snapShotVisible)
    }

    const {layerConfigs} = layerManager;
    const {hotKeyVisible, snapShotVisible} = footerStore;
    const {scale} = eventOperateStore;
    return (
        <div className={'lc-designer-footer'}>
            <div className={'footer-left'}>
                <div className={'footer-item'} onClick={toggleHotKeyDes}>
                    <LaptopOutlined/>
                    <span>快捷键</span>
                </div>
                <div className={'footer-item'} onClick={toggleSnapShot}>
                    <CameraOutlined/>
                    <span>封面</span>
                </div>
                <div className={'footer-item'}
                     onClick={() => window.open('https://xiaopujun.github.io/light-chaser-doc')}>
                    <FileMarkdownOutlined/>
                    <span>文档</span>
                </div>
                <div className={'footer-item'} onClick={() => window.open("https://github.com/xiaopujun/light-chaser")}>
                    <GithubOutlined/>
                    <span>GitHub</span>
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