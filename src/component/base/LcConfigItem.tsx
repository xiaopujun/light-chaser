import React, {Component} from 'react';
import './style/LcConfigItem.less';

export enum CfgItemLayout {
    /**
     * 行级
     */
    ROW,
    /**
     * 块级
     */
    BLOCK,
}

interface LcConfigItemProps {
    title: string;
    layout?: CfgItemLayout;
}

class LcConfigItem extends Component<LcConfigItemProps> {
    render() {
        const {title = '', layout = CfgItemLayout.ROW} = this.props;
        return (
            <div className={'lc-cfg-item'}>
                <div className={'lc-cfg-title'}>{title}</div>
                <div className={layout === CfgItemLayout.ROW ?
                    'lc-cfg-content-row' : 'lc-cfg-content-block'}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LcConfigItem;