import {makeAutoObservable} from "mobx";

class HeaderStore {
    constructor() {
        makeAutoObservable(this);
    }

    canvasVisible: boolean = false;
    projectVisible: boolean = false;
    themeVisible: boolean = false;

    setCanvasVisible = (visible: boolean) => {
        this.canvasVisible = visible;
    }

    setProjectVisible = (visible: boolean) => {
        this.projectVisible = visible;
    }

    setThemeVisible = (visible: boolean) => {
        this.themeVisible = visible;
    }

}

const headerStore = new HeaderStore();
export default headerStore;
