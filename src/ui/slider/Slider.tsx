import React from "react";
import {Slider as AntdSlider} from "antd";
import './Slider.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface SliderProps extends UIContainerProps {
    value?: number;
    max?: number;
    min?: number;
    step?: number;
    defaultValue?: number;
}

export const Slider: React.FC<SliderProps> = (props) => {
    const {defaultValue, max, min, step, ...containerProps} = props;
    return (
        <UIContainer {...containerProps} className={'lc-slider'}>
            <div className={'lc-slider-body'}>
                <AntdSlider max={max} min={min} step={step} defaultValue={defaultValue}/>
            </div>
        </UIContainer>
    )
}
