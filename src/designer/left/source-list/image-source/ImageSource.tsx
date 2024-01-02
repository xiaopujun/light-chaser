import {useEffect, useState} from "react";
import URLUtil from "../../../../utils/URLUtil";
import {ILayerItem, SaveType} from "../../../DesignerType";
import operatorMap from "../../../../framework/operate/index";
import {AbstractOperator} from "../../../../framework/operate/AbstractOperator";
import Input from "../../../../ui/input/Input";
import './ImageSource.less';
import eventOperateStore from "../../../operate-provider/EventOperateStore";
import designerStore from "../../../store/DesignerStore";
import editorDesignerLoader from "../../../loader/EditorDesignerLoader";
import IdGenerate from "../../../../utils/IdGenerate";
import {BaseImageComponentProps} from "../../../../comps/lc/base-image/BaseImageController";


export const ImageSource: React.FC = () => {

    const [imageList, setImageList] = useState([]);

    const registerDrag = () => {
        //处理拖拽元素到画布中
        const dragContainer = document.getElementById("designer-ds-content");
        const dragElements = document.getElementById("image-source-list");
        dragElements && dragElements.addEventListener('dragstart', dragStart);
        dragContainer && dragContainer.addEventListener('dragover', dragover);
        dragContainer && dragContainer.addEventListener('drop', drop);
    }

    const unregisterDrag = () => {
        const dragContainer = document.getElementById("designer-ds-content");
        const dragElements = document.getElementById("image-source-list");
        dragElements && dragElements.addEventListener('dragstart', dragStart);
        dragContainer && dragContainer.removeEventListener('dragover', dragover);
        dragContainer && dragContainer.removeEventListener('drop', drop);
    }

    //拖拽开始
    const dragStart = (event: any) => {
        // 设置拖拽数据
        if (event.target.classList.contains('droppable-element')) {
            const element = event.target;
            (event as any).dataTransfer.setData('imageUrl', element.getAttribute('data-url'));
        }
    }

    //拖拽覆盖
    const dragover = (event: any) => {
        event.preventDefault(); // 阻止默认行为以允许拖放
    }
    //释放拖拽元素
    const drop = (event: any) => {
        event.preventDefault();
        const url = (event as any).dataTransfer.getData('imageUrl');
        console.log("dragStart", url);
        if (!url) return;
        //获取鼠标位置,添加元素
        const {scale, dsContentRef} = eventOperateStore;
        const contentPos = dsContentRef?.getBoundingClientRect();
        const x = (event.clientX - (contentPos?.x || 0)) / scale;
        const y = (event.clientY - (contentPos?.y || 0)) / scale;
        addItem("BaseImage", [x, y], url);
    }

    const addItem = (compKey: string, position = [0, 0], url: string) => {
        const {addItem, elemConfigs} = designerStore;
        let {maxLevel, setMaxLevel, setAddRecordCompId} = eventOperateStore;
        const {definitionMap} = editorDesignerLoader;
        const definition = definitionMap[compKey];
        const {compName, width = 320, height = 200} = definition.getBaseInfo();
        const id = IdGenerate.generateId();
        let movableItem: ILayerItem = {
            name: compName,
            type: compKey,
            x: Math.round(position![0]),
            y: Math.round(position![1]),
            id,
            lock: false,
            hide: false,
            order: ++maxLevel,
            width,
            height,
        }
        setAddRecordCompId(movableItem.id!)
        setMaxLevel && setMaxLevel(maxLevel);
        addItem && addItem(movableItem);

        //图片资源拖拽要提前设置好图片地址
        const initConfig: BaseImageComponentProps = definition.getInitConfig();
        initConfig.style!.type = 'local';
        initConfig.style!.localUrl = url;
        elemConfigs[id] = initConfig;
    }

    useEffect(() => {
        const {saveType, id} = URLUtil.parseUrlParams();
        (operatorMap[saveType as SaveType] as AbstractOperator).getImageSourceList(id).then((data) => {
            setImageList(data);
        });

        registerDrag();
        return () => unregisterDrag();
    }, []);

    return <div className={'image-source'}>
        <div className={'image-source-search'}>
            <Input placeholder="搜索图片"/>
        </div>
        <div className={'image-source-list'} id={'image-source-list'}>
            {
                imageList.map((item: any, index: number) => {
                    return <div className={'image-source-item droppable-element'} key={index}
                                draggable={true} data-url={item.url}>
                        <div className={'image-source-item-header'}>{item.name || '无名称信息'}</div>
                        <div className={'image-source-item-body'}>
                            <div className={'item-bg-image'} style={{backgroundImage: `url(${item.url})`}}/>
                        </div>
                    </div>
                })
            }
        </div>
    </div>;
}