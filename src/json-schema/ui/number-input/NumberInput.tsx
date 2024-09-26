import {ChangeEvent, useRef, useState} from 'react';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import './NumberInput.less';

export interface NumberInputProps extends UIContainerProps {
    value?: number;
    defaultValue?: number;
    prefix?: string;
    suffix?: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (data: number) => void;
}

export default function NumberInput(props: NumberInputProps) {
    const {
        value, defaultValue, prefix, suffix, min,
        max, step = 1, disabled, onChange, ...containerProps
    } = props;

    const startX = useRef(0);
    const startValue = useRef(value||defaultValue);
    const currentValue = useRef(value||defaultValue);

    const [val, setVal] = useState(defaultValue);
    const [cursorType, setCursorType] = useState("e-resize");

    const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(Number(event.target.value));
        setVal(Number(event.target.value));
    }

    const onMouseDown = (e) => {
        startX.current = e.clientX;
        startValue.current = Number(startValue.current);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        const diffX = e.clientX - startX.current;
        const newValue = startValue.current + diffX;
        if(min<= newValue && newValue<=max){
            setVal(newValue);
            onChange && onChange(Number(newValue));
            currentValue.current = newValue;
        }else if(!min &&!max ){
            setVal(newValue);
            onChange && onChange(Number(newValue));
            currentValue.current = newValue;
        }else if(Number.isNaN(min) && min<=newValue){
            setVal(newValue);
            onChange && onChange(Number(newValue));
            currentValue.current = newValue;
        }else if(Number.isNaN(max) && max>=newValue){
            setVal(newValue);
            onChange && onChange(Number(newValue));
            currentValue.current = newValue;
        }
        setCursorType("none");
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        setCursorType("e-resize");
        startValue.current = currentValue.current;
    };


    return (
        <UIContainer {...containerProps}>
            <div className={'lc-number-input-content'}>
                {prefix && <div>{prefix}&nbsp;</div>}
                <div className={'lc-number-input-body'} onMouseDown={onMouseDown}>
                    <input value={val}
                           defaultValue={defaultValue}
                           disabled={disabled}
                           min={min}
                           max={max}
                           step={step}
                           type={'number'}
                           className={'lc-number-input'}
                           style={{cursor: `${cursorType}`}}
                           onChange={_onChange}/>
                </div>
                {suffix && <div>&nbsp;{suffix}</div>}
            </div>
        </UIContainer>
    );
}
