import {makeAutoObservable} from "mobx";

class LayerDemoStore {

    constructor() {
        makeAutoObservable(this);
    }

    targets: any[] = [];
    movableRef: any = null;
    selectableRef: any = null;

    setMovableRef = (ref: any) => this.movableRef = ref;
    setSelectableRef = (ref: any) => this.selectableRef = ref;
    setTargets = (targets: any[]) => this.targets = targets;

}

const layerDemoStore = new LayerDemoStore();
export default layerDemoStore;