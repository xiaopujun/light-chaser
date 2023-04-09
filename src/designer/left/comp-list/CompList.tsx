import React, {Component} from 'react';
import {LineOutlined} from "@ant-design/icons";
import {Input} from "antd";
import leftStore from "../store/LeftStore";
import {lcCompInits} from "../../Scanner";
import compListStore from "./CompListStore";
import classifyListStore from "../classify-list/ClassifyListStore";

class CompList extends Component {

    constructor(props: any) {
        super(props);
        const {doInit} = compListStore;
        doInit && doInit();
    }

    getChartDom = () => {
        let chartDom = [];
        let {classifyKey} = classifyListStore;
        let {comps, compKey} = compListStore;
        if (classifyKey !== 'all') {
            comps = comps.filter((item: any) => {
                return item.typeInfo.type === compKey;
            })
        }
        if (compKey !== '') {
            comps = comps.filter((item: any) => {
                return item.name.indexOf(compKey) >= 0;
            })
        }
        for (let i = 0; i < comps.length; i++) {
            let chartInfo: any = comps[i];
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
        const {setShowComps} = leftStore;
        setShowComps && setShowComps(false);
    }

    searchChart = (e: any) => {
        this.setState({searchKey: e.currentTarget.value});
    }

    render() {
        const {showComps} = leftStore;
        return (
            <>
                {showComps ? <div className={'lc-comp-list'}>
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

export default CompList;