import {useRef, useState} from 'react';
import './ColorsPicker.less';
import ColorPicker from "../color-picker/ColorPicker";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

interface ColorsPickerProp extends UIContainerProps {
    value?: string[];
    defaultValue?: string[];
    canAdd?: boolean;
    onChange?: (data: string[]) => void;
}

export default function ColorsPicker(props: ColorsPickerProp) {
    const {value, defaultValue, canAdd, onChange, ...containerProps} = props;
    const controlled = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState(controlled ? value : defaultValue);
    const [stateCanAdd, setStateCanAdd] = useState(!!canAdd);
    const finalValue = controlled ? value : stateValue;
    const maxRef = useRef<number>(5);

    const _onChange = (color: string, id: number) => {
        const tempValue = [...finalValue];
        tempValue[id] = color;
        onChange && onChange(tempValue);
        if (!controlled)
            setStateValue(tempValue);
    }

    const addColor = () => {
        const tempValue = [...finalValue];
        if (tempValue?.length >= maxRef.current)
            return;
        tempValue.push('#a9a9a9');
        if (tempValue.length === maxRef.current)
            setStateCanAdd(false);
        setStateValue(tempValue);
        onChange && onChange(tempValue);
    }

    const delColor = (id: number) => {
        const tempValue = [...finalValue];
        tempValue.splice(id, 1);
        if (tempValue.length < maxRef.current)
            setStateCanAdd(true);
        setStateValue(tempValue);
        onChange && onChange(tempValue);
    }

    return (
        <UIContainer {...containerProps}>
            <div className={'colors-picker'}>
                {finalValue?.map((item: string, i: number) => {
                    return (
                        <div className={"colors-item"} key={i + ''}>
                            <ColorPicker value={item}
                                         onChange={(color: string) => _onChange(color, i)}/>
                            <span onClick={() => delColor(i)}><label>×</label></span>
                        </div>
                    )
                })}
                {stateCanAdd &&
                <div onClick={addColor} className={'colors-pick-add-btn'}><span>+</span></div>}
            </div>
        </UIContainer>
    )
}