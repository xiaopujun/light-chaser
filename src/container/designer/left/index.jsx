import React, {Component} from 'react';
import {Button} from "antd";
import {AreaChartOutlined} from "@ant-design/icons";


/**
 * 大屏布局设计器左侧组件库工具栏
 */
class ComponentLib extends Component {
    render() {
        return (
            <>
                <div className={'chart-list'}>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'AntdBaseBar')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>基础条形图</Button>
                    </div>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'AntdGroupBar')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>分组条形图</Button>
                    </div>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'AntdPercentBar')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>百分比条形图</Button>
                    </div>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'AntdZoneBar')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>区间条形图</Button>
                    </div>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'AntdStackBar')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>堆叠条形图</Button>
                    </div>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'column')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>柱状图</Button>
                    </div>

                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'pie')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>饼图</Button>
                    </div>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'scatter')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>散点图</Button>
                    </div>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'area')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>面积图</Button>
                    </div>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'wordCloud')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>词云图</Button>
                    </div>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'foldLine')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>折线图</Button>
                    </div>
                    <div className=" chart-item">
                        <Button onDragStart={(e) => {
                            e.dataTransfer.setData('chartName', 'process')
                        }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on" ghost icon={<AreaChartOutlined/>}>仪表盘</Button>
                    </div>
                </div>
            </>
        );
    }
}

export default ComponentLib;