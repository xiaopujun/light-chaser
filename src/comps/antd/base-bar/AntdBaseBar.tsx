import React, {PureComponent} from 'react';
import CompBgContainer from "../../../lib/lc-bg-container/CompBgContainer";
import {CompType} from "../../../framework/types/CompType";
import {Bar} from "@ant-design/charts";

/**
 * 基础条形图
 */
export default class AntdBaseBar extends PureComponent<CompType> {

    chart: any;

    render() {
        console.log('AntdBaseBar render');
        const {config} = this.props;
        if (!config)
            return null;
        const {style} = config;
        return (
            <CompBgContainer style={style?.baseStyle}>
                <Bar supportCSSTransform={true} onGetG2Instance={(chart: any) => {
                    this.chart = chart;
                }}
                     className={'grid-chart-item'} {...style?.chartStyle}/>
            </CompBgContainer>
        );
    }
}
