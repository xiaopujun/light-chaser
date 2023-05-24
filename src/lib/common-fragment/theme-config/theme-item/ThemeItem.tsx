import React, {Component} from 'react';
import BaseColorPicker from "../../../lc-color-picker/BaseColorPicker";
import './ThemeItem.less';
import {Theme} from "../../../../framework/types/DesignerType";

interface ThemeItemProps extends Theme {
    active?: boolean;
    itemStyle?: React.CSSProperties;
}

class ThemeItem extends Component<ThemeItemProps> {
    render() {
        const {main, text, background, auxiliary, emphasize, supplementary, active = false, itemStyle} = this.props;
        return (
            <div className={`lc-theme-item ${active ? 'lc-theme-item-active' : ''}`} style={itemStyle}>
                <div className={'lc-theme-item-header'}>
                    <div className={'lc-theme-item-title'}>主题名称</div>
                    <div className={'lc-theme-item-switch'}>编辑</div>
                </div>
                <div className={'lc-theme-item-body'}>
                    <BaseColorPicker value={main} style={{width: 20, borderRadius: 20}}/>
                    <BaseColorPicker value={text} style={{width: 20, borderRadius: 20}}/>
                    <BaseColorPicker value={background} style={{width: 20, borderRadius: 20}}/>
                    <BaseColorPicker value={auxiliary} style={{width: 20, borderRadius: 20}}/>
                    <BaseColorPicker value={emphasize} style={{width: 20, borderRadius: 20}}/>
                    <BaseColorPicker value={supplementary} style={{width: 20, borderRadius: 20}}/>
                </div>
            </div>
        );
    }
}

export default ThemeItem;