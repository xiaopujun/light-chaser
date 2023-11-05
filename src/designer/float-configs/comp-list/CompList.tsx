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


    componentDidMount() {
        //处理拖拽元素到画布中
        const dragContainer = document.getElementById("designer-ds-content");
        const dragElements = document.getElementById("component-drag-container");
        dragElements && dragElements.addEventListener('dragstart', this.dragStart);
        dragContainer && dragContainer.addEventListener('dragover', this.dragover);
        dragContainer && dragContainer.addEventListener('drop', this.drop);
    }

    componentWillUnmount() {
        const dragContainer = document.getElementById("designer-ds-content");
        const dragElements = document.getElementById("component-drag-container");
        dragElements && dragElements.removeEventListener('dragstart', this.dragStart);
        dragContainer && dragContainer.removeEventListener('dragover', this.dragover);
        dragContainer && dragContainer.removeEventListener('drop', this.drop);
    }

    //拖拽开始
    dragStart = (event: any) => {
        // 设置拖拽数据
        if (event.target.classList.contains('droppable-element')) {
            const element = event.target;
            (event as any).dataTransfer.setData('type', element.getAttribute('data-type'));
            (event as any).dataTransfer.setData('name', element.getAttribute('data-name'));
        }
    }
    //拖拽覆盖
    dragover = (event: any) => {
        event.preventDefault(); // 阻止默认行为以允许拖放
    }
    //释放拖拽元素
    drop = (event: any) => {
        event.preventDefault();
        const type = (event as any).dataTransfer.getData('type');
        const name = (event as any).dataTransfer.getData('name');
        //获取鼠标位置,添加元素
        const {scale, dsContentRef} = eventOperateStore;
        const contentPos = dsContentRef?.getBoundingClientRect();
        const x = (event.clientX - (contentPos?.x || 0)) / scale;
        const y = (event.clientY - (contentPos?.y || 0)) / scale;
        this.addItem(type, name, [x, y]);
    }

    addItem = (compKey: string, name: string, position?: [number, number]) => {
        const {addItem} = designerStore;
        let {maxLevel, setMaxLevel, setAddRecordCompId} = eventOperateStore;
        let movableItem: MovableItemType = {
            name: name,
            type: compKey,
            width: 320,
            height: 200,
            position: position || [0, 0],
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
                <div key={i + ''} className={'list-item droppable-element'} draggable={true}
                     onDoubleClick={() => this.addItem(compKey, compName)}
                     data-type={compKey}
                    //todo 想想办法，中文变量值能否不放在这里
                     data-name={compName}>
                    <div style={{pointerEvents: 'none'}}>
                        <div className={'item-header'} ref={'drag-target'}>
                            <div className={'item-name'}>{compName}</div>
                            <div className={'item-type'}>Antd</div>
                        </div>
                        <div className={'item-content'}>
                            <img src={chartImg} alt={'组件预览图'}/>
                        </div>
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
                <div className={'list-items'} id={'component-drag-container'}>
                    {this.getChartDom()}
                </div>
            </FloatPanel>
        );
    }
}

export default observer(CompList);