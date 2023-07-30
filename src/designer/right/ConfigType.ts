import AbstractComponent, {UpdateOptions} from "../../framework/core/AbstractComponent";

export interface ConfigType<P = any> {
    // config?: P;
    instance: AbstractComponent;
    // updateConfig?: (config: P, upOp?: UpdateOptions) => void
}