import React, {Component} from 'react';
import './DesignerFooter.less';
import eventOperateStore from "../operate-provider/EventOperateStore";
import {observer} from "mobx-react";
import designerStore from "../store/DesignerStore";

class DesignerFooter extends Component {
    render() {
        const {scale} = eventOperateStore;
        const {layoutConfigs, projectConfig: {name, state}} = designerStore;
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
                <div className={'footer-left'}/>
                <div className={'footer-right'}>
                    <div className={'right-info-item'}>缩放 : {(scale * 100).toFixed(0)}%</div>
                    <div className={'right-info-item'}>当前组件数 : {layoutConfigs.length}</div>
                    <div className={'right-info-item'}>项目 : {name}</div>
                    <div className={'right-info-item'}>状态 : {stateStr}</div>
                </div>
            </div>
        );
    }
}

export default observer(DesignerFooter);