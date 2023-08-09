import React, {Component} from 'react';
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import LcSwitch from "../../../lib/lc-switch/LcSwitch";
import 'animate.css';
import './AnimationConfig.less';
import LcButton from "../../../lib/lc-button/LcButton";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import { ConfigType } from '../../../designer/right/ConfigType';

class AnimationConfig extends Component<ConfigType> {
    render() {
        return (
            <div className={'lc-animation-config'}>
                <LcButton style={{width: '100%'}}>清除动画</LcButton>
                <ConfigCard title={'动画配置'}>
                    <ConfigItem title={'效果'}>
                        <div style={{color: '#b2b2b2', fontSize: 12}}>向上滑动</div>
                    </ConfigItem>
                    <ConfigItem title={'时间'}>
                        <UnderLineInput defaultValue={1}/>
                    </ConfigItem>
                    <ConfigItem title={'延迟'}>
                        <UnderLineInput defaultValue={1}/>
                    </ConfigItem>
                    <ConfigItem title={'次数'}>
                        <UnderLineInput defaultValue={1}/>
                    </ConfigItem>
                    <ConfigItem title={'循环'}>
                        <LcSwitch/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'动画列表'}>
                    <div className={'animation-item animate__animated animate__bounce'}>bounce</div>
                    <div className={'animation-item animate__animated animate__flash'}>flash</div>
                    <div className={'animation-item animate__animated animate__pulse'}>pulse</div>
                    <div className={'animation-item animate__animated animate__fadeIn'}>fadeIn</div>
                    <div className={'animation-item animate__animated animate__fadeInDown'}>fadeInDown</div>
                    <div className={'animation-item animate__animated animate__fadeInLeft'}>fadeInLeft</div>
                    <div className={'animation-item animate__animated animate__fadeInRight'}>fadeInRight</div>
                    <div className={'animation-item animate__animated animate__fadeInUp'}>fadeInUp</div>
                    <div className={'animation-item animate__animated animate__slideInDown'}>slideInDown</div>
                    <div className={'animation-item animate__animated animate__slideInLeft'}>slideInLeft</div>
                    <div className={'animation-item animate__animated animate__slideInRight'}>slideInRight</div>
                    <div className={'animation-item animate__animated animate__slideInUp'}>slideInUp</div>
                </ConfigCard>
            </div>
        );
    }
}

export default AnimationConfig;