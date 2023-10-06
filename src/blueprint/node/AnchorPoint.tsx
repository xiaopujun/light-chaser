import React from "react";

export enum AnchorPointType {
    INPUT,
    OUTPUT
}

export interface AnchorPointProps {
    id?: string;
    title?: string;
    type?: AnchorPointType;
}

export const AnchorPoint: React.FC<AnchorPointProps> = () => {
    return (
        <div>react hook component</div>
    )
}
