import AbstractRollback from "./AbstractRollback";
import {IHistoryRecord, IUpdStyleOperateData} from "../OperateType";
import rightStore from "../../../right/RightStore";
import layerManager from "../../../manager/LayerManager.ts";

export class StyleRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        const {next} = record;
        if (next) {
            const {id, data} = next as IUpdStyleOperateData;
            const {compController} = layerManager;
            const instance = compController[id];
            if (instance)
                instance.update(data)
            const {visible, setContentVisible} = rightStore;
            //回滚时，若配置项开启，则关闭
            if (visible) {
                setContentVisible(false)
                const tempTimer = setTimeout(() => {
                    setContentVisible(true);
                    clearTimeout(tempTimer);
                }, 1)
            }
        }
    }

    undo(record: IHistoryRecord): void {
        const {prev} = record;
        if (prev) {
            const {id, data} = prev as IUpdStyleOperateData;
            const {compController} = layerManager;
            const instance = compController[id];
            if (instance)
                instance.update(data)
            const {visible, setContentVisible} = rightStore;
            //回滚时，若配置项开启，则关闭
            if (visible) {
                setContentVisible(false)
                const tempTimer = setTimeout(() => {
                    setContentVisible(true);
                    clearTimeout(tempTimer);
                }, 1)
            }
        }
    }

}

const styleRollbackImpl = new StyleRollbackImpl();
export default styleRollbackImpl;