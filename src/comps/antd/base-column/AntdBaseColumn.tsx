import React, {PureComponent} from 'react';
import CompBgContainer from "../../../lib/lc-background-container/CompBgContainer";
import {Column} from "@ant-design/charts";
import {sendHttpRequest} from "../../../utils/HttpUtil";
import {toJS} from "mobx";

/**
 * 基础条形图
 */
export default class AntdBaseColumn extends PureComponent<any> {

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
        const {connect} = this.state;
        const {config} = this.props;
        if (!config) return null;
        let {style} = config;
        this.calculateData(style);
        console.log(toJS(style?.chartStyle))
        return (
            <CompBgContainer style={style?.baseStyle}>
                {
                    connect ? <Column supportCSSTransform={true} onGetG2Instance={(chart: any) => {
                            this.chart = chart;
                        }} className={'grid-chart-item'} {...style?.chartStyle}/> :
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}>
                            <p style={{
                                backgroundColor: 'rgb(174,0,0)',
                                color: '#dcdcdc',
                                fontSize: 12,
                                width: '100%',
                            }}>链接丢失...</p>
                        </div>
                }
            </CompBgContainer>
        );
    }
}
