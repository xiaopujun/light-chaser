import React, {Component} from 'react';
import './LcConfigItem.css';
import {Input} from "antd";

class LcConfigItem extends Component {

    render() {
        return (
            <div className={'lc-config-item config-up-down'}>
                <div className={'lc-config-item-label'}>标签名</div>
                <div className={'lc-config-item-value'}><Input size={'small'}/></div>
            </div>
        );
    }
}

export default LcConfigItem;