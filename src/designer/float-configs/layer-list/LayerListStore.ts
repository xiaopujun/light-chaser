import {action, makeObservable, observable} from "mobx";

class LayerListStore {
    constructor() {
        makeObservable(this, {
            visible: observable,
            setVisible: action,
        });
    }

    visible = false;

    setVisible = (visible: boolean) => this.visible = visible;
}

const layerListStore = new LayerListStore();
export default layerListStore;