import AbstractComponent from "../../framework/core/AbstractComponent";

export interface ConfigType<T extends AbstractComponent = AbstractComponent> {
    instance: T;
}