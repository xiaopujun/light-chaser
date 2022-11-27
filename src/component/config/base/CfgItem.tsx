import React, {Component} from 'react';
import './style/CfgItem.less';
import {getCfgComp} from "../CfgComps";

export interface CfgItemProps {
    /**
     * 配置项label显示名
     */
    label?: string;
    /**
     * 组件名
     */
    comp?: string;
    /**
     * 组件配置项
     */
    config?: { [key: string]: string | number | Array<any> | Function | undefined };
}

class CfgItem extends Component<CfgItemProps> {
    render() {
        const {comp = "", label, config} = this.props;
        let CfgComp = null;
        if (comp !== "")
            CfgComp = getCfgComp(comp);
        return (
            <div className={'lc-cfg-item'}>
                <div className={'item-name'}>{label}</div>
                {comp === "" ? <div>{config?.value}</div> : <div><CfgComp {...config}/></div>}
            </div>
        );
    }
}

export default CfgItem;