import {HistoryType} from "../HistoryType";
import AbstractRollback from "./AbstractRollback";
import dragRollbackImpl from "./DragRollbackImpl";
import resizeRollbackImpl from "./ResizeRollbackImpl";
import addRollbackImpl from "./AddRollbackImpl";
import delRollbackImpl from "./DelRollbackImpl";
import styleRollbackImpl from "./StyleRollbackImpl";

const undoRedoMap = new Map<HistoryType, AbstractRollback>();
undoRedoMap.set(HistoryType.DRAG, dragRollbackImpl);
undoRedoMap.set(HistoryType.RESIZE, resizeRollbackImpl);
undoRedoMap.set(HistoryType.ADD, addRollbackImpl);
undoRedoMap.set(HistoryType.DEL, delRollbackImpl);
undoRedoMap.set(HistoryType.STYLE, styleRollbackImpl);

export default undoRedoMap;