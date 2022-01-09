import React, {Component} from 'react';
import {Collapse, Select, Slider} from "antd";
import ColorPicker from "../../color-picker/base";
import './index.less';

const {Panel} = Collapse;
const {Option} = Select;

/**
 * 组件基础设置
 */
class ElemBaseSet extends Component<any> {

    paddingTopChanged = (value: number) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({paddingTop: `${value}px`});
    }
    paddingLeftChanged = (value: number) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({paddingLeft: `${value}px`});
    }
    paddingRightChanged = (value: number) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({paddingRight: `${value}px`});
    }
    paddingBottomChanged = (value: number) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({paddingBottom: `${value}px`});
    }
    backgroundColorChanged = (color: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({backgroundColor: color});
    }

    render() {
        return (
            <div className={'elem-base-config'}>
                <Collapse className={'base-config-collapse'} bordered={false} defaultActiveKey={['1']}>
                    <Panel className={'base-config-panel'} header="内边距" key="1">
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>上内边距：</label>
                            <Slider defaultValue={10} max={100} min={8} style={{width: '60%'}}
                                    onChange={this.paddingTopChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>下内边距：</label>
                            <Slider defaultValue={10} max={100} min={8} style={{width: '60%'}}
                                    onChange={this.paddingBottomChanged} className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>左内边距：</label>
                            <Slider defaultValue={10} max={100} min={8} style={{width: '60%'}}
                                    onChange={this.paddingLeftChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>右内边距：</label>
                            <Slider defaultValue={10} max={100} min={8} style={{width: '60%'}}
                                    onChange={this.paddingRightChanged}
                                    className={'config-item-value'}/>
                        </div>
                    </Panel>
                    <Panel className={'base-config-panel'} header="外边距" key="2">
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>上外边距：</label>
                            <Slider defaultValue={10} max={100} min={8} style={{width: '60%'}}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>下外边距：</label>
                            <Slider defaultValue={10} max={100} min={8} style={{width: '60%'}}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>左外边距：</label>
                            <Slider defaultValue={10} max={100} min={8} style={{width: '60%'}}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>右外边距：</label>
                            <Slider defaultValue={10} max={100} min={8} style={{width: '60%'}}
                                    className={'config-item-value'}/>
                        </div>
                    </Panel>
                    <Panel className={'charts-properties-title'} header="边框" key="3">
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>样式：</label>
                            <Select defaultValue={'solid'} style={{width: '60%'}}>
                                <Option value="dotted">点</Option>
                                <Option value="dashed">虚线</Option>
                                <Option value="solid">实线</Option>
                            </Select>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>宽度：</label>
                            <Slider defaultValue={0} max={10} min={0} style={{width: '60%'}}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>圆角：</label>
                            <Slider defaultValue={0} max={10} min={0} style={{width: '60%'}}
                                    className={'config-item-value'}/>
                        </div>
                    </Panel>
                    <Panel className={'charts-properties-title'} header="背景" key="4">
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>颜色：</label>
                            <ColorPicker name={'mainTitleColor'}
                                         className={'config-item-value'}
                                         onChange={this.backgroundColorChanged}/>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default ElemBaseSet;