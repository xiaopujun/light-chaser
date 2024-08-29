import React from "react";
import './BPFooter.less';
import {observer} from "mobx-react";
import BPGroup from "../group/BPGroup";
import bluePrintGroupManager from "../manager/BluePrintGroupManager";

const BPFooter: React.FC = observer(() => {
    const {bluePrintManager} = bluePrintGroupManager;
    const {canvasScale} = bluePrintManager;
    return (
        <div className={'bp-footer'}>
            <BPGroup/>
            <div className={'bp-footer-item'}>缩放:{(canvasScale * 100).toFixed(0)}%</div>
        </div>
    )
})

export default BPFooter;
