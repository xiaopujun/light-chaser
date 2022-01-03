import React, {Component} from 'react';
import {Bar} from "@ant-design/charts";
import {SettingOutlined} from '@ant-design/icons';
import './index.less';
import GlowBorder from "../../../border/four-angle-glow";

/**
 * 基础条形图
 */
export default class AntdBar extends Component<any, any> {

    /*componentDidMount() {
        const {subType} = this.props;
        this.setState({subType})
    }

    shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any) {
        const {currentActive} = this.props;
        if (nextProps.id === currentActive?.activeId) {
            return true;
        } else {
            return false;
        }
    }*/

    openSet = (event: any) => {

    }

    render() {
        const {dataXDesigner, id} = this.props;
        const {chartConfigMap} = dataXDesigner;
        const barConfig = chartConfigMap?.get(id);
        return (
            <div style={{width: '100%', height: '100%'}}>
                <Bar className={'grid-item1-bar'} {...barConfig}/>
            </div>
        );
    }
}
