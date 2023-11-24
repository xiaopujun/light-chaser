import React from "react";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

interface TextOnlyProps extends UIContainerProps {
    defaultValue?: string;
}

export const TextOnly: React.FC<TextOnlyProps> = (props) => {
    const {defaultValue, tip, label} = props;
    return (
        <UIContainer tip={tip} label={label}>{defaultValue}</UIContainer>
    );
}