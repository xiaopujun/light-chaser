import {action, makeObservable, observable} from "mobx";

class FooterStore {

    constructor() {
        makeObservable(this, {
            coordinate: observable,
            size: observable,
            setCoordinate: action,
            setSize: action,
        })
    }

    coordinate: number[] = [0, 0];

    size: number[] = [0, 0];

    setCoordinate = (coordinate: number[]) => this.coordinate = coordinate;

    setSize = (size: number[]) => this.size = size;

}

const footerStore = new FooterStore();
export default footerStore;