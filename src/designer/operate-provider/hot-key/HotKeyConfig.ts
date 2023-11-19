import {HotKeyConfigType, TriggerType} from "./HotKey";
import {
    delBPLine,
    delBPNode,
    doBaseBottomDecreaseUp,
    doBaseBottomEnlargeUp,
    doBaseLeftDecreaseRight,
    doBaseLeftEnlargeRight,
    doBaseRightDecreaseLeft,
    doBaseRightEnlargeLeft,
    doBaseUpDecreaseDown,
    doBaseUpEnlargeDown,
    doCopy,
    doDelete, doGrouping,
    doHide,
    doLock,
    doMoveDown,
    doMoveLeft,
    doMoveRight,
    doMoveUp,
    doSave, doUnGrouping,
    doUnLock,
    redo,
    selectAll,
    toBottom,
    toggleCanvasConfig,
    toggleGlobalThemeConfig,
    toggleHotKeyDes,
    toggleLayer,
    toggleProjectConfig,
    toggleSecondaryBorder,
    toTop,
    undo
} from "./HotKeyImpl";


export const hotkeyConfigs: HotKeyConfigType = {
    'control + a': {
        handler: selectAll,
        range: ".lc-ruler-content"
    },
    'control + v': {
        handler: doCopy,
        range: ".lc-ruler-content"
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
        handler: [delBPLine, delBPNode, doDelete],
    },
    'control + z': {
        handler: undo,
        range: ".lc-ruler-content"
    },
    'control + shift + z': {
        handler: redo,
        range: ".lc-ruler-content"
    },
    'control + k': {
        handler: toggleSecondaryBorder,
    },
    'control + 1': {
        handler: toggleProjectConfig,
    },
    'control + 2': {
        handler: toggleCanvasConfig,
    },
    'control + 3': {
        handler: toggleGlobalThemeConfig,
    },
    'control + 4': {
        handler: toggleHotKeyDes,
    },
    'control + 5': {
        handler: toggleLayer,
    },
    'arrowup': {
        handler: doMoveUp,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'arrowdown': {
        handler: doMoveDown,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'arrowleft': {
        handler: doMoveLeft,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'arrowright': {
        handler: doMoveRight,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + shift + arrowup': {
        handler: doBaseBottomEnlargeUp,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + shift + arrowdown': {
        handler: doBaseUpEnlargeDown,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + shift + arrowleft': {
        handler: doBaseRightEnlargeLeft,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + shift + arrowright': {
        handler: doBaseLeftEnlargeRight,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + alt + arrowup': {
        handler: doBaseBottomDecreaseUp,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + alt + arrowdown': {
        handler: doBaseUpDecreaseDown,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + alt + arrowleft': {
        handler: doBaseRightDecreaseLeft,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + alt + arrowright': {
        handler: doBaseLeftDecreaseRight,
        triggerType: TriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + g': {
        handler: doGrouping,
    },
    'control + shift + g': {
        handler: doUnGrouping,
    }
}