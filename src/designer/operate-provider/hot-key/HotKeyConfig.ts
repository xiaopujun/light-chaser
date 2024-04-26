import {HotKeyConfigType, HotKeyTriggerType} from "./HotKey";
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
    doDelete,
    doGrouping,
    doHide,
    doLock,
    doMoveDown,
    doMoveLeft,
    doMoveRight,
    doMoveUp,
    doSave,
    doUnGrouping,
    doUnLock, layerMoveDown, layerMoveUp,
    redo,
    removeFromGroup,
    selectAll,
    layerToBottom,
    toggleCanvasConfig,
    toggleGlobalThemeConfig,
    toggleHotKeyDes,
    toggleProjectConfig,
    toggleSecondaryBorder,
    layerToTop,
    undo
} from "./HotKeyImpl";

const commonHotKeyConfigs: HotKeyConfigType = {
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
        handler: layerToTop,
    },
    'control + arrowdown': {
        handler: layerToBottom,
    },
    'alt + arrowup': {
        handler: layerMoveUp,
    },
    'alt + arrowdown': {
        handler: layerMoveDown,
    },
    'control + s': {
        handler: doSave,
    },
    'control + z': {
        handler: undo,
    },
    'control + shift + z': {
        handler: redo,
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
    'arrowup': {
        handler: doMoveUp,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'arrowdown': {
        handler: doMoveDown,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'arrowleft': {
        handler: doMoveLeft,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'arrowright': {
        handler: doMoveRight,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + shift + arrowup': {
        handler: doBaseBottomEnlargeUp,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + shift + arrowdown': {
        handler: doBaseUpEnlargeDown,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + shift + arrowleft': {
        handler: doBaseRightEnlargeLeft,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + shift + arrowright': {
        handler: doBaseLeftEnlargeRight,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + alt + arrowup': {
        handler: doBaseBottomDecreaseUp,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + alt + arrowdown': {
        handler: doBaseUpDecreaseDown,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + alt + arrowleft': {
        handler: doBaseRightDecreaseLeft,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + alt + arrowright': {
        handler: doBaseLeftDecreaseRight,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control + g': {
        handler: doGrouping,
    },
    'control + shift + g': {
        handler: doUnGrouping,
    },
    'alt + shift + g': {
        handler: removeFromGroup,
    }
}

const isMac = /macintosh|mac os x/i.test(navigator.userAgent);

const winHotKey: HotKeyConfigType = {
    'delete': {
        handler: [delBPLine, delBPNode, doDelete],
    },
    ...commonHotKeyConfigs
}

const macHotKey: HotKeyConfigType = {
    'meta + backspace': {
        handler: [delBPLine, delBPNode, doDelete],
    },
    ...commonHotKeyConfigs
}


export const hotkeyConfigs: HotKeyConfigType = isMac ? macHotKey : winHotKey;