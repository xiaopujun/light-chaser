import React, {Component} from 'react';
import {LineOutlined} from "@ant-design/icons";
import {Input} from "antd";
import compListStore from "./CompListStore";
import classifyListStore from "../../left/classify-list/ClassifyListStore";
import './CompList.less';
import {observer} from "mobx-react";
import designerStarter from "../../DesignerStarter";
import designerStore from "../../store/DesignerStore";
import {idGenerate} from "../../../utils/IdGenerate";
import {MovableItemType} from "../../../lib/lc-movable/types";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import CommonDragger from "../../operate-provider/drag/CommonDragger";

class CompList extends Component {

    compListRef: any = null;
    dragTargetRef: any = null;

    constructor(props: any) {
        super(props);
        const {doInit} = compListStore;
        doInit && doInit();
    }

    componentDidMount() {
        if (this.compListRef && this.dragTargetRef) {
            new CommonDragger(this.compListRef, this.dragTargetRef);
        }
    }

    addItem = (compKey: string) => {
        const {addItem} = designerStore;
        let {maxLevel, setMaxLevel} = eventOperateStore;
        let movableItem: MovableItemType = {
            type: compKey,
            width: 384,
            height: 216,
            position: [0, 0],
            id: idGenerate.generateId() + '',
            locked: false,
            hide: false,
            order: ++maxLevel,
        }
        setMaxLevel && setMaxLevel(maxLevel);
        addItem && addItem(movableItem);
    }

    getChartDom = () => {
        let chartDom = [];
        let {classifyKey} = classifyListStore
        let {compInfoArr, compKey} = compListStore;
        if (classifyKey !== 'all') {
            compInfoArr = compInfoArr.filter((item: any) => {
                return item.typeKey === classifyKey;
            })
        }
        if (compKey !== '') {
            compInfoArr = compInfoArr.filter((item: any) => {
                return item.name.indexOf(compKey) >= 0;
            })
        }
        for (let i = 0; i < compInfoArr.length; i++) {
            let compInfo: any = compInfoArr[i];
            const {name, key} = compInfo;
            const {customComponentInfoMap} = designerStarter;
            let lcCompInit: any = customComponentInfoMap[key];
            let chartImg = lcCompInit.getChartImg();
            chartDom.push(
                <div key={i + ''} className={'list-item droppable-element'}>
                    <div className={'item-header'} ref={'drag-target'}>
                        <div className={'item-name'}>{name}</div>
                        <div className={'item-type'}>Antd</div>
                    </div>
                    <div className={'item-content'} onDoubleClick={() => this.addItem(key)}>
                        <div className={'item-img'} style={{backgroundImage: `url(${chartImg})`}}/>
                    </div>
                </div>
            )
        }
        return chartDom;
    }

    onClose = (e: any) => {
        console.log('要关闭了')
        const {setVisible} = compListStore;
        setVisible && setVisible(false);
    }

    searchChart = (e: any) => {
        const {setCompKey} = compListStore;
        setCompKey && setCompKey(e.currentTarget.value);
    }

    render() {
        return (
            <>
                <div ref={ref => this.compListRef = ref} className={'lc-comp-list'}>
                    <div className={'list-title'}>
                        <div className={'title-content'}>组件列表</div>
                        <div ref={ref => this.dragTargetRef = ref} className={'title-drag-target'}
                             style={{width: '50%', height: '100%'}}>
                        </div>
                        <div className={'title-close-btn'} onClick={this.onClose}><span><LineOutlined/></span></div>
                    </div>
                    <div className={'list-search'}>
                        <Input placeholder="搜索组件" onPressEnter={this.searchChart}
                               style={{width: '100%'}}/>
                    </div>
                    <div className={'list-items'}>
                        {this.getChartDom()}
                    </div>
                </div>
            </>
        );
    }
}

export default observer(CompList);