import {Component} from 'react';
import './CompList.less';
import {observer} from "mobx-react";
import designerStore from "../../../store/DesignerStore";
import eventOperateStore from "../../../operate-provider/EventOperateStore";
import {BaseInfoType, ILayerItem} from "../../../DesignerType";
import Input from "../../../../ui/input/Input";
import DesignerLoaderFactory from "../../../loader/DesignerLoaderFactory";
import IdGenerate from "../../../../utils/IdGenerate";
import editorDesignerLoader from "../../../loader/EditorDesignerLoader";
import componentListStore from "../ComponentListStore";

class CompList extends Component {

    constructor(props: any) {
        super(props);
        const {doInit} = componentListStore;
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
        if (!type) return;
        //获取鼠标位置,添加元素
        const {scale, dsContentRef} = eventOperateStore;
        const contentPos = dsContentRef?.getBoundingClientRect();
        const x = (event.clientX - (contentPos?.x || 0)) / scale;
        const y = (event.clientY - (contentPos?.y || 0)) / scale;
        this.addItem(type, [x, y]);
    }

    addItem = (compKey: string, position = [0, 0]) => {
        const {addItem} = designerStore;
        let {maxLevel, setMaxLevel, setAddRecordCompId} = eventOperateStore;
        const {definitionMap} = editorDesignerLoader;
        const {compName, width = 320, height = 200} = definitionMap[compKey].getBaseInfo();
        let movableItem: ILayerItem = {
            name: compName,
            type: compKey,
            x: Math.round(position![0]),
            y: Math.round(position![1]),
            id: IdGenerate.generateId(),
            lock: false,
            hide: false,
            order: ++maxLevel,
            width,
            height,
        }
        setAddRecordCompId(movableItem.id!)
        setMaxLevel && setMaxLevel(maxLevel);
        addItem && addItem(movableItem);
    }

    getChartDom = () => {
        let chartDom = [];
        let {compInfoArr, search, categories, subCategories} = componentListStore;
        if (categories !== "all") {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.categorize === categories;
            })
        }
        if (subCategories !== "all") {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.subCategorize === subCategories;
            })
        }
        if (search !== '') {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.compName.indexOf(search) >= 0;
            })
        }
        for (let i = 0; i < compInfoArr.length; i++) {
            let compInfo: any = compInfoArr[i];
            const {compName, compKey} = compInfo;
            let lcCompInit: any = DesignerLoaderFactory.getLoader().definitionMap[compKey];
            let chartImg = lcCompInit.getChartImg();
            chartDom.push(
                <div key={i + ''} className={'list-item droppable-element'} draggable={true}
                     onDoubleClick={() => this.addItem(compKey)}
                     data-type={compKey}>
                    <div style={{pointerEvents: 'none'}}>
                        <div className={'item-header'} ref={'drag-target'}>
                            <div className={'item-name'}>{compName}</div>
                            <div className={'item-type'}>Antd</div>
                        </div>
                        <div className={'item-content'}>
                            <img src={chartImg} alt={compName}/>
                        </div>
                    </div>
                </div>
            )
        }
        return chartDom;
    }


    searchChart = (data: string | number) => {
        const {setSearch} = componentListStore;
        setSearch && setSearch(data as string);
    }

    render() {
        return (
            <>
                <div className={'list-search'}>
                    <Input placeholder="搜索组件" onChange={this.searchChart}/>
                </div>
                <div className={'list-items'} id={'component-drag-container'}>
                    {this.getChartDom()}
                </div>
            </>
        );
    }
}

export default observer(CompList);