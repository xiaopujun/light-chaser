import React from "react";
import './Grid.less';

export interface GridProps {
    children?: React.ReactNode;
    columns?: number;
}

export const Grid: React.FC<GridProps> = (props) => {
    const {children, columns = 1} = props;
    const gtc = `repeat(${columns}, 1fr)`;
    return (
        <div style={{gridTemplateColumns: gtc}} className={'lc-grid-layout'}>{children}</div>
    )
}
