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

export interface BaseMenuMapping {
    info: React.ComponentType<ConfigType>;
    style?: React.ComponentType<ConfigType>;
    data: React.ComponentType<ConfigType>;
    animation: React.ComponentType<ConfigType>;
    theme: React.ComponentType<ConfigType>;
}