import React, {Component} from 'react';
import {getCfgComp} from "../CfgComps";
import {CfgItemProps} from "../../../framework/types/ConfigItemTypes";

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