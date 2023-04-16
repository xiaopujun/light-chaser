import LCTextInput from "../LCTextInput";
import LCNumberInput from "../LCNumberInput";
import ColorPicker from "../BaseColorPicker";
import GroupColorPicker from "../GroupColorPicker";
import PaddingSet from "./base/PaddingSet";
import LcSelect from "../LCSelect";
import ColorSelector from "./chart/antd/atomic_components/ColorSelector";
import {Switch} from "antd";

let cfgMap = new Map();

cfgMap.set("LcTextInput", LCTextInput);
cfgMap.set("LcNumberInput", LCNumberInput);
cfgMap.set("ColorPicker", ColorPicker);
cfgMap.set("GroupColorPicker", GroupColorPicker);
cfgMap.set("LcPadding", PaddingSet);
cfgMap.set("LcSelect", LcSelect);
cfgMap.set("ColorSelector", ColorSelector);
cfgMap.set("Switch", Switch);

export const getCfgComp = (comp: string) => {
    return cfgMap.get(comp);
}