import React from "react";
import ReactDOM from "react-dom";
import {BluePrint} from "../../../../blueprint/BluePrint";

export const BluePrintHdImpl: React.FC = () => {
    return ReactDOM.createPortal(
        <div style={{
            position: 'relative',
            top: -window.innerHeight,
            zIndex: 2,
            width: '100%',
            height: '100%',
            backgroundColor: '#151515'
        }}>
            <BluePrint/>
        </div>, document.body)
}
