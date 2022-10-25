import {lazy} from "react";

const BaseBorder = lazy(() => import('./BaseBorder'));
const FourAngleGlowBorder = lazy(() => import('./FourAngleGlowBorder'));

let borderMap = new Map();

borderMap.set("BaseBorder", BaseBorder);
borderMap.set("FourAngleGlowBorder", FourAngleGlowBorder);

export default function getBorder(borderType: string) {
    if ("" !== borderType && borderMap.has(borderType)) {
        return borderMap.get(borderType);
    } else {
        // console.log("borderMap has no this type:" + borderType + ",use default base border config");
        return BaseBorder;
    }
}
