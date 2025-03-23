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

import {OperateType} from "../OperateType";
import AbstractRollback from "./AbstractRollback";
import dragRollbackImpl from "./DragRollbackImpl";
import resizeRollbackImpl from "./ResizeRollbackImpl";
import addRollbackImpl from "./AddRollbackImpl";
import delRollbackImpl from "./DelRollbackImpl";
import styleRollbackImpl from "./StyleRollbackImpl";
import hideRollbackImpl from "./HideRollbackImpl";
import lockRollbackImpl from "./LockRollbackImpl";
import orderRollBackImpl from "./OrderRollbackImpl";
import updLayerGroupRollbackImpl from "./UpdLayerGroupRollbackImpl";

const undoRedoMap = new Map<OperateType, AbstractRollback>();
undoRedoMap.set(OperateType.DRAG, dragRollbackImpl);
undoRedoMap.set(OperateType.RESIZE, resizeRollbackImpl);
undoRedoMap.set(OperateType.ADD, addRollbackImpl);
undoRedoMap.set(OperateType.DEL, delRollbackImpl);
undoRedoMap.set(OperateType.UPD_STYLE, styleRollbackImpl);
undoRedoMap.set(OperateType.HIDE, hideRollbackImpl);
undoRedoMap.set(OperateType.LOCK, lockRollbackImpl);
undoRedoMap.set(OperateType.ORDER, orderRollBackImpl);
undoRedoMap.set(OperateType.UPDATE_LAYER, updLayerGroupRollbackImpl);

export default undoRedoMap;