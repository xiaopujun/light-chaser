/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {
    AreaOptions,
    BarOptions,
    ColumnOptions,
    GaugeOptions,
    LineOptions,
    LiquidOptions,
    Options,
    PieOptions,
    RadarOptions, RadialBarOptions,
    RingProgressOptions,
    RoseOptions,
    ScatterOptions, WordCloudOptions
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

export type WritableRadarOptions = {
    -readonly [K in keyof RadarOptions]?: RadarOptions[K];
};

export type WritableWordCloudOptions = {
    -readonly [K in keyof WordCloudOptions]?: WordCloudOptions[K];
};

export type WritableRadialBarOptions = {
    -readonly [K in keyof RadialBarOptions]?: RadialBarOptions[K];
};


export type WritableOptions = {
    -readonly [K in keyof Options]?: Options[K];
};