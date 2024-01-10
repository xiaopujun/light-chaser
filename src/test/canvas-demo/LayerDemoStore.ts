import {makeAutoObservable} from "mobx";
import Moveable from "react-moveable";
import Selecto from "react-selecto";

class LayerDemoStore {

    constructor() {
        makeAutoObservable(this);
    }

    targets: HTMLElement[] = [];
    movableRef: Moveable | null = null;
    selectableRef: Selecto | null = null;

    setMovableRef = (ref: Moveable) => this.movableRef = ref;
    setSelectableRef = (ref: Selecto) => this.selectableRef = ref;
    setTargets = (targets: HTMLElement[]) => this.targets = targets;

}

const layerDemoStore = new LayerDemoStore();
export default layerDemoStore;