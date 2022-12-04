import React, {Component, ReactDOM} from 'react';
import {AreaChartOutlined} from "@ant-design/icons";
import './style/Tools.less';
import ToolItem from "./Item";


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

interface LcDesignerLeftProps {
    data?: Array<LayoutToolCollapseProps>;
}

/**
 * 大屏布局设计器左侧组件库工具栏
 */
class LcDesignerLeft extends Component<LcDesignerLeftProps, any> {

    state: any = {
        data: [
            {
                id: '0',
                sort: '基础',
                data: [
                    {id: '1', type: '文本', icon: <AreaChartOutlined/>, content: '文本', token: 'Text'},
                    {id: '2', type: '色块', icon: <AreaChartOutlined/>, content: '色块', token: 'ColorBlock'},
                ]
            },
            {
                id: '1',
                sort: '条形图',
                data: [{id: '1', type: '基础条形图', icon: <AreaChartOutlined/>, content: '基础', token: 'AntdBaseBar'},
                    {id: '2', type: '分组条形图  ', icon: <AreaChartOutlined/>, content: '分组', token: 'AntdGroupBar'},
                    {id: '3', type: '百分比条形图', icon: <AreaChartOutlined/>, content: '百分比', token: 'AntdPercentBar'},
                    {id: '4', type: '区间条形图', icon: <AreaChartOutlined/>, content: '区间', token: 'AntdZoneBar'},
                    {id: '5', type: '堆叠条形图', icon: <AreaChartOutlined/>, content: '堆叠', token: 'AntdStackBar'},]
            },
            {
                id: '2',
                sort: '柱状图',
                data: [{id: '1', type: '基础柱状图', icon: <AreaChartOutlined/>, content: '基础', token: 'AntdBaseColumn'},
                    {id: '2', type: '分组柱状图', icon: <AreaChartOutlined/>, content: '分组', token: 'AntdGroupColumn'},
                    {id: '3', type: '百分比柱状图', icon: <AreaChartOutlined/>, content: '百分比', token: 'AntdPercentColumn'},
                    {id: '4', type: '区间柱状图', icon: <AreaChartOutlined/>, content: '区间', token: 'AntdZoneColumn'},
                    {id: '5', type: '堆叠柱状图', icon: <AreaChartOutlined/>, content: '堆叠', token: 'AntdStackColumn'},]
            },
            {
                id: '3',
                sort: '饼图',
                data: [{id: '1', type: '饼图', icon: <AreaChartOutlined/>, content: '饼图', token: 'AntdPie'},]
            },
            {
                id: '4',
                sort: '散点图',
                data: [{id: '1', type: '散点图', icon: <AreaChartOutlined/>, content: '散点图', token: 'AntdScatter'},
                    {id: '2', type: '气泡图', icon: <AreaChartOutlined/>, content: '气泡图', token: 'AntdBubbles'},]
            },
            {
                id: '5',
                sort: '面积图',
                data: [{id: '1', type: '基础面积图', icon: <AreaChartOutlined/>, content: '基础', token: 'AntdBaseArea'},
                    {id: '2', type: '堆叠面积图', icon: <AreaChartOutlined/>, content: '堆叠', token: 'AntdStackArea'},
                    {id: '3', type: '百分比面积图', icon: <AreaChartOutlined/>, content: '百分比', token: 'AntdPercentArea'},]
            },
            {
                id: '6',
                sort: '词云图',
                data: [{id: '1', type: '词云图', icon: <AreaChartOutlined/>, content: '词云图', token: 'AntdWordCloud'},]
            },
            {
                id: '7',
                sort: '折线图',
                data: [{id: '1', type: '基础折线图', icon: <AreaChartOutlined/>, content: '基础', token: 'AntdBaseFoldLine'},
                    {id: '2', type: '阶梯折线图', icon: <AreaChartOutlined/>, content: '阶梯', token: 'AntdStepFoldLine'},
                    {id: '3', type: '多重折线图', icon: <AreaChartOutlined/>, content: '多重', token: 'AntdMuchFoldLine'},]
            },
            {
                id: '8',
                sort: '进度图',
                data: [{id: '1', type: '水波图', icon: <AreaChartOutlined/>, content: '水波图  ', token: 'AntdLiquid'},
                    {id: '2', type: '仪表盘', icon: <AreaChartOutlined/>, content: '仪表盘  ', token: 'AntdGauge'},]
            },
            {
                id: '9',
                sort: '雷达图',
                data: [{id: '1', type: '雷达图', icon: <AreaChartOutlined/>, content: '雷达图  ', token: 'AntdRadar'}]
            },
        ],
    }

    render() {
        const {data} = this.state;
        return (
            <div className={'layout-designer-tools-list'} style={{height: window.innerHeight - 64}}>
                {data.map((item: any) => {
                    return (
                        <div key={item.id}>
                            <ToolItem id={item.id} sort={item.sort} data={item.data}/>
                            <br/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default LcDesignerLeft;