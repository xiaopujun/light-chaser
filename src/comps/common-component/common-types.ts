import {DataConfigType} from "../../designer/DesignerType";

export interface ComponentBaseProps {
    info?: ComponentInfoType;
    style?: Record<string, any>;
    data?: DataConfigType;
}

export interface ComponentInfoType {
    id: string;
    name: string;
    type: string;
    desc: string;
}

export type ClazzTemplate<C> = new () => C | null;