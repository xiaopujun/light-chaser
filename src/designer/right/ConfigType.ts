import AbstractComponent from "../../framework/core/AbstractComponent";

export interface ConfigType<T = AbstractComponent> {
    instance: T;
}