import {ColorPicker as AntdColorPicker} from 'antd';
import './ColorPicker.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

interface ColorPickerProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    showText?: boolean;
    disabled?: boolean;
    onChange?: (color: string) => void;
}

export default function ColorPicker(props: ColorPickerProps) {
    const {value, defaultValue, showText, disabled, onChange, ...containerProps} = props;

    const _onChange = (color: any) => {
        const value = color.toHexString();
        onChange && onChange(value);
    };

    return (
        <UIContainer {...containerProps} className={'lc-color-pick'}>
            <AntdColorPicker
                size={'small'}
                format={'hex'}
                disabled={disabled}
                value={value}
                defaultValue={defaultValue}
                showText={showText}
                onChange={_onChange}
            />
        </UIContainer>
    );
}