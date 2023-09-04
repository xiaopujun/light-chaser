import {action, makeObservable, observable} from "mobx";

class RuntimeConfigStore {

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

const runtimeConfigStore = new RuntimeConfigStore();
export default runtimeConfigStore;