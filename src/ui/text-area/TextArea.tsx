import React, {ChangeEvent, useState} from 'react';
import './TextArea.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface TextAreaProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    onChange?: (data: string) => void;
}

/**
 * 下滑线输入框
 */
export const TextArea: React.FC<TextAreaProps> = (props) => {
    const {value, defaultValue, ...rest} = props;
    const control = !!value && !defaultValue;
    const [text, setText] = useState(defaultValue);

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.stopPropagation();
        const {onChange} = props;
        onChange && onChange(event.target.value);
        if (!control)
            setText(event.target.value);
    }

    return (
        <UIContainer {...rest}>
            <div className={'lc-text-area-container'}>
                <textarea value={control ? value : text} onChange={onChange} className={'lc-text-area'}/>
            </div>
        </UIContainer>
    );
}

export default TextArea;