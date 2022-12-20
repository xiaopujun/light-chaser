import React, {Component} from 'react';
import {WordCloud} from "@ant-design/charts";
import EditTools from "../../../designer/EditTool";

interface AntdWordCloudProps {
    elemId?: string;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
    chartConfig?: any;
    chartName?: string;
}

/**
 * 基础柱状图
 */
export default class AntdWordCloud extends Component<AntdWordCloudProps> {

    state = {
        data: []
    }

    constructor(props: any) {
        super(props);
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
            .then((response) => response.json())
            .then((json) => this.setState({data: json}))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    }

    positionChanged = (data: any) => {
        if (data.length > 0) {
            let temp = data[data.length - 1];
            data[data.length - 1] = data[0];
            data[0] = temp;
        }

    }

    render() {
        const {chartConfig, elemId} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <EditTools {...this.props} elemId={elemId}/>
                <WordCloud supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
