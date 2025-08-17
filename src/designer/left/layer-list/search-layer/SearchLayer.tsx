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
import {observer} from "mobx-react";
import layerListStore from "../LayerListStore.ts";
import {ChangeEvent, useState} from "react";
import {ILayerItem} from "../../../DesignerType.ts";
import eventOperateStore from "../../../operate-provider/EventOperateStore.ts";
import layerManager from "../../../manager/LayerManager.ts";
import {Input, Modal} from "antd";
import './SearchLayer.less';

export const SearchLayer = observer(() => {
    const [list, setList] = useState<ILayerItem[]>([]);
    const {searchLayer} = layerListStore;

    const onClose = () => {
        layerListStore.setSearchLayer(false);
        setList([]);
    };

    const doSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value || value === '') {
            setList([]);
            return;
        }
        const {layerConfigs} = layerManager;
        const searchResult: ILayerItem[] = [];
        Object.keys(layerConfigs).forEach(id => {
            if (layerConfigs[id].name?.includes(value))
                searchResult.push({id, name: layerConfigs[id].name});
        });
        setList(searchResult as ILayerItem[]);
    }

    const itemClick = (id: string) => {
        eventOperateStore.setTargetIds([id]);
        onClose();
    }

    return (
        <Modal
            title={<span className="search-dialog-title">图层搜索</span>}
            open={searchLayer}
            onCancel={onClose}
            width={480}
            footer={null}
            className="search-layer-modal"
            bodyStyle={{padding: '24px'}}
            centered
            destroyOnClose
        >
            <div className="search-layer-content">
                <div className="search-input-container">
                    <Input
                        placeholder="输入图层名称..."
                        autoFocus
                        allowClear
                        onChange={doSearch}
                        className="search-layer-input"
                    />
                </div>
                <div className="search-results-container">
                    {list.length > 0 ? (
                        list.map(item => (
                            <div
                                key={item.id}
                                className="search-result-item"
                                onClick={() => itemClick(item.id!)}
                            >
                                <span className="result-item-name">{item.name}</span>
                                <span className="result-item-id">ID: {item.id}</span>
                            </div>
                        ))
                    ) : (
                        <div className="search-empty-state">
                            <span>输入图层名称查找对应元素</span>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
})

export default SearchLayer;