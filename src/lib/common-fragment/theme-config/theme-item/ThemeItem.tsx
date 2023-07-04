import React, {Component} from 'react';
import BaseColorPicker from "../../../lc-color-picker/BaseColorPicker";
import './ThemeItem.less';
import {ThemeColors, ThemeItemType} from "../../../../designer/DesignerType";
import closeIcon from './close.svg';
import flushIcon from './flush.svg';


interface ThemeItemProps extends ThemeColors {
    //用于标识。 该主题是否被选中被选中的主题边框颜色与其他主题不同。
    selected?: boolean;
    name?: string;
    colors: ThemeColors;
    id?: string;
    itemStyle?: React.CSSProperties;
    showOperator?: boolean;
    onDel?: (id: string) => void;
    onUpd?: (data: ThemeItemType) => void;
    onSelected?: (id: string) => void;
}

class ThemeItem extends Component<ThemeItemProps> {

    onUpd = () => {
        const {onUpd, id = '', name = '', colors = {}} = this.props;
        onUpd && onUpd({id, name, colors});
    }

    render() {
        const {
            colors: {main, text, background, auxiliary, emphasize, supplementary},
            selected = false, itemStyle, name, id, showOperator = false, onDel, onSelected
        } = this.props;
        return (
            <div id={id} className={`lc-theme-item ${selected ? 'lc-theme-item-active' : ''}`} style={itemStyle}
                 onClick={(() => onSelected && onSelected(id || ''))}>
                <div className={'lc-theme-item-header'}>
                    <div className={'lc-theme-item-title'}>{name}</div>
                    {showOperator && <div className={'lc-theme-item-operators'}>
                        <div className={'operator-item'} onClick={this.onUpd}>
                            <img src={flushIcon} alt={'编辑'}/>
                        </div>
                        <div className={'operator-item'} onClick={() => onDel && onDel(id || '')}>
                            <img src={closeIcon} alt={'删除'}/>
                        </div>
                    </div>}
                </div>
                <div className={'lc-theme-item-body'}>
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