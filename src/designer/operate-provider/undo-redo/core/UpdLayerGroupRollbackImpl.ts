import AbstractRollback from "./AbstractRollback";
import {IHistoryRecord} from "../OperateType";
import designerStore from "../../../store/DesignerStore";
import {ILayerItem} from "../../../DesignerType";

export class UpdLayerGroupRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        const {next} = record;
        if (next) {
            const updData: ILayerItem[] = [];
            (next as ILayerItem[]).forEach((item) => {
                const {id, childIds} = item;
                updData.push({id, childIds});
            });
            const {updateLayout} = designerStore;
            updateLayout(updData);
        }
    }

    undo(record: IHistoryRecord): void {
        const {prev} = record;
        if (prev) {
            const updData: ILayerItem[] = [];
            (prev as ILayerItem[]).forEach((item) => {
                updData.push(item);
            });
            const {updateLayout} = designerStore;
            updateLayout(updData);
        }
    }

}

const updLayerGroupRollbackImpl = new UpdLayerGroupRollbackImpl();
export default updLayerGroupRollbackImpl;