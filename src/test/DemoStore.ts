import {makeAutoObservable, runInAction} from "mobx";
import _ from "lodash";

class DemoStore {
    constructor() {
        makeAutoObservable(this);
    }

    student: any = {
        name: "张三",
        age: 18,
    }

    setStudent = (student: any) => {
        runInAction(() => {
            this.student = _.merge(this.student, student);
        });
        console.log(this.student);
    }
}

const demoStore = new DemoStore();
export default demoStore;