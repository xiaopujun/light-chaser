import {ChangeEvent, Component} from 'react';
import './CompList.less';
import {observer} from "mobx-react";
import eventOperateStore from "../../../operate-provider/EventOperateStore";
import {ILayerItem} from "../../../DesignerType";
import IdGenerate from "../../../../utils/IdGenerate";
import editorDesignerLoader from "../../../loader/EditorDesignerLoader";
import componentListStore from "../ComponentListStore";
import {AbstractDefinition, BaseInfoType} from "../../../../framework/core/AbstractDefinition";
import DragAddProvider from "../../../../framework/drag-scale/DragAddProvider";
import historyRecordOperateProxy from "../../../operate-provider/undo-redo/HistoryRecordOperateProxy";
import {Input} from "antd";

class CompList extends Component {

    private dragAddProvider: DragAddProvider | null = null;

    constructor(props: any) {
        super(props);
        const {doInit} = componentListStore;
        doInit && doInit();
    }


    componentDidMount() {
        let count = 0;
        const interval = setInterval(() => {
            const cdc = document.getElementById("component-drag-container");
            const ddc = document.getElementById("designer-ds-content");
            if (cdc && ddc) {
                clearInterval(interval);
                //处理拖拽元素到画布中
                this.dragAddProvider = new DragAddProvider(
                    document.getElementById("component-drag-container")!,
                    document.getElementById("designer-ds-content")!,
                    this.dragStart,
                    this.dragover,
                    this.drop
                );
            }
            //尝试挂载拖拽组件100次后放弃
            if (++count > 100) {
                clearInterval(interval);
                console.warn("组件列表与画布拖拽关联失败，无法通过拖拽添加组件。")
            }
        }, 100)
    }

    componentWillUnmount() {
        this.dragAddProvider?.destroy();
    }

    //拖拽开始
    dragStart = (event: DragEvent) => {
        // 设置拖拽数据
        if ((event.target as HTMLElement).classList.contains('droppable-element')) {
            const element = event.target as HTMLElement;
            event.dataTransfer?.setData('type', element.getAttribute('data-type')!);
        }
    }
    //拖拽覆盖
    dragover = (event: DragEvent) => {
        event.preventDefault(); // 阻止默认行为以允许拖放
    }
    //释放拖拽元素
    drop = (event: DragEvent) => {
        event.preventDefault();
        const type = event.dataTransfer?.getData('type');
        if (!type) return;
        //获取鼠标位置,添加元素
        const {scale, dsContentRef} = eventOperateStore;
        const contentPos = dsContentRef?.getBoundingClientRect();
        const x = (event.clientX - (contentPos?.x || 0)) / scale;
        const y = (event.clientY - (contentPos?.y || 0)) / scale;
        this.addItem(type, [x, y]);
    }

    addItem = (compKey: string, position = [0, 0]) => {
        let {setAddRecordCompId} = eventOperateStore;
        const {definitionMap} = editorDesignerLoader;
        const {compName, width = 320, height = 200} = definitionMap[compKey].getBaseInfo();
        const movableItem: ILayerItem = {
            name: compName,
            type: compKey,
            x: Math.round(position![0]),
            y: Math.round(position![1]),
            id: IdGenerate.generateId(),
            lock: false,
            hide: false,
            width,
            height,
        }
        //标识本次操作为手动添加组件，与回滚撤销区分开
        setAddRecordCompId(movableItem.id!)
        historyRecordOperateProxy.doAdd(movableItem);
    }

    getChartDom = () => {
        const chartDom = [];
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
            const compInfo: BaseInfoType = compInfoArr[i];
            const {compName, compKey} = compInfo;
            const definition: AbstractDefinition = editorDesignerLoader.definitionMap[compKey];
            const chartImg = definition.getChartImg();
            chartDom.push(
                <div key={i + ''} className={'list-item droppable-element'} draggable={true}
                     onDoubleClick={() => this.addItem(compKey)}
                     data-type={compKey}>
                    <div style={{pointerEvents: 'none'}}>
                        <div className={'item-header'} ref={'drag-target'}>
                            <div className={'item-name'}>{compName}</div>
                        </div>
                        <div className={'item-content'}>
                            <img src={chartImg!} alt={compName}/>
                        </div>
                    </div>
                </div>
            )
        }
        return chartDom;
    }


    searchChart = (e: ChangeEvent<HTMLInputElement>) => {
        const {setSearch} = componentListStore;
        setSearch && setSearch((e.target as HTMLInputElement).value);
    }

    render() {
        return (
            <>
                <div className={'list-search'}>
                    <Input placeholder={"搜索组件"} onChange={this.searchChart} style={{height: 28}}/>
                </div>
                <div className={'list-items'} id={'component-drag-container'}>
                    {this.getChartDom()}
                </div>
            </>
        );
    }
}

export default observer(CompList);