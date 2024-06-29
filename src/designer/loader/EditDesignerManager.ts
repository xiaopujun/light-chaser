import DesignerManager from "../manager/DesignerManager.ts";

const editDesignerManager = new DesignerManager();
const layerManager = editDesignerManager.layerManager;
const themeManager = editDesignerManager.themeManager;
const canvasManager = editDesignerManager.canvasManager;
const bluePrintManager = editDesignerManager.bluePrintManager;
const filterManager = editDesignerManager.filterManager;
const bpExecutor = editDesignerManager.bpExecutor;
export {editDesignerManager, layerManager, themeManager, canvasManager, bluePrintManager, filterManager, bpExecutor};