import React from "react";
import './Grid.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface GridProps extends UIContainerProps {
    children?: React.ReactNode;
    columns?: number;
    gridGap?: string;
}

export const Grid: React.FC<GridProps> = (props) => {
    const {children, columns = 1, tip, label, gridGap, padding, margin} = props;
    const gtc = `repeat(${columns}, 1fr)`;
    const gridStyle = {gridTemplateColumns: gtc, gridGap}
    return (
        <UIContainer tip={tip} label={label} className={'lc-grid'} margin={margin} padding={padding}>
            <div style={gridStyle} className={'lc-grid-layout'}>{children}</div>
        </UIContainer>
    )
}
