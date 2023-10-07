import React, {useEffect} from "react";

export interface BPEventProps {
    children?: React.ReactNode;
}

export const BPEvent: React.FC<BPEventProps> = (props) => {
    const {children} = props;
    const ref = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        // ref.current && ref.current.addEventListener('click', (e) => {
        //     console.log('mousedown', e);
        // });
    });
    return (
        <div ref={ref} className={'blue-print'} style={{width: '100%', height: '100%', position: 'relative'}}>
            {children}
        </div>
    )
}
