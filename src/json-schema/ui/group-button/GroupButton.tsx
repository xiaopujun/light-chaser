import {ReactNode, useState} from "react";
import "./GroupButton.less";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface BtnItemType {
    value: string;
    content: ReactNode | string;
}

export interface GroupButtonProps extends UIContainerProps {
    items: Array<BtnItemType>;
    onChange?: (value: string) => void;
    value?: string;
    defaultValue?: string;
}

export const GroupButton = (props: GroupButtonProps) => {
    const {items, onChange, value, defaultValue, ...containerProps} = props;
    const controlled = value !== undefined && defaultValue === undefined;
    const [data, setData] = useState(controlled ? value : defaultValue);
    const finalValue = controlled ? value : data;

    return (
        <UIContainer {...containerProps} className={'group-button'}>
            <div className={'group-btn-body'}>
                {items.map((item, index) => {
                    const {value, content} = item;
                    return (
                        <div key={index}
                             className={`group-btn-item ${finalValue === value ? 'group-btn-item-active' : ''}`}
                             onClick={(e) => {
                                 e.stopPropagation();
                                 if (!controlled)
                                     setData(value);
                                 onChange && onChange(value);
                             }}>{content}</div>
                    )
                })}
            </div>
        </UIContainer>
    );
}
