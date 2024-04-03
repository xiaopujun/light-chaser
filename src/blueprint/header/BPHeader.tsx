import React from "react";
import './BPHeader.less';
import {LineOutlined} from "@ant-design/icons";
import headerStore from "../../designer/header/HeaderStore";
import bpStore from "../store/BPStore";

const BPHeader: React.FC = () => {
    return (
        <div className={'bp-header'}>
            <div className={'bp-header-title'}>蓝图编辑器</div>
            <div className={'bp-header-menu'}><LineOutlined onClick={() => {
                const {setBluePrintVisible} = headerStore;
                setBluePrintVisible(false);
                const {setCanvasTranslate, setCanvasScale} = bpStore;
                setCanvasTranslate({x: 0, y: 0});
                setCanvasScale(1);
            }}/></div>
        </div>
    )
}

export default BPHeader;
