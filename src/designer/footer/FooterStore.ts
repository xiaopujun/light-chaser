import {action, makeObservable, observable} from "mobx";

class FooterStore {

    constructor() {
        makeObservable(this, {
            coordinate: observable,
            setCoordinate: action,
        })
    }

    coordinate: number[] = [0, 0];

    setCoordinate = (coordinate: number[]) => this.coordinate = coordinate;
}

const footerStore = new FooterStore();
export default footerStore;