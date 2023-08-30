import {DataConfigType} from "../../designer/DesignerType";
import React from "react";
import {ConfigType} from "../../designer/right/ConfigType";

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

type MenuMappingType = React.ComponentType<ConfigType<any>>;

export interface BaseMenuMapping {
    info: MenuMappingType;
    style?: MenuMappingType;
    data: MenuMappingType;
    animation: MenuMappingType;
    theme: MenuMappingType;
    mapping?: MenuMappingType;
}