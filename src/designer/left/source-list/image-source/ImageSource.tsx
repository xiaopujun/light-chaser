/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */
import {useEffect, useRef, useState} from "react";
import URLUtil from "../../../../utils/URLUtil";
import {ILayerItem, SaveType} from "../../../DesignerType";
import operatorMap from "../../../../framework/operate/index";
import {AbstractOperator} from "../../../../framework/operate/AbstractOperator";
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
import {Close} from "@icon-park/react";

export default function ImageSource() {
    const [imageList, setImageList] = useState<IImageData[]>([]);
    const dragAddProvider = useRef<DragAddProvider | null>(null);

    const dragStart = (event: DragEvent) => {
        if ((event.target as HTMLElement).classList.contains('droppable-element')) {
            const element = event.target as HTMLElement;
            event.dataTransfer?.setData('imageUrl', element.getAttribute('data-url')!);
            event.dataTransfer?.setData('imageHash', element.getAttribute('data-hash')!);
        }
    }

    const dragover = (event: DragEvent) => {
        event.preventDefault();
    }

    const drop = (event: DragEvent) => {
        event.preventDefault();
        const url = event.dataTransfer?.getData('imageUrl');
        const hash = event.dataTransfer?.getData('imageHash');
        if (!url) return;
        const {scale, dsContentRef} = eventOperateStore;
        const contentPos = dsContentRef?.getBoundingClientRect();
        const x = (event.clientX - (contentPos?.x || 0)) / scale;
        const y = (event.clientY - (contentPos?.y || 0)) / scale;
        addItem("BaseImage", [x, y], url, hash);
    }

    const addItem = (compKey: string, position = [0, 0], url: string, hash?: string) => {
        const {elemConfigs} = layerManager;
        const {setAddRecordCompId} = eventOperateStore;
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

    return (
        <div className={'image-source'}>
            <div className={'image-source-list'} id={'image-source-list'}>
                {imageList.map((item: IImageData, index: number) => (
                    <div
                        className={'image-source-item droppable-element'}
                        key={index}
                        draggable={true}
                        data-url={item.url}
                        data-hash={item.hash}
                    >
                        <div className={'image-source-item-header'}>
                            <div className={'isi-title'}>{item.name || '未命名图片'}</div>
                            <div className={'isi-operate'}>
                                <Popconfirm
                                    title="确认删除图片吗？"
                                    description="删除后已使用该图片的组件将无法显示"
                                    onConfirm={() => confirmDel(item.id!)}
                                    okText="确认"
                                    cancelText="取消"
                                    okButtonProps={{className: 'primary-btn'}}
                                    cancelButtonProps={{className: 'secondary-btn'}}
                                    overlayClassName="image-source-popconfirm"
                                >
                                    <Close className="delete-icon"/>
                                </Popconfirm>
                            </div>
                        </div>
                        <div className={'image-source-item-body'}>
                            <div
                                className={'item-bg-image'}
                                style={{backgroundImage: `url(${item.url})`}}
                                title={item.name || '未命名图片'}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}