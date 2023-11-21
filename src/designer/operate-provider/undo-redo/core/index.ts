import {HistoryType} from "../HistoryType";
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

const undoRedoMap = new Map<HistoryType, AbstractRollback>();
undoRedoMap.set(HistoryType.DRAG, dragRollbackImpl);
undoRedoMap.set(HistoryType.RESIZE, resizeRollbackImpl);
undoRedoMap.set(HistoryType.ADD, addRollbackImpl);
undoRedoMap.set(HistoryType.DEL, delRollbackImpl);
undoRedoMap.set(HistoryType.STYLE, styleRollbackImpl);
undoRedoMap.set(HistoryType.HIDE, hideRollbackImpl);
undoRedoMap.set(HistoryType.LOCK, lockRollbackImpl);
undoRedoMap.set(HistoryType.ORDER, orderRollBackImpl);
undoRedoMap.set(HistoryType.UPD_LAYER_GROUP, updLayerGroupRollbackImpl);

export default undoRedoMap;