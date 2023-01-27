import React, {Component} from 'react';
import './style/LcDesignerLeft.less';
import * as _ from 'lodash';

import {
    AlignLeftOutlined,
    AppstoreFilled,
    AreaChartOutlined,
    CloudFilled,
    DotChartOutlined,
    GoldenFilled,
    LineChartOutlined,
    PieChartFilled,
    RadarChartOutlined,
    RocketFilled,
    SignalFilled
} from "@ant-design/icons";
import {lcCompInits} from "./index";
import LcCompList from "./LcCompList";

class LcDesignerLeft extends Component {

    sorts: Array<any> = [];
    charts: Array<Object> = [];
    state = {
        sortKey: 'all',
        listVisible: false
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
        this.setState({sortKey: e.currentTarget.id, listVisible: true});
    }

    listVisibleChanged = (visible: boolean) => {
        this.setState({listVisible: visible})
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

    render() {
        const sortDom = this.getSortDom();
        const {sortKey, listVisible} = this.state;
        return (
            <>
                <div className={'lc-charts-sort'}>{sortDom}</div>
                <LcCompList onClose={this.listVisibleChanged} visible={listVisible} data={this.charts}
                            sortKey={sortKey}/>
            </>
        );
    }
}

export default LcDesignerLeft;