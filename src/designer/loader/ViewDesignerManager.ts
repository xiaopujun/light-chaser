import DesignerManager from "../manager/DesignerManager.ts";

const viewDesignerManager = new DesignerManager();
const viewLayerManager = viewDesignerManager.layerManager;
const viewCanvasManager = viewDesignerManager.canvasManager;
const viewBpExecutor = viewDesignerManager.bpExecutor;
export {viewDesignerManager, viewLayerManager, viewCanvasManager, viewBpExecutor};