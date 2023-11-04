import React from "react";
import './BPFooter.less';
import bpStore from "../store/BPStore";
import {observer} from "mobx-react";

export const BPFooter: React.FC = observer(() => {
    const {canvasScale} = bpStore;
    return (
        <div className={'bp-footer'}>
            <div className={'bp-footer-item'}>缩放:{(canvasScale * 100).toFixed(0)}%</div>
        </div>
    )
})
