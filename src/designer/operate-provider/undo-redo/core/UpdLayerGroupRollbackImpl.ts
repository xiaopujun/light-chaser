import AbstractRollback from "./AbstractRollback";
import {IHistoryRecord} from "../OperateType";
import designerStore from "../../../store/DesignerStore";
import {ILayerItem} from "../../../DesignerType";
import {cloneDeep} from "lodash";
import {toJS} from "mobx";

/**
 * 图层编组和解除编组不能简单的认为只需要调用doGrouping和doUnGrouping即可。撤销和重做的额过程中，图层对应的设置项也要完整的撤销和重做
 */
export class UpdLayerGroupRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        const {next} = record;
        if (next) {
            const updData: ILayerItem[] = [];
            (next as ILayerItem[]).forEach((item) => {
                if ('id' in item)
                    updData.push(cloneDeep(item));
                if ('layerHeader' in item)
                    designerStore.layerHeader = item.layerHeader as string;
                if ('layerTail' in item)
                    designerStore.layerTail = item.layerTail as string;
            });
            const {updateLayer} = designerStore;
            updateLayer(updData);
        }
    }

    undo(record: IHistoryRecord): void {
        const {prev} = record;
        if (prev) {
            const updData: ILayerItem[] = [];
            (prev as ILayerItem[]).forEach((item) => {
                if ('id' in item)
                    updData.push(cloneDeep(item));
                if ('layerHeader' in item)
                    designerStore.layerHeader = item.layerHeader as string;
                if ('layerTail' in item)
                    designerStore.layerTail = item.layerTail as string;

            });
            const {updateLayer} = designerStore;
            updateLayer(updData);
        }
    }

}

const updLayerGroupRollbackImpl = new UpdLayerGroupRollbackImpl();
export default updLayerGroupRollbackImpl;