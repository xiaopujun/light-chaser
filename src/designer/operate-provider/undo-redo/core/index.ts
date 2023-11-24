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
undoRedoMap.set(OperateType.UPD_LAYER_GROUP, updLayerGroupRollbackImpl);

export default undoRedoMap;