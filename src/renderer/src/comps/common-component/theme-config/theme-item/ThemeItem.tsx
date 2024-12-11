import React, {Component} from 'react';
import './ThemeItem.less';
import {ThemeColors, ThemeItemType} from "../../../../designer/DesignerType";
import ColorPicker from "../../../../json-schema/ui/color-picker/ColorPicker";
import {Close} from "@icon-park/react";


interface ThemeItemProps extends ThemeColors {
    //用于标识。 该主题是否被选中被选中的主题边框颜色与其他主题不同。
    selected?: boolean;
    name?: string;
    colors: ThemeColors;
    id?: string;
    itemStyle?: React.CSSProperties;
    showOperator?: boolean;
    onDel?: (id: string) => void;
    onSelected?: (data: ThemeItemType) => void;
}

class ThemeItem extends Component<ThemeItemProps> {

    onSelected = () => {
        const {onSelected, id = '', name = '', colors} = this.props;
        onSelected && onSelected({id, name, colors});
    }

    render() {
        const {colors, selected = false, itemStyle, name, id, showOperator = false, onDel} = this.props;
        return (
            <div id={id} className={`lc-theme-item ${selected ? 'lc-theme-item-active' : ''}`} style={itemStyle}
                 onClick={this.onSelected}>
                <div className={'lc-theme-item-header'}>
                    <div className={'lc-theme-item-title'}>{name}</div>
                    {showOperator && <div className={'lc-theme-item-operators'}>
                        <div className={'operator-item'} onClick={(event) => {
                            event.stopPropagation();
                            onDel && onDel(id || '')
                        }}>
                            <Close/>
                        </div>
                    </div>}
                </div>
                <div className={'lc-theme-item-body'}>
                    {
                        Object.keys(this.props.colors).map((key, index) => {
                            return <ColorPicker disabled={true} key={index} value={(colors)[key as keyof ThemeColors]}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default ThemeItem;