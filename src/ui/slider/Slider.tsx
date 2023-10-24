import React from "react";
import {Slider as AntdSlider} from "antd";
import './Slider.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface SliderProps extends UIContainerProps {
    value?: number;
    defaultValue?: number;
}

export const Slider: React.FC<SliderProps> = (props) => {
    const {label, tip, defaultValue} = props;
    return (
        <UIContainer tip={tip} label={label} className={'lc-slider'}>
            <div className={'lc-slider-body'}>
                <AntdSlider defaultValue={defaultValue}/>
            </div>
        </UIContainer>
    )
}
