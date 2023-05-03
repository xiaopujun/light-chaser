import React, {Component} from 'react';
import {ClockCircleFilled, GoldenFilled, ProfileFilled} from "@ant-design/icons";
import '../style/LcDesignerFooter.less';

class DesignerFooter extends Component {
    render() {
        return (
            <div className={'lc-designer-footer'}>
                <div className={'footer-left'}>
                    <div className={'footer-item'}>
                        <span className={'item-content'}><ClockCircleFilled/>&nbsp;历史记录</span>
                    </div>
                    <div className={'footer-item'}>
                        <span className={'item-content'}><ProfileFilled/>&nbsp;图层</span>
                    </div>
                    <div className={'footer-item'}>
                        <span className={'item-content'}><GoldenFilled/>&nbsp;快捷键</span>
                    </div>
                </div>
                <div className={'footer-right'}>
                    <div className={'right-info-item'}>坐标(23 : 88)</div>
                    <div className={'right-info-item'}>缩放 : 300%</div>
                    <div className={'right-info-item'}>当前组件数 : 15</div>
                    <div className={'right-info-item'}>项目 : 测试大屏DEMO</div>
                    <div className={'right-info-item'}>状态 : 发布</div>
                </div>
            </div>
        );
    }
}

export default DesignerFooter;