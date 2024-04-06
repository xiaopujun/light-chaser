import {action, makeObservable, observable} from "mobx";

class ProjectHdStore {
    constructor() {
        makeObservable(this, {
            projectVisible: observable,
            setProjectVisible: action,
        })
    }

    projectVisible: boolean = false;

    setProjectVisible = (visible: boolean) => this.projectVisible = visible;

}

const projectHdStore = new ProjectHdStore();
export default projectHdStore;