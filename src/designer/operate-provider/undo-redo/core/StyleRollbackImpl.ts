import AbstractRollback from "./AbstractRollback";
import {HistoryRecordType, StyleDataType} from "../HistoryType";
import designerStore from "../../../store/DesignerStore";
import rightStore from "../../../right/RightStore";

export class StyleRollbackImpl extends AbstractRollback {
    redo(): void {
    }

    undo(record: HistoryRecordType): void {
        const {prev} = record;
        if (prev) {
            const {id, data} = prev as StyleDataType;
            const {compInstances} = designerStore;
            const instance = compInstances[id];
            if (instance)
                instance.update(data)
            const {visible, setContentVisible} = rightStore;
            //回滚时，若配置项开启，则关闭
            if (visible) {
                setContentVisible(false)
                setTimeout(() => {
                    setContentVisible(true)
                }, 1)
            }
        }
    }

}

const styleRollbackImpl = new StyleRollbackImpl();
export default styleRollbackImpl;