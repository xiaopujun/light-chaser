import BaseBorderSet from "./BaseBorderSet";
import FourAngleGlowBorderSet from "./FourAngleGlowBorderSet";

let borderMap = new Map();

borderMap.set("BaseBorderSet", BaseBorderSet);
borderMap.set("FourAngleGlowBorderSet", FourAngleGlowBorderSet);

export default function getBorderSet(borderName: string) {
    if ("" !== borderName && borderMap.has(borderName)) {
        return borderMap.get(borderName);
    } else {
        throw new Error("borderName was null string or borderMap don't has this border type, borderName:" + borderName);
    }
}