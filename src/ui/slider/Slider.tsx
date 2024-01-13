import React from "react";
import {Slider as AntdSlider} from "antd";
import './Slider.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface SliderProps extends UIContainerProps {
    value?: number;
    defaultValue?: number;
    max?: number;
    min?: number;
    step?: number;
    onChange?: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = (props) => {
    const {value, defaultValue, max, min, step, onChange, ...containerProps} = props;
    return (
        <UIContainer {...containerProps} className={'lc-slider'}>
            <div className={'lc-slider-body'}>
                <AntdSlider max={max} min={min} step={step} defaultValue={defaultValue} value={value}
                            onChange={onChange}/>
            </div>
        </UIContainer>
    )
}
