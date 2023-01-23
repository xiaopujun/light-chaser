import {Radio} from 'antd';
import React, {Component} from 'react';
import './style/AxisConfig.less';
import LcUnderLineInput from "../../base/LcUnderLineInput";
import BaseColorPicker from "../../base/BaseColorPicker";
import LcConfigItem, {LayoutMode} from "../../base/LcConfigItem";
import LcSwitch from "../../base/LcSwitch";

interface AxisConfigProps {

}

/**
 * 轴线配置项
 */
class AxisConfig extends Component<AxisConfigProps> {
    render() {
        return (
            <div className={'axis-config'}>
                <div className={'axis-config-item'}>
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
                <div className={'axis-config-item'}>
                    <div className={'axis-config-title'}>标题</div>
                    <div className={'axis-config-body'}>
                        <LcConfigItem title={'开启'} layoutMode={LayoutMode.VL_UD}>
                            <LcSwitch/>
                        </LcConfigItem>
                        <LcConfigItem title={'内容'} className={''} layoutMode={LayoutMode.VL_UD}>
                            <LcUnderLineInput type={'text'}/>
                        </LcConfigItem>
                        <LcConfigItem title={'颜色'} layoutMode={LayoutMode.VL_UD}>
                            <BaseColorPicker style={{width: '80%', borderRadius: 2, height: 23}} showText={true}/>
                        </LcConfigItem>
                        <LcConfigItem title={'自动旋转'} layoutMode={LayoutMode.VL_UD}>
                            <LcSwitch/>
                        </LcConfigItem>
                    </div>
                </div>
                <div className={'axis-config-item'}>
                    <div className={'axis-config-title'}>标签</div>
                    <div className={'axis-config-body'}></div>
                </div>
                <div className={'axis-config-item'}>
                    <div className={'axis-config-title'}>轴线</div>
                    <div className={'axis-config-body'}></div>
                </div>
                <div className={'axis-config-item'}>
                    <div className={'axis-config-title'}>网格</div>
                    <div className={'axis-config-body'}></div>
                </div>
                <div className={'axis-config-item'}>
                    <div className={'axis-config-title'}>刻度</div>
                    <div className={'axis-config-body'}></div>
                </div>
                <div className={'axis-config-item'}>
                    <div className={'axis-config-title'}>子刻度</div>
                    <div className={'axis-config-body'}></div>
                </div>
            </div>
        );
    }
}

export default AxisConfig;