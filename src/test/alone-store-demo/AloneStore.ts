import {action, makeObservable, observable} from "mobx";

class AloneStore {

    constructor() {
        makeObservable(this, {
            count: observable,
            setCount: action,
        })
    }

    count = 0;

    setCount = (count: number) => this.count = count;
}

export {AloneStore};