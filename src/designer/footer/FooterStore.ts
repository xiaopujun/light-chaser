import {action, makeObservable, observable} from "mobx";

class FooterStore {

    constructor() {
        makeObservable(this, {
            coordinate: observable,
            size: observable,
            hotKeyVisible: observable,
            setCoordinate: action,
            setSize: action,
            setHotKeyVisible: action,
        })
    }

    coordinate: number[] = [0, 0];

    size: number[] = [0, 0];

    hotKeyVisible: boolean = false;

    setHotKeyVisible = (visible: boolean) => this.hotKeyVisible = visible;

    setCoordinate = (coordinate: number[]) => this.coordinate = coordinate;

    setSize = (size: number[]) => this.size = size;

}

const footerStore = new FooterStore();
export default footerStore;