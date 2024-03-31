import {Component} from 'react';
import './DesignerFooter.less';
import {observer} from "mobx-react";
import designerStore from "../store/DesignerStore";
import {HotKeyDes} from "./hotkey-des/HotKeyDes";
import footerStore from "./FooterStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {CameraOutlined, LaptopOutlined} from "@ant-design/icons";
import {CoverConfig} from "./cover/CoverConfig.tsx";

class DesignerFooter extends Component {

    toggleHotKeyDes = () => {
        const {hotKeyVisible, setHotKeyVisible} = footerStore;
        setHotKeyVisible(!hotKeyVisible)
    }

    toggleSnapShot = () => {
        const {snapShotVisible, setSnapShotVisible} = footerStore;
        setSnapShotVisible(!snapShotVisible)
    }

    render() {
        const {layerConfigs} = designerStore;
        const {hotKeyVisible, snapShotVisible} = footerStore;
        const {scale} = eventOperateStore;
        return (
            <div className={'lc-designer-footer'}>
                <div className={'footer-left'}>
                    <div className={'footer-item'} onClick={this.toggleHotKeyDes}>
                        <LaptopOutlined/>
                        <span>快捷键</span>
                    </div>
                    <div className={'footer-item'} onClick={this.toggleSnapShot}>
                        <CameraOutlined/>
                        <span>封面</span>
                    </div>
                </div>
                <div className={'footer-right'}>
                    <div className={'right-info-item'}>缩放 : {(scale * 100).toFixed(0)}%</div>
                    <div className={'right-info-item'}>图层 : {Object.keys(layerConfigs).length}</div>
                </div>
                {hotKeyVisible && <HotKeyDes onClose={this.toggleHotKeyDes}/>}
                {snapShotVisible && <CoverConfig onClose={this.toggleSnapShot}/>}
            </div>
        );
    }
}

export default observer(DesignerFooter);