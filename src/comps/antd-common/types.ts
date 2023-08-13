import {BarOptions, ColumnOptions, Options} from "@antv/g2plot";
import React from "react";
import {ConfigType} from "../../designer/right/ConfigType";

export type WritableBarOptions = {
    -readonly [K in keyof BarOptions]?: BarOptions[K];
};
export type WritableColumnOptions = {
    -readonly [K in keyof ColumnOptions]?: ColumnOptions[K];
};
export type WritableOptions = {
    -readonly [K in keyof Options]?: Options[K];
};

export interface AntdBaseMenuMapping {
    info: React.ComponentType<ConfigType>;
    style?: React.ComponentType<ConfigType>;
    data: React.ComponentType<ConfigType>;
    animation: React.ComponentType<ConfigType>;
    theme: React.ComponentType<ConfigType>;
}