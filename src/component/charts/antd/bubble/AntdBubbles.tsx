import React, {Component} from 'react';
import {Scatter} from "@ant-design/charts";

interface AntdScatterProps {
    chartName?: string;
    chartConfig?: any;
    elemId?: string;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
}

/**
 * 散点图
 */
export default class AntdBubbles extends Component<AntdScatterProps> {

    state = {
        data: []
    }

    constructor(props: any) {
        super(props);
        fetch('https://gw.alipayobjects.com/os/bmw-prod/0b37279d-1674-42b4-b285-29683747ad9a.json')
            .then((response) => response.json())
            .then((json) => this.setState({data: json}))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    }

    render() {
        const {chartConfig, chartName, elemId} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        if (chartName === "AntdBubbles") {
            chartProps.data = this.state.data;
        }
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                
                <Scatter supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
