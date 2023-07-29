import {UpdateOptions} from "../../framework/core/AbstractComponent";

export interface ConfigType<P = any> {
    config?: P;
    updateConfig?: (config: P, upOp?: UpdateOptions) => void
}