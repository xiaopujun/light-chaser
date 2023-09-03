import React, {Component} from 'react';
import './Footer.less';
import {observer} from "mobx-react";
import designerStore from "../store/DesignerStore";
import Dialog from "../../lib/lc-dialog/Dialog";
import HotKeyDes from "./HotKeyDes";
import layerListStore from "../float-configs/layer-list/LayerListStore";
import keyboardIcon from './keyboard-icon.svg';
import layerIcon from './layers-icon.svg';
import footerStore from "./FooterStore";

class Footer extends Component {

    state = {
        showHotKeyDes: false
    }

    toggleHotKeyDes = () => {
        const {showHotKeyDes} = this.state;
        this.setState({
            showHotKeyDes: !showHotKeyDes
        })
    }

    toggleLayerList = () => {
        const {setVisible, visible} = layerListStore;
        setVisible && setVisible(!visible);
    }

    render() {
        const {layoutConfigs, projectConfig: {name, state}} = designerStore;
        const {size, coordinate, scale} = footerStore;
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
                        <img width={16} alt={'快捷键'}
                             src={keyboardIcon}/>
                        &nbsp;
                        <span style={{position: 'relative', top: 2}}>快捷键</span>
                    </div>
                    <div className={'footer-item'} onClick={this.toggleLayerList}>
                        <img width={16} alt={'图层'} src={layerIcon}/>
                        &nbsp;
                        <span style={{position: 'relative', top: 2}}>图层</span>
                    </div>
                </div>
                <div className={'footer-right'}>
                    <div className={'right-info-item'}>
                        {`尺寸 (${parseInt(size[0] + '')} , ${parseInt(size[1] + '')})`}
                    </div>
                    <div className={'right-info-item'}>
                        {`坐标 (${parseInt(coordinate[0] + '')} , ${parseInt(coordinate[1] + '')})`}
                    </div>
                    <div className={'right-info-item'}>缩放 : {(scale * 100).toFixed(0)}%</div>
                    <div className={'right-info-item'}>当前组件数 : {Object.keys(layoutConfigs).length}</div>
                    <div className={'right-info-item'}>项目 : {name}</div>
                    <div className={'right-info-item'}>状态 : {stateStr}</div>
                </div>
                <Dialog title={'快捷键说明'} visible={this.state.showHotKeyDes} width={500} onClose={this.toggleHotKeyDes}>
                    <HotKeyDes/>
                </Dialog>
            </div>
        );
    }
}

export default observer(Footer);