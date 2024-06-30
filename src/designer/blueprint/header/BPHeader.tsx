import React from "react";
import './BPHeader.less';
import bluePrintHdStore from "../../header/items/blue-print/BluePrintHdStore.ts";
import {Close} from "@icon-park/react";
import editDesignerManager from "../../manager/EditDesignerManager.ts";

const BPHeader: React.FC = () => {
    return (
        <div className={'bp-header'}>
            <div className={'bp-header-title'}>蓝图编辑器</div>
            <div className={'bp-header-menu'}><Close style={{cursor: 'pointer'}} onClick={() => {
                const {setBluePrintVisible} = bluePrintHdStore;
                setBluePrintVisible(false);
                const {setCanvasTranslate, setCanvasScale} = editDesignerManager.bluePrintManager;
                setCanvasTranslate({x: 0, y: 0});
                setCanvasScale(1);
            }}/></div>
        </div>
    )
}

export default BPHeader;
