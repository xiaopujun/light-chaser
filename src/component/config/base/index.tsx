import React, {Component} from 'react';
import {Collapse, InputNumber, Select, Slider} from "antd";
import ColorPicker from "../../color_picker/BaseColorPicker";
import './style/index.less';
import LCPaddingSet from "./LCPaddingSet";
import LCBaseBorderSet from "./LCBaseBorderSet";

const {Panel} = Collapse;
const {Option} = Select;

/**
 * 组件基础设置
 */
class ElemBaseSet extends Component<any> {

    paddingChanged = (padding: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({padding: padding});
    }

    backgroundColorChanged = (color: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({backgroundColor: color});
    }


    borderTypeChanged = (borderType: string) => {

    }

    render() {
        return (
            <div className={'elem-base-config'}>
                <Collapse className={'base-config-collapse'} bordered={false}>
                    <Panel className={'base-config-panel'} header="内边距" key="1">
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>内边距：</label>
                            <div className={'config-item-value lc-input-value'}>
                                <LCPaddingSet onChange={this.paddingChanged}/>
                            </div>
                        </div>
                    </Panel>
                    <Panel className={'charts-properties-title'} header="边框" key="3">
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>边框类型：</label>
                            <Select defaultValue={'BaseBorder'} style={{width: '60%'}}
                                    onChange={this.borderTypeChanged}>
                                <Option value="BaseBorder">基础边框</Option>
                                <Option value="FourAngleGlow">四角辉光</Option>
                            </Select>
                        </div>
                        <LCBaseBorderSet {...this.props}/>
                    </Panel>
                    <Panel className={'charts-properties-title'} header="背景" key="4">
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>颜色：</label>
                            <ColorPicker className={'config-item-value'}
                                         onChange={this.backgroundColorChanged}/>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default ElemBaseSet;