import {Radio} from 'antd';
import React, {Component} from 'react';
import './style/AxisConfig.less';
import LcUnderLineInput from "../../base/LcUnderLineInput";
import BaseColorPicker from "../../base/BaseColorPicker";

interface AxisConfigProps {

}

/**
 * 轴线配置项
 */
class AxisConfig extends Component<AxisConfigProps> {
    render() {
        return (
            <div className={'axis-config'}>
                <div className={'axis-config-row'}>
                    <div className={'axis-config-title'}>位置</div>
                    <div className={'axis-config-body'}>
                        <Radio.Group defaultValue={1}>
                            <Radio value={1}>上</Radio>
                            <Radio value={2}>下</Radio>
                            <Radio value={3}>左</Radio>
                            <Radio value={4}>右</Radio>
                        </Radio.Group>
                    </div>
                </div>
                <div className={'axis-config-row'}>
                    <div className={'axis-config-title'}>标题</div>
                    <div className={'axis-config-body'}>
                        <div className={'axis-config-item'}>
                            <div className={'axis-title'}>
                                <LcUnderLineInput inputStyle={{textAlign: 'center'}}
                                                  type={'text'}/>
                            </div>
                        </div>
                        <div className={'axis-config-item'}>
                            <div>颜色</div>
                            <BaseColorPicker/>
                        </div>

                    </div>
                </div>
                <div className={'axis-config-row'}>
                    <div className={'axis-config-title'}>标签</div>
                    <div className={'axis-config-body'}></div>
                </div>
                <div className={'axis-config-row'}>
                    <div className={'axis-config-title'}>轴线</div>
                    <div className={'axis-config-body'}></div>
                </div>
                <div className={'axis-config-row'}>
                    <div className={'axis-config-title'}>网格</div>
                    <div className={'axis-config-body'}></div>
                </div>
                <div className={'axis-config-row'}>
                    <div className={'axis-config-title'}>刻度</div>
                    <div className={'axis-config-body'}></div>
                </div>
                <div className={'axis-config-row'}>
                    <div className={'axis-config-title'}>子刻度</div>
                    <div className={'axis-config-body'}></div>
                </div>
            </div>
        );
    }
}

export default AxisConfig;