import React from "react";
import './BPHeader.less';
import {LineOutlined} from "@ant-design/icons";
import headerStore from "../../designer/header/HeaderStore";


export const BPHeader: React.FC = () => {
    return (
        <div className={'bp-header'}>
            <div className={'bp-header-title'}>蓝图</div>
            <div className={'bp-header-menu'}><LineOutlined onClick={() => {
                const {setBluePrintVisible} = headerStore;
                setBluePrintVisible(false);
            }}/></div>
        </div>
    )
}
