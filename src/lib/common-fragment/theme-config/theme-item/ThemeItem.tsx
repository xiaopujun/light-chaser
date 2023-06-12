import React, {Component} from 'react';
import BaseColorPicker from "../../../lc-color-picker/BaseColorPicker";
import './ThemeItem.less';
import {ThemeColors} from "../../../../designer/DesignerType";

interface ThemeItemProps extends ThemeColors {
    //用于标识。 该主题是否被选中被选中的主题边框颜色与其他主题不同。
    selected?: boolean;
    name?: string;
    colors: ThemeColors;
    id?: string;
    itemStyle?: React.CSSProperties;
    customRender?: React.ReactNode;
}

class ThemeItem extends Component<ThemeItemProps> {
    render() {
        const {
            colors: {main, text, background, auxiliary, emphasize, supplementary},
            selected = false, itemStyle, name = '主题名称', id, customRender
        } = this.props;
        return (
            <div id={id} className={`lc-theme-item ${selected ? 'lc-theme-item-active' : ''}`} style={itemStyle}>
                <div className={'lc-theme-item-header'}>
                    <div className={'lc-theme-item-title'}>{name}</div>
                    <div className={'lc-theme-item-operator'}>
                        {customRender}
                    </div>
                </div>
                <div className={'lc-theme-item-body'} onClick={() => {
                }}>
                    <BaseColorPicker disabled={true} value={main} style={{width: 20, borderRadius: 20}}/>
                    <BaseColorPicker disabled={true} value={text} style={{width: 20, borderRadius: 20}}/>
                    <BaseColorPicker disabled={true} value={background} style={{width: 20, borderRadius: 20}}/>
                    <BaseColorPicker disabled={true} value={auxiliary} style={{width: 20, borderRadius: 20}}/>
                    <BaseColorPicker disabled={true} value={emphasize} style={{width: 20, borderRadius: 20}}/>
                    <BaseColorPicker disabled={true} value={supplementary} style={{width: 20, borderRadius: 20}}/>
                </div>
            </div>
        );
    }
}

export default ThemeItem;