import React, {Component} from 'react';
import {CloseOutlined} from "@ant-design/icons";
import {Input} from "antd";
import './style/LcCompList.less';

interface LcCompListProps {
    data?: Array<any>;
    sortKey?: string;
}

class LcCompList extends Component<LcCompListProps> {

    data: Array<Object> = [];
    state = {
        searchKey: '',
    }

    constructor(props: any) {
        super(props);
        this.data = props.data;
    }

    getChartDom = () => {
        let chartDom = [];
        let tempCharts = this.data;
        if (this.props?.sortKey != 'all') {
            tempCharts = this.data.filter((item: any) => {
                return item.typeInfo.type == this.props.sortKey;
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
            const {name, value} = chartInfo;
            let compObj = JSON.stringify({chartName: value, type: name});
            chartDom.push(
                <div draggable={true} key={i + ''}
                     onDragStart={(e) => {
                         e.dataTransfer.setData('compObj', compObj);
                     }}
                     className={'list-item droppable-element'}>{name}</div>
            )
        }
        return chartDom;
    }

    searchChart = (e: any) => {
        this.setState({searchKey: e.currentTarget.value});
    }

    render() {
        const dataDom = this.getChartDom();
        return (
            <div className={'lc-comp-list'}>
                <div className={'list-title'}>
                    <div className={'title-content'}>组件列表</div>
                    <div><span><CloseOutlined/></span></div>
                </div>
                <div className={'list-search'}>
                    <Input placeholder="搜索组件" onPressEnter={this.searchChart}
                           style={{width: '100%'}}/>
                </div>
                <div className={'list-items'}>
                    {dataDom}
                </div>
            </div>
        );
    }
}

export default LcCompList;