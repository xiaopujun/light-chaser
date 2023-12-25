import {Component} from 'react';
import './DesignerFooter.less';
import {observer} from "mobx-react";
import designerStore from "../store/DesignerStore";
import Dialog from "../../ui/dialog/Dialog";
import HotKeyDes from "./HotKeyDes";
import footerStore from "./FooterStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {LaptopOutlined} from "@ant-design/icons";

class DesignerFooter extends Component {

    toggleHotKeyDes = () => {
        const {hotKeyVisible, setHotKeyVisible} = footerStore;
        setHotKeyVisible(!hotKeyVisible)
    }

    render() {
        const {layerConfigs, projectConfig: {name, state}} = designerStore;
        const {hotKeyVisible} = footerStore;
        const {scale} = eventOperateStore;
        let stateStr = '';
        switch (state) {
            case '0':
                stateStr = '草稿';
                break;
            case '1':
                stateStr = '发布';
                break;
            case '2':
                stateStr = '封存';
                break;
        }
        return (
            <div className={'lc-designer-footer'}>
                <div className={'footer-left'}>
                    <div className={'footer-item'} onClick={this.toggleHotKeyDes}>
                        <LaptopOutlined/>
                        <span>快捷键</span>
                    </div>
                </div>
                <div className={'footer-right'}>
                    <div className={'right-info-item'}>缩放 : {(scale * 100).toFixed(0)}%</div>
                    <div className={'right-info-item'}>图层 : {Object.keys(layerConfigs).length}</div>
                    <div className={'right-info-item'}>项目 : {name}</div>
                    <div className={'right-info-item'}>状态 : {stateStr}</div>
                </div>
                <Dialog title={'快捷键说明'} visible={hotKeyVisible} width={500} onClose={this.toggleHotKeyDes}>
                    <HotKeyDes/>
                </Dialog>
            </div>
        );
    }
}

export default observer(DesignerFooter);