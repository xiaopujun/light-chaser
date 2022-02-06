import React, {Component, ReactDOM} from 'react';
import {Button, Col, Collapse, Row} from "antd";
import {AreaChartOutlined} from "@ant-design/icons";
import './index.less';
import TitleConfig from "../../../../component/config/base";
import ChartConfig from "../../../../component/config/chart";

const {Panel} = Collapse;

interface LayoutToolItemProps {
    id?: string;
    icon?: ReactDOM;
    content?: string;
    token?: string;
}

interface LayoutToolCollapseProps {
    id: string;
    sort: string;
    data: Array<LayoutToolItemProps>;
}

interface LayoutToolsProps {
    data?: Array<LayoutToolCollapseProps>;
}

/**
 * 大屏布局设计器左侧组件库工具栏
 */
class LayoutTools extends Component<LayoutToolsProps, any> {

    state: any = {
        data: [{
            id: '1',
            sort: '条形图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '基础条形图', token: 'AntdBaseBar'},
                {id: '2', icon: <AreaChartOutlined/>, content: '分组条形图', token: 'AntdGroupBar'},
                {id: '3', icon: <AreaChartOutlined/>, content: '百分比条形图', token: 'AntdPercentBar'},
                {id: '4', icon: <AreaChartOutlined/>, content: '区间条形图', token: 'AntdZoneBar'},
                {id: '5', icon: <AreaChartOutlined/>, content: '堆叠条形图', token: 'AntdStackBar'},]
        }, {
            id: '2',
            sort: '柱状图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '基础柱状图', token: 'AntdBaseColumn'},]
        }, {
            id: '3',
            sort: '饼图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '饼图', token: 'pie'}, ,]
        }, {
            id: '4',
            sort: '散点图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '散点图', token: 'scatter'},]
        }, {
            id: '5',
            sort: '面积图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '面积图', token: 'area'},]
        }, {
            id: '6',
            sort: '词云图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '词云图', token: 'wordCloud'},]
        }, {
            id: '7',
            sort: '折线图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '折线图', token: 'foldLine'},]
        }, {
            id: '8',
            sort: '仪表盘',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '仪表盘', token: 'process'},]
        },],
    }

    render() {
        const {data} = this.state;
        return (
            <div className={'layout-designer-tools-list'}>
                {data.map((i: LayoutToolCollapseProps) => {
                    return (<div key={i?.id}>
                        <Collapse className={'tools-collapse'} bordered={false}>
                            <Panel className={'tools-panel'} header={i?.sort || ''} key="1">
                                {i?.data?.map((item: LayoutToolItemProps) => {
                                    return (
                                        <div key={item?.id} onDragStart={(e) => {
                                            e.dataTransfer.setData('chartName', item?.token || '')
                                        }}
                                             className="droppable-element tool-item"
                                             draggable={true}>
                                            {item?.content}
                                        </div>
                                    )
                                })}
                            </Panel>
                        </Collapse>
                    </div>)
                })}
            </div>
        );
    }
}

export default LayoutTools;