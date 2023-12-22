import {action, makeObservable, observable} from "mobx";

class DesignerLeftStore {
    constructor() {
        makeObservable(this, {
            key: observable,
            setKey: action,
        });
    }

    key: string = '';

    designerLeftRef: HTMLElement | null = null;

    setKey = (key: string) => this.key = key;

    setDesignerLeftRef = (ref: HTMLElement | null) => this.designerLeftRef = ref;

}

const designerLeftStore = new DesignerLeftStore();
export default designerLeftStore;