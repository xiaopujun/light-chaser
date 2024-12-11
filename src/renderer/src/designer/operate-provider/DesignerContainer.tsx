import {ReactNode} from 'react';

export interface DesignerContainerProps {
    children?: ReactNode;
}

export default function DesignerContainer(props: DesignerContainerProps) {
    return (
        <div style={{outline: 'none'}} className={'lc-event-container'}>
            {props.children}
        </div>
    );
}
