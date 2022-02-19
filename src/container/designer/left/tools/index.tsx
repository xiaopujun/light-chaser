import React, {Component, ReactDOM} from 'react';
import {Collapse} from "antd";
import {AreaChartOutlined} from "@ant-design/icons";
import './index.less';

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
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '基础柱状图', token: 'AntdBaseColumn'},
                {id: '2', icon: <AreaChartOutlined/>, content: '分组柱状图', token: 'AntdGroupColumn'},
                {id: '3', icon: <AreaChartOutlined/>, content: '百分比柱状图', token: 'AntdPercentColumn'},
                {id: '4', icon: <AreaChartOutlined/>, content: '区间柱状图', token: 'AntdZoneColumn'},
                {id: '5', icon: <AreaChartOutlined/>, content: '堆叠柱状图', token: 'AntdStackColumn'},]
        }, {
            id: '3',
            sort: '饼图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '饼图', token: 'AntdPie'},
                {id: '2', icon: <AreaChartOutlined/>, content: '环图', token: 'AntdRing'},]
        }, {
            id: '4',
            sort: '散点图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '散点图', token: 'AntdScatter'},
                {id: '2', icon: <AreaChartOutlined/>, content: '气泡图', token: 'AntdBubbles'},]
        }, {
            id: '5',
            sort: '面积图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '基础面积图', token: 'AntdBaseArea'},
                {id: '2', icon: <AreaChartOutlined/>, content: '堆叠面积图', token: 'AntdStackArea'},
                {id: '3', icon: <AreaChartOutlined/>, content: '百分比面积图', token: 'AntdPercentArea'},]
        }, {
            id: '6',
            sort: '词云图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '词云图', token: 'AntdWordCloud'},]
        }, {
            id: '7',
            sort: '折线图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '基础折线图', token: 'AntdBaseFoldLine'},
                {id: '2', icon: <AreaChartOutlined/>, content: '阶梯折线图', token: 'AntdStepFoldLine'},
                {id: '3', icon: <AreaChartOutlined/>, content: '多折线图', token: 'AntdMuchFoldLine'},]
        }, {
            id: '8',
            sort: '进度图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '水波图  ', token: 'AntdLiquid'},]
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