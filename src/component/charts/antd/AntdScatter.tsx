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
        const {LCDesignerStore, elemId} = this.props;
        const {chartConfigs, layoutConfigs} = LCDesignerStore;
        const config = chartConfigs[elemId + ''];
        let name = "";
        for (let i = 0; i < layoutConfigs.length; i++) {
            if (layoutConfigs[i].id === elemId) {
                name = layoutConfigs[i].name;
            }
        }
        const {chartProps, baseStyle} = config;
        if (name === "AntdBubbles") {
            chartProps.data = this.state.data;
        }
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Scatter supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
