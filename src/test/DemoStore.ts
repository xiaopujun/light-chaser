import {action, makeObservable, observable, toJS} from "mobx";

export interface Student {
    id?: string;
    name?: string;
    age?: number;
    city?: {
        code?: string;
        name?: string;
        position?: [number, number]
    }
}

class DemoStore {
    constructor() {
        makeObservable(this, {
            student: observable.struct,
            updateStudent: action,
        })
    }

    student: Student = {
        id: "1",
        name: "张三",
        age: 18,
        city: {
            code: "110000",
            name: "北京市",
            position: [116.405285, 39.904989]
        }
    }

    updateStudent = (student: Student) => {
        this.student = student
        console.log(toJS(this.student))
    }
}

const demoStore = new DemoStore();
export default demoStore;