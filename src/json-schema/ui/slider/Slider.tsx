import {Slider as AntdSlider} from "antd";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface SliderProps extends UIContainerProps {
    value?: number;
    defaultValue?: number;
    max?: number;
    min?: number;
    step?: number;
    onChange?: (value: number) => void;
}

export const Slider = (props: SliderProps) => {
    const {value, defaultValue, max, min, step, onChange, ...containerProps} = props;
    return (
        <UIContainer {...containerProps} className={'lc-slider'}>
            <AntdSlider max={max} min={min} step={step} defaultValue={defaultValue} value={value}
                        onChange={onChange}/>
        </UIContainer>
    )
}

export interface RangeSliderProps extends UIContainerProps {
    value?: number[];
    defaultValue?: number[];
    max?: number;
    min?: number;
    step?: number;
    onChange?: (value: number[]) => void;
}

export const RangeSlider = (props: RangeSliderProps) => {
    const {value, defaultValue, max, min, step, onChange, ...containerProps} = props;
    return (
        <UIContainer {...containerProps} className={'lc-range-slider'}>
            <AntdSlider max={max} min={min} step={step} defaultValue={defaultValue} value={value} range={true}
                        onChange={onChange}/>
        </UIContainer>
    )
}
