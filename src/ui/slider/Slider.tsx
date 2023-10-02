import React from "react";
import {Tooltip, Slider as AntdSlider} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import './Slider.less';

export interface SliderProps {
    value?: number;
    defaultValue?: number;
    label?: string;
    tip?: string;
}

export const Slider: React.FC<SliderProps> = (props) => {
    const {label, tip, value, defaultValue} = props;
    console.log(value, defaultValue)
    return (
        <div className={'lc-slider-container'}>
            {label && <div className={'lc-slider-label'}>{label}</div>}
            {tip && <div className={'lc-input-tip'}>
                <Tooltip title={tip}><QuestionCircleOutlined/>&nbsp;&nbsp;</Tooltip>
            </div>}
            <div className={'lc-slider'}>
                <AntdSlider defaultValue={defaultValue}/>
            </div>
        </div>
    )
}
