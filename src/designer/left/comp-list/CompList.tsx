import React, {Component} from 'react';
import {LineOutlined} from "@ant-design/icons";
import {Input} from "antd";
import compListStore from "./CompListStore";
import classifyListStore from "../classify-list/ClassifyListStore";
import './CompList.less';
import {toJS} from "mobx";
import {observer} from "mobx-react";
import designerStore from "../../BootCore";

class CompList extends Component {

    constructor(props: any) {
        super(props);
        const {doInit} = compListStore;
        doInit && doInit();
    }

    getChartDom = () => {
        let chartDom = [];
        let {classifyKey} = toJS(classifyListStore)
        let {comps, compKey} = toJS(compListStore);
        if (classifyKey !== 'all') {
            comps = comps.filter((item: any) => {
                return item.typeKey === classifyKey;
            })
        }
        if (compKey !== '') {
            comps = comps.filter((item: any) => {
                return item.name.indexOf(compKey) >= 0;
            })
        }
        for (let i = 0; i < comps.length; i++) {
            let compInfo: any = comps[i];
            const {name, key} = compInfo;
            const {compInitObj} = designerStore;
            let compObj = JSON.stringify({compName: name, compKey: key});
            let lcCompInit: any = compInitObj[key + "Init"];
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
        const {setVisible} = compListStore;
        setVisible && setVisible(false);
    }

    searchChart = (e: any) => {
        const {setCompKey} = compListStore;
        setCompKey && setCompKey(e.currentTarget.value);
    }

    render() {
        const {visible} = compListStore;
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

export default observer(CompList);