import React, {Component} from 'react';
import {WordCloud} from "@ant-design/charts";
import './index.less';
import EditTools from "../../../edit-tool";

/**
 * 基础柱状图
 */
export default class AntdWordCloud extends Component<any, any> {

    state = {
        count: 0,
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


    render() {
        //todo name属性为演示获取demo数据使用，后续要去掉
        const {LCDesignerStore, elemId} = this.props;
        const {chartConfigMap} = LCDesignerStore;
        const config = chartConfigMap?.get(elemId);
        const {chartProperties, elemBaseProperties} = config;
        chartProperties.data = this.state.data;
        console.log(chartProperties.data)
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...elemBaseProperties}}>
                <EditTools {...this.props} elemId={elemId}/>
                <WordCloud className={'grid-chart-item'} {...chartProperties}/>
            </div>
        );
    }
}
