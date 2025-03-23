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
import Dialog from "../../../../json-schema/ui/dialog/Dialog.tsx";
import './SearchLayer.less';
import {useState, ChangeEvent} from "react";
import {ILayerItem} from "../../../DesignerType.ts";
import eventOperateStore from "../../../operate-provider/EventOperateStore.ts";
import layerManager from "../../../manager/LayerManager.ts";
import {Input} from "antd";

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
        <Dialog title={'搜索图层'} className={'search-layer-dialog'} visible={searchLayer} onClose={onClose}>
            <div className={'search-layer-input'}>
                <Input placeholder={'请输入图层名称'} autoFocus={true} onChange={doSearch}/>
            </div>
            <div className={'search-layer-body'}>
                {
                    list.length !== 0 && list.map(item => {
                        return <div key={item.id} className={'search-item'}
                                    onClick={() => itemClick(item.id!)}>{item.name}</div>
                    })
                }
            </div>
        </Dialog>
    );
})

export default SearchLayer;