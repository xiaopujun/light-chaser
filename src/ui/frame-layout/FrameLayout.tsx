import React, {ReactNode} from "react";
import './FrameLayout.less';

export interface FrameLayoutProps {
    header?: ReactNode;
    footer?: ReactNode;
    left?: ReactNode;
    right?: ReactNode;
    content?: ReactNode;
}

export const FrameLayout: React.FC<FrameLayoutProps> = (props) => {
    const {header, footer, left, right, content} = props;
    return (
        <div className={'frame-layout'}>
            <div className={'fl-header'}>{header}</div>
            <div className={'fl-body'}>
                <div className={'fl-left'}>{left}</div>
                <div className={'fl-crf-box'}>
                    <div className={'fl-cr-box'}>
                        <div className={'fl-content'}>{content}</div>
                        <div className={'fl-right'}>{right}</div>
                    </div>
                    <div className={'fl-footer'}>{footer}</div>
                </div>
            </div>
        </div>
    )
}
