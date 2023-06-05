import React, {Component} from 'react';
import './DesignerFooter.less';
import eventOperateStore from "../operate-provider/EventOperateStore";
import {observer} from "mobx-react";
import designerStore from "../store/DesignerStore";

class DesignerFooter extends Component {
    render() {
        const {scale} = eventOperateStore;
        const {layoutConfigs} = designerStore;
        return (
            <div className={'lc-designer-footer'}>
                <div className={'footer-left'}></div>
                <div className={'footer-right'}>
                    <div className={'right-info-item'}>缩放 : {(scale * 100).toFixed(0)}%</div>
                    <div className={'right-info-item'}>当前组件数 : {layoutConfigs.length}</div>
                    <div className={'right-info-item'}>项目 : 测试大屏DEMO</div>
                    <div className={'right-info-item'}>状态 : 发布</div>
                </div>
            </div>
        );
    }
}

export default observer(DesignerFooter);