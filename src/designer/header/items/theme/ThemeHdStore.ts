import {action, makeObservable, observable} from "mobx";

class ThemeHdStore {
    constructor() {
        makeObservable(this, {
            themeVisible: observable,
            setThemeVisible: action,
        })
    }

    themeVisible: boolean = false;

    setThemeVisible = (visible: boolean) => this.themeVisible = visible;

}

const themeHdStore = new ThemeHdStore();
export default themeHdStore;