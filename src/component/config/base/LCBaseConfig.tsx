import React, {Component} from 'react';
import {Collapse, Select} from "antd";
import './style/LCBaseConfig.less';
import PaddingSet from "./PaddingSet";
import BorderSet from "./BorderSet";
import BackgroundSet from "./BackgroundSet";

const {Panel} = Collapse;

/**
 * 组件基础设置
 */
export default class LCBaseConfig extends Component<any> {

    paddingChanged = (padding: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({padding: padding});
    }

    backgroundColorChanged = (color: string | string[]) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({backgroundColor: color});
    }

    render() {
        return (
            <div className={'lc-base-config'}>
                <PaddingSet onChange={this.paddingChanged} count={4}/>
                <BackgroundSet backgroundColorChanged={this.backgroundColorChanged} {...this.props}/>
                <BorderSet {...this.props}/>
            </div>
        );
    }
}
