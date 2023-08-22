import {action, makeObservable, observable} from "mobx";

class FooterStore {

    constructor() {
        makeObservable(this, {
            coordinate: observable,
            scale: observable,
            size: observable,
            setCoordinate: action,
            setSize: action,
            setScale: action
        })
    }

    coordinate: number[] = [0, 0];

    size: number[] = [0, 0];

    scale: number = 1;

    setCoordinate = (coordinate: number[]) => this.coordinate = coordinate;

    setSize = (size: number[]) => this.size = size;

    setScale = (scale: number) => this.scale = scale;
}

const footerStore = new FooterStore();
export default footerStore;