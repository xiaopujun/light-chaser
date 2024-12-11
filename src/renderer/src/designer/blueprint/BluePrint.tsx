import {lazy} from "react";

const BPHeader = lazy(() => import("./header/BPHeader"));
const BPFooter = lazy(() => import("./footer/BPFooter"));
const BPLeft = lazy(() => import("./left/BPLeft"));
const BPRight = lazy(() => import("./right/BPRight"));
const BPCanvas = lazy(() => import("./BPCanvas"));
const FrameLayout = lazy(() => import("../../json-schema/ui/frame-layout/FrameLayout"));


export default function BluePrint() {
    return (
        <FrameLayout header={<BPHeader/>}
                     footer={<BPFooter/>}
                     left={<BPLeft/>}
                     right={<BPRight/>}
                     content={<BPCanvas/>}
        />
    )
}
