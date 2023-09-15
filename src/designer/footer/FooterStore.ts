import {action, makeObservable, observable} from "mobx";

class FooterStore {

    constructor() {
        makeObservable(this, {
            hotKeyVisible: observable,
            setHotKeyVisible: action,
        })
    }

    hotKeyVisible: boolean = false;

    setHotKeyVisible = (visible: boolean) => this.hotKeyVisible = visible;

}

const footerStore = new FooterStore();
export default footerStore;