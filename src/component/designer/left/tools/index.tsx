import React, {Component, ReactDOM} from 'react';
import {AreaChartOutlined} from "@ant-design/icons";
import './index.less';
import ToolItem from "../item";


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
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '基础', token: 'AntdBaseBar'},
                {id: '2', icon: <AreaChartOutlined/>, content: '分组', token: 'AntdGroupBar'},
                {id: '3', icon: <AreaChartOutlined/>, content: '百分比', token: 'AntdPercentBar'},
                {id: '4', icon: <AreaChartOutlined/>, content: '区间', token: 'AntdZoneBar'},
                {id: '5', icon: <AreaChartOutlined/>, content: '堆叠', token: 'AntdStackBar'},]
        }, {
            id: '2',
            sort: '柱状图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '基础', token: 'AntdBaseColumn'},
                {id: '2', icon: <AreaChartOutlined/>, content: '分组', token: 'AntdGroupColumn'},
                {id: '3', icon: <AreaChartOutlined/>, content: '百分比', token: 'AntdPercentColumn'},
                {id: '4', icon: <AreaChartOutlined/>, content: '区间', token: 'AntdZoneColumn'},
                {id: '5', icon: <AreaChartOutlined/>, content: '堆叠', token: 'AntdStackColumn'},]
        }, {
            id: '3',
            sort: '饼图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '饼图', token: 'AntdPie'},]
        }, {
            id: '4',
            sort: '散点图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '散点图', token: 'AntdScatter'},
                {id: '2', icon: <AreaChartOutlined/>, content: '气泡图', token: 'AntdBubbles'},]
        }, {
            id: '5',
            sort: '面积图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '基础', token: 'AntdBaseArea'},
                {id: '2', icon: <AreaChartOutlined/>, content: '堆叠', token: 'AntdStackArea'},
                {id: '3', icon: <AreaChartOutlined/>, content: '百分比', token: 'AntdPercentArea'},]
        }, {
            id: '6',
            sort: '词云图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '词云图', token: 'AntdWordCloud'},]
        }, {
            id: '7',
            sort: '折线图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '基础', token: 'AntdBaseFoldLine'},
                {id: '2', icon: <AreaChartOutlined/>, content: '阶梯', token: 'AntdStepFoldLine'},
                {id: '3', icon: <AreaChartOutlined/>, content: '多', token: 'AntdMuchFoldLine'},]
        }, {
            id: '8',
            sort: '进度图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '水波图  ', token: 'AntdLiquid'},
                {id: '2', icon: <AreaChartOutlined/>, content: '仪表盘  ', token: 'AntdGauge'},]
        }, {
            id: '9',
            sort: '雷达图',
            data: [{id: '1', icon: <AreaChartOutlined/>, content: '雷达图  ', token: 'AntdRadar'}]
        },],
    }

    render() {
        const {data} = this.state;
        return (
            <div className={'layout-designer-tools-list'} style={{height: window.innerHeight - 64}}>
                {data.map((item: any) => {
                    return (
                        <>
                            <ToolItem id={item.id} sort={item.sort} data={item.data}/>
                            <br/>
                        </>
                    )
                })}


                {/*{data.map((i: LayoutToolCollapseProps) => {
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
                })}*/}
            </div>
        );
    }
}

export default LayoutTools;