import React, {Component} from 'react';
import {Scatter} from "@ant-design/charts";
import './style/AntdScatter.less';
import EditTools from "../../edit-tool";

/**
 * 散点图
 */
export default class AntdScatter extends Component<any, any> {

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
        //todo name属性为演示获取demo数据使用，后续要去掉
        const {LCDesignerStore, elemId} = this.props;
        const {chartConfigMap, layoutConfig} = LCDesignerStore;
        const config = chartConfigMap?.get(elemId);
        let name = "";
        for (let i = 0; i < layoutConfig.length; i++) {
            if (layoutConfig[i].id === elemId) {
                name = layoutConfig[i].name;
            }
        }
        const {chartProperties, elemBaseProperties} = config;
        if (name === "AntdBubbles") {
            chartProperties.data = this.state.data;
        }
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...elemBaseProperties}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Scatter className={'grid-chart-item'} {...chartProperties}/>
            </div>
        );
    }
}
