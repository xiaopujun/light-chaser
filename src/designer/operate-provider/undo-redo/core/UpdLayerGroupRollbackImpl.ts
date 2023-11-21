import AbstractRollback from "./AbstractRollback";
import {HistoryRecordType} from "../HistoryType";
import designerStore from "../../../store/DesignerStore";
import {MovableItemType} from "../../movable/types";

export class UpdLayerGroupRollbackImpl extends AbstractRollback {
    redo(record: HistoryRecordType): void {
        const {next} = record;
        if (next) {
            const updData: MovableItemType[] = [];
            (next as MovableItemType[]).forEach((item) => {
                const {id, childIds} = item;
                updData.push({id, childIds});
            });
            const {updateLayout} = designerStore;
            updateLayout(updData);
        }
    }

    undo(record: HistoryRecordType): void {
        const {prev} = record;
        if (prev) {
            const updData: MovableItemType[] = [];
            (prev as MovableItemType[]).forEach((item) => {
                updData.push(item);
            });
            const {updateLayout} = designerStore;
            updateLayout(updData);
        }
    }

}

const updLayerGroupRollbackImpl = new UpdLayerGroupRollbackImpl();
export default updLayerGroupRollbackImpl;