import {DataConfigType, IFilterConfigType} from "../../designer/DesignerType";

export interface ComponentBaseProps {
    base?: ComponentInfoType;
    style?: Record<string, any>;
    data?: DataConfigType;
    filter?: IFilterConfigType;
}

export interface ComponentInfoType {
    id: string;
    name: string;
    type: string;
}

export type ClazzTemplate<C> = new () => C | null;
