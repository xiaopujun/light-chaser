import {action, makeObservable, observable} from "mobx";

class RuntimeStore {

    constructor() {
        makeObservable(this, {
            auxiliaryBorder: observable,
            setAuxiliaryBorder: action,
        })
    }

    auxiliaryBorder: boolean = false;

    setAuxiliaryBorder = (auxiliaryBorder: boolean) => {
        this.auxiliaryBorder = auxiliaryBorder;
    }

}

const runtimeConfigStore = new RuntimeStore();
export default runtimeConfigStore;