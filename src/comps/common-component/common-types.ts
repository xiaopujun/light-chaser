import {DataConfigType} from "../../designer/DesignerType";
import React from "react";
import {ConfigType} from "../../designer/right/ConfigContent";

export interface ComponentBaseProps {
    base?: ComponentInfoType;
    style?: Record<string, any>;
    data?: DataConfigType;
}

export interface ComponentInfoType {
    id: string;
    name: string;
    type: string;
}

export type ClazzTemplate<C> = new () => C | null;

type MenuMappingType = React.ComponentType<ConfigType<any>>;

export interface BaseMenuMapping {
    base: MenuMappingType;
    style?: MenuMappingType;
    data: MenuMappingType;
    animation: MenuMappingType;
    theme: MenuMappingType;
    // mapping?: MenuMappingType;
}