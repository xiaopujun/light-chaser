import React, {Component} from 'react';
import compListStore from "./CompListStore";
import classifyListStore from "../../left/classify-list/ClassifyListStore";
import './CompList.less';
import {observer} from "mobx-react";
import designerStore from "../../store/DesignerStore";
import {idGenerate} from "../../../utils/IdGenerate";
import {MovableItemType} from "../../operate-provider/movable/types";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import FloatPanel from "../common/FloatPanel";
import {BaseInfoType} from "../../DesignerType";
import Input from "../../../ui/input/Input";
import DesignerLoaderFactory from "../../loader/DesignerLoaderFactory";

class CompList extends Component {

    constructor(props: any) {
        super(props);
        const {doInit} = compListStore;
        doInit && doInit();
    }

    addItem = (compKey: string, name: string) => {
        const {addItem} = designerStore;
        let {maxLevel, setMaxLevel, setAddRecordCompId} = eventOperateStore;
        let movableItem: MovableItemType = {
            name: name,
            type: compKey,
            width: 320,
            height: 200,
            position: [0, 0],
            id: idGenerate.generateId(),
            lock: false,
            hide: false,
            order: ++maxLevel,
        }
        setAddRecordCompId(movableItem.id!)
        setMaxLevel && setMaxLevel(maxLevel);
        addItem && addItem(movableItem);
    }

    getChartDom = () => {
        let chartDom = [];
        let {classifyKey} = classifyListStore
        let {compInfoArr, compKey} = compListStore;
        if (classifyKey !== 'all') {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.typeKey === classifyKey;
            })
        }
        if (compKey !== '') {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.compName.indexOf(compKey) >= 0;
            })
        }
        for (let i = 0; i < compInfoArr.length; i++) {
            let compInfo: any = compInfoArr[i];
            const {compName, compKey} = compInfo;
            let lcCompInit: any = DesignerLoaderFactory.getLoader().customComponentInfoMap[compKey];
            let chartImg = lcCompInit.getChartImg();
            chartDom.push(
                <div key={i + ''} className={'list-item droppable-element'}>
                    <div className={'item-header'} ref={'drag-target'}>
                        <div className={'item-name'}>{compName}</div>
                        <div className={'item-type'}>Antd</div>
                    </div>
                    <div className={'item-content'} onDoubleClick={() => this.addItem(compKey, compName)}>
                        <img src={chartImg} alt={'组件预览图'}/>
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

    searchChart = (data: string | number) => {
        const {setCompKey} = compListStore;
        setCompKey && setCompKey(data as string);
    }

    render() {
        return (
            <FloatPanel className={'comp-list'} title={'组件列表'} onClose={this.onClose}
                        initPosition={{x: 60, y: -window.innerHeight + 50}} width={190}>
                <div className={'list-search'}>
                    <Input placeholder="搜索图层" onChange={this.searchChart}/>
                </div>
                <div className={'list-items'}>
                    {this.getChartDom()}
                </div>
            </FloatPanel>
        );
    }
}

export default observer(CompList);