import {MenuInfo} from "../types/MenuType";

export abstract class AbstractMenu {
    abstract getMenuInfo(): MenuInfo;
}