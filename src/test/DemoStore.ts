import {makeAutoObservable} from "mobx";
import _ from "lodash";

class DemoStore {
    constructor() {
        makeAutoObservable(this);
    }

    students: any = {
        '0': {
            name: "张三",
            age: 18,
        },
        '1': {
            name: "李四",
            age: 19,
        }
    }

    setStudent = (student: any) => {
        let item = this.students['0'];
        this.students['0'] = _.merge(item, student);
    }
}

const demoStore = new DemoStore();
export default demoStore;