import {MenuInfo} from "../MenuType";

export abstract class AbstractMenu {
    abstract getMenuInfo(): MenuInfo;
}