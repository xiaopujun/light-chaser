import {BarOptions, Options} from "@antv/g2plot";

export type WritableBarOptions = {
    -readonly [K in keyof BarOptions]?: BarOptions[K];
};
export type WritableOptions = {
    -readonly [K in keyof Options]?: Options[K];
};