import {
    AreaOptions,
    BarOptions,
    ColumnOptions,
    GaugeOptions,
    LineOptions,
    LiquidOptions,
    Options,
    PieOptions,
    RingProgressOptions,
    RoseOptions,
    ScatterOptions
} from "@antv/g2plot";

export type WritableBarOptions = {
    -readonly [K in keyof BarOptions]?: BarOptions[K];
};

export type WritableColumnOptions = {
    -readonly [K in keyof ColumnOptions]?: ColumnOptions[K];
};

export type WritableLineOptions = {
    -readonly [K in keyof LineOptions]?: LineOptions[K];
};

export type WritableAreaOptions = {
    -readonly [K in keyof AreaOptions]?: AreaOptions[K];
};

export type WritableScatterOptions = {
    -readonly [K in keyof ScatterOptions]?: ScatterOptions[K];
};

export type WritableGaugeOptions = {
    -readonly [K in keyof GaugeOptions]?: GaugeOptions[K];
};

export type WritablePieOptions = {
    -readonly [K in keyof PieOptions]?: PieOptions[K];
};

export type WritableRoseOptions = {
    -readonly [K in keyof RoseOptions]?: RoseOptions[K];
};

export type WritableLiquidOptions = {
    -readonly [K in keyof LiquidOptions]?: LiquidOptions[K];
};

export type WritableRingProgressOptions = {
    -readonly [K in keyof RingProgressOptions]?: RingProgressOptions[K];
};

export type WritableOptions = {
    -readonly [K in keyof Options]?: Options[K];
};