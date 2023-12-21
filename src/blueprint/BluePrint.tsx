import React from "react";
import {BPHeader} from "./header/BPHeader";
import {BPFooter} from "./footer/BPFooter";
import {BPLeft} from "./left/BPLeft";
import {BPRight} from "./right/BPRight";
import {BPCanvas} from "./BPCanvas";
import {FrameLayout} from "../ui/frame-layout/FrameLayout";

export const BluePrint: React.FC = () => {
    return (
        <FrameLayout header={<BPHeader/>}
                     footer={<BPFooter/>}
                     left={<BPLeft/>}
                     right={<BPRight/>}
                     content={<BPCanvas/>}
        />
    )
}
