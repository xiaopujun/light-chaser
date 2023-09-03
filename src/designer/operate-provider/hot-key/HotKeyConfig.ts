import {HotKeyConfigType, TriggerType} from "./HotKey";
import {doScale} from "../scale/Scaler";
import {
    doCopy,
    doDelete,
    doLock,
    doMoveDown,
    doMoveLeft,
    doMoveRight,
    doMoveUp,
    doBaseUpEnlargeDown,
    doBaseRightEnlargeLeft,
    doBaseLeftEnlargeRight,
    doBaseBottomEnlargeUp,
    doSave,
    selectAll,
    toBottom,
    toTop,
    doBaseBottomDecreaseUp,
    doBaseUpDecreaseDown,
    doBaseRightDecreaseLeft,
    doBaseLeftDecreaseRight,
    undo,
    redo,
    doUnLock,
    doHide
} from "./HotKeyImpl";

export const getHotKeyConfig: HotKeyConfigType = {
    'alt + wheel': {
        handler: doScale,
        triggerType: TriggerType.COILED,
    },
    'control + a': {
        handler: selectAll,
    },
    'control + v': {
        handler: doCopy,
    },
    'control + l': {
        handler: doLock,
    },
    'control + shift + l': {
        handler: doUnLock,
    },
    'control + h': {
        handler: doHide,
    },
    'control + arrowup': {
        handler: toTop,
    },
    'control + arrowdown': {
        handler: toBottom,
    },
    'control + s': {
        handler: doSave,
    },
    'delete': {
        handler: doDelete,
    },
    'control + z': {
        handler: undo,
    },
    'control + shift + z': {
        handler: redo,
    },
    'arrowup': {
        handler: doMoveUp,
        triggerType: TriggerType.COILED,
    },
    'arrowdown': {
        handler: doMoveDown,
        triggerType: TriggerType.COILED,
    },
    'arrowleft': {
        handler: doMoveLeft,
        triggerType: TriggerType.COILED,
    },
    'arrowright': {
        handler: doMoveRight,
        triggerType: TriggerType.COILED,
    },
    'control + shift + arrowup': {
        handler: doBaseBottomEnlargeUp,
        triggerType: TriggerType.COILED,
    },
    'control + shift + arrowdown': {
        handler: doBaseUpEnlargeDown,
        triggerType: TriggerType.COILED,
    },
    'control + shift + arrowleft': {
        handler: doBaseRightEnlargeLeft,
        triggerType: TriggerType.COILED,
    },
    'control + shift + arrowright': {
        handler: doBaseLeftEnlargeRight,
        triggerType: TriggerType.COILED,
    },
    'control + alt + arrowup': {
        handler: doBaseBottomDecreaseUp,
        triggerType: TriggerType.COILED,
    },
    'control + alt + arrowdown': {
        handler: doBaseUpDecreaseDown,
        triggerType: TriggerType.COILED,
    },
    'control + alt + arrowleft': {
        handler: doBaseRightDecreaseLeft,
        triggerType: TriggerType.COILED,
    },
    'control + alt + arrowright': {
        handler: doBaseLeftDecreaseRight,
        triggerType: TriggerType.COILED,
    },
}