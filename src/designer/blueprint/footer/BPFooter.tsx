import React from "react";
import './BPFooter.less';
import bluePrintManager from "../manager/BluePrintManager.ts";
import {observer} from "mobx-react";

const BPFooter: React.FC = observer(() => {
    const {canvasScale} = bluePrintManager;
    return (
        <div className={'bp-footer'}>
            <div className={'bp-footer-item'}>缩放:{(canvasScale * 100).toFixed(0)}%</div>
        </div>
    )
})

export default BPFooter;
