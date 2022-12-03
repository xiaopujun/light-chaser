import React, {Component} from 'react';
import './style/CfgItem.less';
import {getCfgComp} from "../CfgComps";
import {CfgItemProps} from "../../../type/ConfigItemTypes";

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