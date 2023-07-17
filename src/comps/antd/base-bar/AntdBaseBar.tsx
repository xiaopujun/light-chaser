import React, {PureComponent} from 'react';
import CompBgContainer from "../../../lib/lc-background-container/CompBgContainer";
import {Bar} from "@ant-design/charts";
import {sendHttpRequest} from "../../../utils/HttpUtil";
import {LoadError} from "../../../lib/lc-loaderr/LoadError";

/**
 * 基础条形图
 */
export default class AntdBaseBar extends PureComponent<any> {

    chart: any;
    interval: any;
    state = {
        data: null,
        connect: true
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        //销毁定时器,避免组件卸载后，定时器还在执行。
        clearInterval(this.interval);
    }

    getData = () => {
        const {config: {data}} = this.props;
        const {dataSource, apiData} = data;
        if (dataSource === 'api') {
            const {url, method, params, header} = apiData;
            this.interval = setInterval(() => {
                const {realTimeRefresh} = this.props;
                if (realTimeRefresh) {
                    sendHttpRequest(url, method, params, header).then((data: any) => {
                        if (data) {
                            this.setState({data, connect: true});
                        } else
                            this.setState({connect: false});
                    });
                }
            }, parseInt(Math.random() * 7 + 3 + '') * 1000);
        }
    }

    calculateData = (style: any) => {
        const {config: {data}} = this.props;
        if (data.dataSource === 'api' && this.state.data) {
            style.chartStyle.data = this.state.data;
        }
    }

    render() {
        let {connect} = this.state;
        const {config} = this.props;
        if (!config) return null;
        let {style} = config;
        this.calculateData(style);
        return (
            <>
                {
                    connect ? <CompBgContainer style={style?.baseStyle}>
                            <Bar supportCSSTransform={true}
                                 onGetG2Instance={(chart: any) => this.chart = chart}
                                 className={'grid-chart-item'} {...style?.chartStyle}/>
                        </CompBgContainer> :
                        <LoadError/>
                }
            </>
        );
    }
}
