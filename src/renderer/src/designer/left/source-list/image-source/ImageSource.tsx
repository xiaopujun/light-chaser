import {useEffect, useRef, useState} from "react";
import URLUtil from "../../../../utils/URLUtil";
import {ILayerItem, SaveType} from "../../../DesignerType";
import operatorMap from "../../../../framework/operate/index";
import {AbstractOperator} from "../../../../framework/operate/AbstractOperator";
// import Input from "../../../../json-schema/ui/input/Input";
import './ImageSource.less';
import eventOperateStore from "../../../operate-provider/EventOperateStore";
import layerManager from "../../../manager/LayerManager.ts";
import editorDesignerLoader from "../../../loader/EditorDesignerLoader";
import IdGenerate from "../../../../utils/IdGenerate";
import {BaseImageComponentProps} from "../../../../comps/lc/base-image/BaseImageController";
import {IImageData} from "../../../../comps/lc/base-image/BaseImageComponent";
import DragAddProvider from "../../../../framework/drag-scale/DragAddProvider";
import {Popconfirm} from "antd";
import historyRecordOperateProxy from "../../../operate-provider/undo-redo/HistoryRecordOperateProxy.ts";
import {Close, Help} from "@icon-park/react";


export default function ImageSource() {

    const [imageList, setImageList] = useState<IImageData[]>([]);
    const dragAddProvider = useRef<DragAddProvider | null>(null);

    //拖拽开始
    const dragStart = (event: DragEvent) => {
        // 设置拖拽数据
        if ((event.target as HTMLElement).classList.contains('droppable-element')) {
            const element = event.target as HTMLElement;
            event.dataTransfer?.setData('imageUrl', element.getAttribute('data-url')!);
            event.dataTransfer?.setData('imageHash', element.getAttribute('data-hash')!);
        }
    }

    //拖拽覆盖
    const dragover = (event: DragEvent) => {
        event.preventDefault(); // 阻止默认行为以允许拖放
    }
    //释放拖拽元素
    const drop = (event: DragEvent) => {
        event.preventDefault();
        const url = event.dataTransfer?.getData('imageUrl');
        const hash = event.dataTransfer?.getData('imageHash');
        if (!url) return;
        //获取鼠标位置,添加元素
        const {scale, dsContentRef} = eventOperateStore;
        const contentPos = dsContentRef?.getBoundingClientRect();
        const x = (event.clientX - (contentPos?.x || 0)) / scale;
        const y = (event.clientY - (contentPos?.y || 0)) / scale;
        addItem("BaseImage", [x, y], url, hash);
    }

    const addItem = (compKey: string, position = [0, 0], url: string, hash?: string) => {
        const {elemConfigs} = layerManager;
        let {setAddRecordCompId} = eventOperateStore;
        const {definitionMap} = editorDesignerLoader;
        const definition = definitionMap[compKey];
        const {compName, width = 320, height = 200} = definition.getBaseInfo();
        const id = IdGenerate.generateId();
        const movableItem: ILayerItem = {
            name: compName,
            type: compKey,
            x: Math.round(position![0]),
            y: Math.round(position![1]),
            id,
            lock: false,
            hide: false,
            width,
            height,
        }
        setAddRecordCompId(movableItem.id!)
        historyRecordOperateProxy.doAdd(movableItem);

        //图片资源拖拽要提前设置好图片地址
        const initConfig: BaseImageComponentProps = definition.getInitConfig();
        initConfig.style!.type = 'local';
        initConfig.style!.localUrl = url;
        initConfig.style!.hash = hash;
        elemConfigs![id] = initConfig;
    }

    const getImageList = () => {
        const {saveType, id} = URLUtil.parseUrlParams();
        (operatorMap[saveType as SaveType] as AbstractOperator).getImageSourceList(id).then((data) => {
            setImageList(data);
        });
    }

    useEffect(() => {
        getImageList();

        //处理拖拽元素到画布中
        dragAddProvider.current = new DragAddProvider(
            document.getElementById("image-source-list")!,
            document.getElementById("designer-ds-content")!,
            dragStart,
            dragover,
            drop
        );
        return () => dragAddProvider.current?.destroy();
    }, []);

    const confirmDel = (imageId: string) => {
        const {saveType} = URLUtil.parseUrlParams();
        (operatorMap[saveType as SaveType] as AbstractOperator).delImageSource(imageId).then((data) => {
            if (data)
                getImageList();
        });
    }

    return <div className={'image-source'}>
        {/*<div className={'image-source-search'}>*/}
        {/*    <Input placeholder="搜索图片"/>*/}
        {/*</div>*/}
        <div className={'image-source-list'} id={'image-source-list'}>
            {
                imageList.map((item: IImageData, index: number) => {
                    return <div className={'image-source-item droppable-element'} key={index}
                                draggable={true} data-url={item.url}
                                data-hash={item.hash}>
                        <div className={'image-source-item-header'}>
                            <div className={'isi-title'}>{item.name || '无名称信息'}</div>
                            <div className={'isi-operate'}>
                                <Popconfirm title="确认删除吗?"
                                            icon={<Help style={{
                                                color: 'red',
                                                position: 'relative',
                                                top: 3,
                                                marginRight: 2
                                            }}/>}
                                            description="可能会导致已经使用的图片组件失效!"
                                            onConfirm={() => confirmDel(item.id!)}
                                            okText="是"
                                            cancelText="否">
                                    <Close/>
                                </Popconfirm>
                            </div>
                        </div>
                        <div className={'image-source-item-body'}>
                            <div className={'item-bg-image'} style={{backgroundImage: `url(${item.url})`}}/>
                        </div>
                    </div>
                })
            }
        </div>
    </div>;
}