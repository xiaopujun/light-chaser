import React, {Component} from 'react';
import {DatabaseFilled, HighlightFilled, InfoCircleFilled, SkinFilled, VideoCameraFilled} from "@ant-design/icons";
import './style/LcConfigMenus.less';

class LcConfigMenus extends Component {
    render() {
        return (
            <div className={'lc-config-menu'}>
                <div className={'menu-list'}>
                    <div className={'menu-item'}>
                        <div className={'item-icon'}><InfoCircleFilled/></div>
                        <div className={'item-content'}>信息</div>
                    </div>
                    <div className={'menu-item'}>
                        <div className={'item-icon'}><HighlightFilled/></div>
                        <div className={'item-content'}>样式</div>
                    </div>
                    <div className={'menu-item'}>
                        <div className={'item-icon'}><DatabaseFilled/></div>
                        <div className={'item-content'}>数据</div>
                    </div>
                    <div className={'menu-item'}>
                        <div className={'item-icon'}><VideoCameraFilled/></div>
                        <div className={'item-content'}>动画</div>
                    </div>
                    <div className={'menu-item'}>
                        <div className={'item-icon'}><SkinFilled/></div>
                        <div className={'item-content'}>主题</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LcConfigMenus;