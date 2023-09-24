import AbstractController from "../../framework/core/AbstractController";

export interface ConfigType<T extends AbstractController = AbstractController> {
    controller: T;
}