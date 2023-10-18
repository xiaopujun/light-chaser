import {action, makeAutoObservable, makeObservable, observable} from "mobx";

export interface Student {
    id: string;
    name: string;
    age: number;
}

class DemoStore {
    constructor() {
        makeObservable(this, {
            students: observable,
            addStudent: action,
        })
    }

    students: Record<string, Student> = {}

    addStudent = (student: Student) => {
        this.students[student.id] = student;
    }
}

const demoStore = new DemoStore();
export default demoStore;