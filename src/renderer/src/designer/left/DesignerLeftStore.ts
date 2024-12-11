import {action, makeObservable, observable} from "mobx";
import {ReactNode} from "react";

export interface ILeftMenu {
    icon: ReactNode,
    name: string,
    key: string,
}

class DesignerLeftStore {
    constructor() {
        makeObservable(this, {
            menu: observable,
            setMenu: action,
        });
    }

    menu: string = 'components';

    setMenu = (menu: string) => this.menu = menu;

    designerLeftRef: HTMLElement | null = null;

    setDesignerLeftRef = (ref: HTMLElement | null) => this.designerLeftRef = ref;

}

const designerLeftStore = new DesignerLeftStore();
export default designerLeftStore;