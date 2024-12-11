import {action, makeObservable, observable} from "mobx";
import AbstractManager from "../../../manager/core/AbstractManager.ts";
import {ThemeItemType} from "../../../DesignerType.ts";

class ThemeManager extends AbstractManager<Array<ThemeItemType>> {
    constructor() {
        super();
        makeObservable(this, {
            themeVisible: observable,
            setThemeVisible: action,
            themeConfig: observable,
            updateThemeConfig: action,
        })
    }

    themeVisible: boolean = false;

    setThemeVisible = (visible: boolean) => this.themeVisible = visible;

    /**
     * 主题
     */
    themeConfig: Array<ThemeItemType> | null = [
        {
            id: "0",
            name: "科技风格(默认主题)",
            colors: {
                main: "#00dfff",
                mainText: "#62edff",
                subText: "#4ca4b1",
                background: "#00dfff33",
                supplementFirst: "#38929f",
                supplementSecond: "#1790a2",
            },
        },
    ];

    updateThemeConfig = (data: Array<ThemeItemType>) => this.themeConfig = data;

    destroy(): void {
    }

    getData(): Array<ThemeItemType> {
        return this.themeConfig!;
    }

    init(data: Array<ThemeItemType>): void {
        this.themeConfig = data || this.themeConfig;
    }

}

const themeHdStore = new ThemeManager();
export default themeHdStore;