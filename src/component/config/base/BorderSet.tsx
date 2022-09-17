import React, {Component} from 'react';
import {Select} from "antd";
import ColorPicker from "../../color_picker/BaseColorPicker";
import LCNumberInput from "../../base/LCNumberInput";
import './style/BorderSet.less';
import BaseBorderSet from "./border/BaseBorderSet";

const {Option} = Select;

interface BorderSetProps {
    onChange?: () => void;
    updateElemBaseSet?: (data: any) => void;
}

export default class BorderSet extends Component<BorderSetProps> {

    borderTypeChanged = () => {

    }

    borderStyleChanged = (style: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({borderStyle: style});
    }
    borderWidthChanged = (width: number) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({borderWidth: `${width}px`});
    }
    borderColorChanged = (color: any) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({borderColor: color});
    }
    borderRadiusChanged = (radius: number) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({borderRadius: `${radius}px`});
    }

    render() {
        return (
            <>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>边框类型：</label>
                    <Select defaultValue={'BaseBorder'} className={'lc-select'} style={{width: '60%'}}
                            onChange={this.borderTypeChanged}>
                        <Option value="BaseBorder">基础边框</Option>
                        <Option value="FourAngleGlow">四角辉光</Option>
                    </Select>
                </div>
                <BaseBorderSet {...this.props}/>
            </>
        );
    }
}
