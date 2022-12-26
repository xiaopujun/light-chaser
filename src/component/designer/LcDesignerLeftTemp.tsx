import React, {Component} from 'react';
import './style/LcDesignerLeftTemp.less';
import * as _ from 'lodash';

import {
    AlignLeftOutlined,
    AppstoreFilled,
    AreaChartOutlined,
    CloseOutlined,
    CloudFilled,
    DotChartOutlined,
    GoldenFilled,
    LineChartOutlined,
    PieChartFilled,
    RadarChartOutlined,
    RocketFilled,
    SignalFilled
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import {lcCompInits} from "./index";

class LcDesignerLeftTemp extends Component {

    sorts: Array<any> = [];
    charts: Array<Object> = [];
    state = {
        sortKey: 'all',
        searchKey: '',
    }

    sortIcon: any = {
        "all": <AppstoreFilled/>,
        "area": <AreaChartOutlined/>,
        "line": <LineChartOutlined/>,
        "column": <SignalFilled/>,
        "bar": <AlignLeftOutlined/>,
        "scatterPlot": <DotChartOutlined/>,
        "progress": <RocketFilled/>,
        "pie": <PieChartFilled/>,
        "radar": <RadarChartOutlined/>,
        "wordCloud": <CloudFilled/>,
        "base": <GoldenFilled/>,
    }

    constructor(props: any) {
        super(props);
        this.sorts.push({name: '全部', type: 'all'})
        for (const key in lcCompInits) {
            if (lcCompInits[key] != null || lcCompInits[key] != undefined) {
                let initObj: any = lcCompInits[key];
                let baseInfo = initObj.getBaseInfo();
                let typeInfo = baseInfo?.typeInfo;
                this.sorts.push(typeInfo);
                this.charts.push(baseInfo);
            }
        }
        this.sorts = _.uniqBy(this.sorts, 'type');
    }

    changeSortKey = (e: any) => {
        this.setState({sortKey: e.currentTarget.id});
    }

    searchChart = (searchKey: string) => {
        this.setState({searchKey});
    }

    getSortDom = () => {
        let sortDom = [];
        for (let i = 0; i < this.sorts.length; i++) {
            const {name, type} = this.sorts[i];
            let Icon = this.sortIcon[type];
            sortDom.push(
                <div key={i + ''} className={'sort-item'} id={type} onClick={this.changeSortKey}>
                    <div className={'sort-item-icon'}>{Icon}</div>
                    <span className={'sort-item-content'}>{name}</span>
                </div>
            )
        }
        return sortDom;
    }

    getChartDom = () => {
        let chartDom = [];
        let tempCharts = this.charts;
        if (this.state.sortKey != 'all') {
            tempCharts = this.charts.filter((item: any) => {
                return item.typeInfo.type == this.state.sortKey;
            })
        }
        if (this.state.searchKey != '') {
            tempCharts = tempCharts.filter((item: any) => {
                let index = item.name.indexOf(this.state.searchKey);
                return item.name.indexOf(this.state.searchKey) >= 0;
            })
        }
        for (let i = 0; i < tempCharts.length; i++) {
            let chartInfo: any = tempCharts[i];
            const {name} = chartInfo;
            chartDom.push(
                <div key={i + ''} className={'charts-list-item'}>{name}</div>
            )
        }
        return chartDom;
    }


    render() {
        const sortDom = this.getSortDom();
        const chartDom = this.getChartDom();
        return (
            <>
                <div className={'lc-charts-sort'}>
                    {sortDom}
                </div>
                <div className={'lc-charts-list'}>
                    <div className={'menu-title'}>
                        <div className={'menu-title-content'}>组件列表</div>
                        <div><span><CloseOutlined/></span></div>
                    </div>
                    <div className={'charts-search'}>
                        <Search placeholder="搜索组件" onSearch={this.searchChart} style={{width: '100%'}}/>
                    </div>
                    <div className={'charts-list-items'}>
                        {chartDom}
                    </div>
                </div>

                <div className={'lc-charts-layer'}>
                    <div className={'menu-title'}>
                        <div className={'menu-title-content'}>图层</div>
                        <div><span><CloseOutlined/></span></div>
                    </div>
                    <div className={'charts-layer-items'}>
                        <div className={'charts-layer-item'}>图层1</div>
                    </div>
                </div>
            </>
        );
    }
}

export default LcDesignerLeftTemp;