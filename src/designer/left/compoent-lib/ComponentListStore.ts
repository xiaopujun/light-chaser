import {action, makeObservable, observable} from "mobx";

class ComponentListStore {
    constructor() {
        makeObservable(this, {
            categories: observable,
            subCategories: observable,
            setCategories: action,
            setSubCategories: action
        })
    }

    categories: string = "";

    subCategories: string = "";

    setCategories = (categories: string) => this.categories = categories;

    setSubCategories = (subCategories: string) => this.subCategories = subCategories;

}

const componentListStore = new ComponentListStore();
export default componentListStore;
