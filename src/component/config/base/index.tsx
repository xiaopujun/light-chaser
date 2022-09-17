import React, {Component} from 'react';
import {Collapse, Select} from "antd";
import './style/index.less';
import PaddingSet from "./PaddingSet";
import BorderSet from "./BorderSet";
import BackgroundSet from "./BackgroundSet";

const {Panel} = Collapse;

/**
 * 组件基础设置
 */
class ElemBaseSet extends Component<any> {

    paddingChanged = (padding: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({padding: padding});
    }

    backgroundColorChanged = (color: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({backgroundColor: color});
    }

    render() {
        return (
            <div className={'elem-base-config'}>
                <Collapse className={'base-config-collapse'} bordered={false}>
                    <Panel className={'base-config-panel'} header="内边距" key="1">
                        <PaddingSet onChange={this.paddingChanged} count={1}/>
                    </Panel>
                    <Panel className={'charts-properties-title'} header="边框" key="3">
                        <BorderSet {...this.props}/>
                    </Panel>
                    <Panel className={'charts-properties-title'} header="背景" key="4">
                        <BackgroundSet {...this.props}/>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default ElemBaseSet;