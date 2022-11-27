import React, {Component} from 'react';
import './style/CfgItem.less';
import {getCfgComp} from "../CfgComps";

export interface CfgItemProps {
    labelName?: string;
    compName?: string;
    config?: { [key: string]: string | number | Array<any> | Function | undefined };
}

class CfgItem extends Component<CfgItemProps> {
    render() {
        const {compName = "", labelName, config} = this.props;
        let CfgComp = null;
        if (compName !== "")
            CfgComp = getCfgComp(compName);
        return (
            <div className={'lc-cfg-item'}>
                <div className={'item-name'}>{labelName}</div>
                {compName === "" ? <div>{config?.value}</div> : <div><CfgComp {...config}/></div>}
            </div>
        );
    }
}

export default CfgItem;