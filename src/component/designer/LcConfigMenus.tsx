import React, {Component} from 'react';
import {DatabaseFilled, HighlightFilled, InfoCircleFilled, SkinFilled, VideoCameraFilled} from "@ant-design/icons";
import './style/LcConfigMenus.less';

interface LcConfigMenusProps {
    onChange?: (menu: string) => void;
}

class LcConfigMenus extends Component<LcConfigMenusProps | any> {

    menuChange = (e: any) => {
        const {onChange} = this.props;
        console.log(e.currentTarget.id)
        onChange && onChange(e.currentTarget.id);
    }

    render() {
        return (
            <div className={'lc-config-menu'}>
                <div className={'menu-list'}>
                    <div className={'menu-item'} id={'info'} onClick={this.menuChange}>
                        <div className={'item-icon'}><InfoCircleFilled/></div>
                        <div className={'item-content'}>信息</div>
                    </div>
                    <div className={'menu-item'} id={'style'} onClick={this.menuChange}>
                        <div className={'item-icon'}><HighlightFilled/></div>
                        <div className={'item-content'}>样式</div>
                    </div>
                    <div className={'menu-item'} id={'data'} onClick={this.menuChange}>
                        <div className={'item-icon'}><DatabaseFilled/></div>
                        <div className={'item-content'}>数据</div>
                    </div>
                    <div className={'menu-item'} id={'animation'} onClick={this.menuChange}>
                        <div className={'item-icon'}><VideoCameraFilled/></div>
                        <div className={'item-content'}>动画</div>
                    </div>
                    <div className={'menu-item'} id={'theme'} onClick={this.menuChange}>
                        <div className={'item-icon'}><SkinFilled/></div>
                        <div className={'item-content'}>主题</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LcConfigMenus;