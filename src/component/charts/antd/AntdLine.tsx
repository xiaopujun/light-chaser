import React, {Component} from 'react';
import {Line} from "@ant-design/charts";
import './style/AntdLine.less';
import EditTools from "../../edit-tool";

interface AntdLineProps {
    chartName?: string;
    chartConfig?: any;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
    elemId?: string;
}

/**
 * 基础柱状图
 */
export default class AntdLine extends Component<AntdLineProps> {

    state = {
        data: []
    }

    constructor(props: any) {
        super(props);
        const {chartName} = this.props;
        switch (chartName) {
            case "AntdBaseFoldLine":
                fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
                    .then((response) => response.json())
                    .then((json) => this.setState({data: json}))
                    .catch((error) => {
                        console.log('fetch data failed', error);
                    });
                break;
            case "AntdStepFoldLine":
                break;
            case "AntdMuchFoldLine":
                fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
                    .then((response) => response.json())
                    .then((json) => this.setState({data: json}))
                    .catch((error) => {
                        console.log('fetch data failed', error);
                    });
                break;
        }
    }


    render() {
        const {chartConfig, chartName, elemId} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        if (chartName !== 'AntdStepFoldLine')
            chartProps.data = this.state.data;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Line supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
