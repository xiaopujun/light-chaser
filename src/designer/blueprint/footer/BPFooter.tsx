import React from "react";
import './BPFooter.less';
import {observer} from "mobx-react";
import editDesignerManager from "../../manager/EditDesignerManager.ts";

const BPFooter: React.FC = observer(() => {
    const {canvasScale} = editDesignerManager.bluePrintManager;
    return (
        <div className={'bp-footer'}>
            <div className={'bp-footer-item'}>缩放:{(canvasScale * 100).toFixed(0)}%</div>
        </div>
    )
})

export default BPFooter;
