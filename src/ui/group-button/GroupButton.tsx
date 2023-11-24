import {ReactNode} from "react";
import "./GroupButton.less";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface BtnItemType {
    value: string;
    content: ReactNode | string;
}

export interface GroupButtonProps extends UIContainerProps {
    items: Array<BtnItemType>;
    onChange?: (value: string) => void;
}

export const GroupButton = (props: GroupButtonProps) => {

    const {items, onChange, ...containerProps} = props;
    return (
        <UIContainer {...containerProps} className={'group-button'}>
            <div className={'group-btn-body'}>
                {items.map((item, index) => {
                    const {value, content} = item;
                    return (
                        <div key={index} className={'group-btn-item'} onClick={(e) => {
                            e.stopPropagation();
                            onChange && onChange(value);
                        }}>{content}</div>
                    )
                })}
            </div>
        </UIContainer>
    );
}
