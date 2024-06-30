/// <reference types="vite/client" />

import LayerManager from "./designer/manager/LayerManager.ts";
import LayerListStore from "./designer/left/layer-list/LayerListStore.ts";

declare global {
    interface Window {
        __EDIT_LAYER_MANAGER__: LayerManager;
        __EDIT_LAYER_LIST_STORE__: LayerListStore;
    }
}