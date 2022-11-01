import React, {Component} from 'react';
import {Line} from "@ant-design/charts";
import './style/AntdLine.less';
import EditTools from "../../edit-tool";

/**
 * 基础柱状图
 */
export default class AntdLine extends Component<any, any> {

    state = {
        data: []
    }

    constructor(props: any) {
        super(props);
        const {LCDesignerStore, elemId} = this.props;
        const {layoutConfig} = LCDesignerStore;
        let chartName = "";
        for (let i = 0; i < layoutConfig.length; i++) {
            if (layoutConfig[i].id === elemId) {
                chartName = layoutConfig[i].name;
            }
        }
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
        const {LCDesignerStore, elemId} = this.props;
        const {chartConfigs, layoutConfig} = LCDesignerStore;
        const config = chartConfigs[elemId + ''];
        const {chartProperties, elemBaseProperties} = config;
        let chartName = "";
        for (let i = 0; i < layoutConfig.length; i++) {
            if (layoutConfig[i].id === elemId) {
                chartName = layoutConfig[i].name;
            }
        }
        if (chartName !== 'AntdStepFoldLine')
            chartProperties.data = this.state.data;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...elemBaseProperties}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Line supportCSSTransform={true} className={'grid-chart-item'} {...chartProperties}/>
            </div>
        );
    }
}
