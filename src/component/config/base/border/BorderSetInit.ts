import BaseBorderSet from "./BaseBorderSet";
import FourAngleGlowBorderSet from "./FourAngleGlowBorderSet";

let borderMap = new Map();

borderMap.set("BaseBorderSet", BaseBorderSet);
borderMap.set("FourAngleGlowBorderSet", FourAngleGlowBorderSet);

export default function getBorderSetDetail(borderName: string) {
    if ("" !== borderName && borderMap.has(borderName)) {
        return borderMap.get(borderName);
    } else {
        return BaseBorderSet;
    }
}