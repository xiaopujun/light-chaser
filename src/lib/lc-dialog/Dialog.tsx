import React, {Component} from 'react';
import ReactDOM from "react-dom";
import './Dialog.less';
import {LineOutlined} from "@ant-design/icons";

interface DialogProps {
    title: string;
    visible: boolean;
    onClose?: () => void;
    width?: number;
    height?: number;
    className?: string;
}

class Dialog extends Component<DialogProps> {

    onClose = () => {
        const {onClose} = this.props;
        onClose && onClose();
    }

    render() {
        const {title = '设置', visible = false, children, width = 400, height, className} = this.props;
        if (!visible)
            return null;
        return ReactDOM.createPortal(
            <div className={`lc-dialog lc-dialog-mask ${className}`}>
                <div className={'dialog-body'}>
                    <div className={'dialog-header'}>
                        <div className={'dialog-title'}>{title}</div>
                        <div className={'dialog-close'}><LineOutlined onClick={this.onClose}/></div>
                    </div>
                    <div className="dialog-content" style={{width, height, minHeight: 100}}>
                        {children}
                    </div>
                </div>
            </div>,
            document.body
        );
    }
}

export default Dialog;