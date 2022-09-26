import React, {Component} from 'react';
import './style/BorderSet.less';
import getBorderSetDetail from "./border/BorderSetInit";
import {Select} from "antd";
import ColorPicker from "../../color_picker/BaseColorPicker";

const {Option} = Select;
export default class BorderSet extends Component<any> {
    borderTypeChanged = (data: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({borderType: data});
    }

    render() {
        const {LCDesignerStore} = this.props;
        const {chartConfigMap, active} = LCDesignerStore;
        let borderSetKey = chartConfigMap.get(active.id).elemBaseProperties.borderType + 'Set';
        const BorderSetDetail = getBorderSetDetail(borderSetKey);
        return (
            <>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>边框类型：</label>
                    <Select defaultValue={'BaseBorder'} className={'lc-config-item-value lc-select'}
                            onChange={this.borderTypeChanged}>
                        <Option value="BaseBorder">基础边框</Option>
                        <Option value="FourAngleGlowBorder">四角辉光</Option>
                    </Select>
                </div>
                <BorderSetDetail {...this.props}/>
            </>
        );
    }
}
