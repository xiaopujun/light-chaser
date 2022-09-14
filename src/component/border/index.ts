import BaseBorder from "./BaseBorder";
import FourAngleGlow from "./FourAngleGlow";

let borderMap = new Map();

borderMap.set("BaseBorder", BaseBorder);
borderMap.set("FourAngleGlow", FourAngleGlow);

export default function getBorder(borderType: string) {
    if ("" !== borderType && borderMap.has(borderType)) {
        return borderMap.get(borderType);
    } else {
        throw new Error("borderMap has no this type:" + borderType);
    }
}
