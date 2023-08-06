import {action, makeObservable, observable} from "mobx";
import LayerComponent from "./LayerComponent";

class LayerListStore {
    constructor() {
        makeObservable(this, {
            visible: observable,
            setVisible: action,
        });
    }

    visible = false;

    layerInstanceMap: { [key: string]: LayerComponent } = {};

    setVisible = (visible: boolean) => this.visible = visible;
}

const layerListStore = new LayerListStore();
export default layerListStore;