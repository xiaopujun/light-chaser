import {action, makeObservable, observable} from "mobx";

class BluePrintHdStore {
    constructor() {
        makeObservable(this, {
            bluePrintVisible: observable,
            setBluePrintVisible: action,
        })
    }

    bluePrintVisible: boolean = false;

    setBluePrintVisible = (visible: boolean) => this.bluePrintVisible = visible;

}

const bluePrintHdStore = new BluePrintHdStore();
export default bluePrintHdStore;