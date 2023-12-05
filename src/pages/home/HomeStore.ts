import {action, makeObservable, observable} from "mobx";

class HomeStore {
    constructor() {
        makeObservable(this, {
            currentMenu: observable,
            setCurrentMenu: action,
        })
    }

    currentMenu: string = 'template';

    setCurrentMenu = (menu: string) => this.currentMenu = menu;

}

const homeStore = new HomeStore();
export default homeStore;