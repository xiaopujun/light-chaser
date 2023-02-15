import React, {Component} from 'react';
import {LineOutlined} from "@ant-design/icons";
import {Input} from "antd";
import './style/LcCompList.less';
import {lcCompInits} from "./index";

interface LcCompListProps {
    data?: Array<any>;
    sortKey?: string;
    visible?: boolean;
    onClose?: (visible: boolean) => void;
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
        if (this.props?.sortKey !== 'all') {
            tempCharts = this.data.filter((item: any) => {
                return item.typeInfo.type === this.props.sortKey;
            })
        }
        if (this.state.searchKey !== '') {
            tempCharts = tempCharts.filter((item: any) => {
                return item.name.indexOf(this.state.searchKey) >= 0;
            })
        }
        for (let i = 0; i < tempCharts.length; i++) {
            let chartInfo: any = tempCharts[i];
            const {name, value} = chartInfo;
            let compObj = JSON.stringify({chartName: value, type: name});
            let lcCompInit: any = lcCompInits[value + "Init"];
            let chartImg = lcCompInit.getChartImg();
            chartDom.push(
                <div draggable={true} key={i + ''}
                     onDragStart={(e) => {
                         e.dataTransfer.setData('compObj', compObj);
                     }} className={'list-item droppable-element'}>
                    <div className={'item-header'}>
                        <div className={'item-name'}>{name}</div>
                        <div className={'item-type'}>Antd</div>
                    </div>
                    <div className={'item-content'}>
                        <div className={'item-img'} style={{backgroundImage: `url(${chartImg})`}}/>
                    </div>
                </div>
            )
        }
        return chartDom;
    }

    onClose = () => {
        const {onClose} = this.props;
        onClose && onClose(false);
    }

    searchChart = (e: any) => {
        this.setState({searchKey: e.currentTarget.value});
    }

    render() {
        const {visible} = this.props;
        return (
            <>
                {visible ? <div className={'lc-comp-list'}>
                    <div className={'list-title'}>
                        <div className={'title-content'}>组件列表</div>
                        <div onClick={this.onClose}><span><LineOutlined/></span></div>
                    </div>
                    <div className={'list-search'}>
                        <Input placeholder="搜索组件" onPressEnter={this.searchChart}
                               style={{width: '100%'}}/>
                    </div>
                    <div className={'list-items'}>
                        {this.getChartDom()}
                    </div>
                </div> : <></>}
            </>
        );
    }
}

export default LcCompList;