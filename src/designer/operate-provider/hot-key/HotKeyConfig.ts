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

import {HotKeyConfigType, HotKeyTriggerType} from "./HotKeyType";
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
    undo, searchLayer
} from "./HotKeyImpl";

const commonHotKeyConfigs: HotKeyConfigType = {
    'control+a': {
        handler: selectAll,
        range: ".lc-ruler-content"
    },
    'control+v': {
        handler: doCopy,
        range: ".lc-ruler-content"
    },


    'control+l': {
        handler: doLock,
    },
    'control+shift+l': {
        handler: doUnLock,
    },
    'control+h': {
        handler: doHide,
    },
    'control+arrowup': {
        handler: layerToTop,
    },
    'control+arrowdown': {
        handler: layerToBottom,
    },
    'alt+arrowup': {
        handler: layerMoveUp,
    },
    'alt+arrowdown': {
        handler: layerMoveDown,
    },
    'control+s': {
        handler: doSave,
    },
    'control+z': {
        handler: undo,
    },
    'control+shift+z': {
        handler: redo,
    },
    'control+k': {
        handler: toggleSecondaryBorder,
    },
    'control+1': {
        handler: toggleProjectConfig,
    },
    'control+2': {
        handler: toggleCanvasConfig,
    },
    'control+3': {
        handler: toggleGlobalThemeConfig,
    },
    'control+4': {
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
    'control+shift+arrowup': {
        handler: doBaseBottomEnlargeUp,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control+shift+arrowdown': {
        handler: doBaseUpEnlargeDown,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control+shift+arrowleft': {
        handler: doBaseRightEnlargeLeft,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control+shift+arrowright': {
        handler: doBaseLeftEnlargeRight,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control+alt+arrowup': {
        handler: doBaseBottomDecreaseUp,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control+alt+arrowdown': {
        handler: doBaseUpDecreaseDown,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control+alt+arrowleft': {
        handler: doBaseRightDecreaseLeft,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control+alt+arrowright': {
        handler: doBaseLeftDecreaseRight,
        triggerType: HotKeyTriggerType.COILED,
        range: ".lc-ruler-content"
    },
    'control+g': {
        handler: doGrouping,
    },
    'control+shift+g': {
        handler: doUnGrouping,
    },
    'alt+shift+g': {
        handler: removeFromGroup,
    },
    'control+f': {
        handler: searchLayer,
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
    'backspace': {
        handler: [delBPLine, delBPNode, doDelete],
    },
    ...commonHotKeyConfigs
}


export const hotkeyConfigs: HotKeyConfigType = isMac ? macHotKey : winHotKey;