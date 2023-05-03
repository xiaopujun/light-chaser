import React from 'react';
import CompBgContainer from "../../../lib/CompBgContainer";
import {AbstractComp} from "../../../types/lc-interface/AbstractComp";
import {CompType} from "../../../types/CompType";
import {Bar} from "@ant-design/charts";

/**
 * 基础条形图
 */
export default class AntdBaseBar extends AbstractComp<CompType> {

    render() {
        const {config} = this.props;
        if (!config)
            return null;
        const {style} = config;
        return (
            <CompBgContainer style={style?.baseStyle}>
                <Bar supportCSSTransform={true} className={'grid-chart-item'} {...style?.chartStyle}/>
            </CompBgContainer>
        );
    }
}
