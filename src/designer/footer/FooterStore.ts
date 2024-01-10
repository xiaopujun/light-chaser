import {action, makeObservable, observable} from "mobx";

class FooterStore {

    constructor() {
        makeObservable(this, {
            hotKeyVisible: observable,
            snapShotVisible: observable,
            setHotKeyVisible: action,
            setSnapShotVisible: action,
        })
    }

    hotKeyVisible: boolean = false;

    snapShotVisible: boolean = false;

    setHotKeyVisible = (visible: boolean) => this.hotKeyVisible = visible;

    setSnapShotVisible = (visible: boolean) => this.snapShotVisible = visible;

}

const footerStore = new FooterStore();
export default footerStore;