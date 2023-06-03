import React, {PureComponent} from 'react';
import CompBgContainer from "../../../lib/lc-bg-container/CompBgContainer";
import {CompType} from "../../../framework/types/CompType";
import {Bar} from "@ant-design/charts";

/**
 * 基础条形图
 */
export default class AntdBaseBar extends PureComponent<CompType> {

    chart: any;
    state = {
        data: null
    }

    componentDidMount() {
        this.polling();
    }

    polling = () => {
        this.getData().then((data: any) => {
            this.setState({data});
            setTimeout(() => {
                this.polling();
            }, parseInt(Math.random() * 3 + 3 + '') * 1000)
        })
    }

    getData = () => {
        return new Promise((resolve: any, reject: any) => {
            fetch('http://www.lcdev.com/lc/test/postDemo', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({range: 23,})
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch((error: any) => reject(error));
        })
    }

    calculateData = (style: any) => {
        const {config: {data}} = this.props;
        if (data.dataSource === 'api' && this.state.data) {
            style.chartStyle.data = this.state.data;
        }
    }

    render() {
        const {config} = this.props;
        if (!config) return null;
        let {style} = config;
        this.calculateData(style);
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
