import {observer} from "mobx-react";
import layerListStore from "../LayerListStore.ts";
import Dialog from "../../../../json-schema/ui/dialog/Dialog.tsx";
import Input from "../../../../json-schema/ui/input/Input.tsx";
import './SearchLayer.less';
import layerManager from "../../../manager/LayerManager.ts";
import {useState} from "react";
import {ILayerItem} from "../../../DesignerType.ts";
import eventOperateStore from "../../../operate-provider/EventOperateStore.ts";

export const SearchLayer = observer(() => {
    const [list, setList] = useState<ILayerItem[]>([]);
    const {searchLayer} = layerListStore;
    const onClose = () => {
        layerListStore.setSearchLayer(false);
        setList([]);
    };

    const doSearch = (value: string) => {
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