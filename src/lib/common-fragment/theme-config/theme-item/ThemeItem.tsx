import React, {Component} from 'react';
import {Checkbox} from "antd";
import BaseColorPicker from "../../../lc-color-picker/BaseColorPicker";
import './ThemeItem.less';
import LcSwitch from "../../../lc-switch/LcSwitch";
import {Theme} from "../../../../framework/types/DesignerType";

interface ThemeItemProps extends Theme {
    active?: boolean;
}

class ThemeItem extends Component<ThemeItemProps> {
    render() {
        const {main, text, background, auxiliary, emphasize, supplementary, active = false} = this.props;
        return (
            <div className={`lc-theme-item ${active ? 'lc-theme-item-active' : ''}`}>
                <div className={'lc-theme-item-header'}>
                    <div className={'lc-theme-item-title'}>主题名称</div>
                    <div className={'lc-theme-item-switch'}>编辑</div>
                </div>
                <div className={'lc-theme-item-body'}>
                    <BaseColorPicker value={main} style={{width: 30, borderRadius: 17}}/>
                    <BaseColorPicker value={text} style={{width: 30, borderRadius: 17}}/>
                    <BaseColorPicker value={background} style={{width: 30, borderRadius: 17}}/>
                    <BaseColorPicker value={auxiliary} style={{width: 30, borderRadius: 17}}/>
                    <BaseColorPicker value={emphasize} style={{width: 30, borderRadius: 17}}/>
                    <BaseColorPicker value={supplementary} style={{width: 30, borderRadius: 17}}/>
                </div>
            </div>
        );
    }
}

export default ThemeItem;