export interface AxisConfigType {
    enable?: boolean;
    position?: string;
    title?: {
        enable?: boolean;
        autoRotation?: boolean;
        content?: string;
        color?: string;
    },
    axis: {
        enable?: boolean;
        color?: string;
        width?: number;
        opacity?: number;
    },
    gridLine: AxisLineConfigType,
    tickLine: AxisLineConfigType,
    subTickLine: AxisLineConfigType
}

export interface AxisLineConfigType {
    enable?: boolean;
    align?: boolean;
    width?: number;
    opacity?: number;
    color?: string;
}