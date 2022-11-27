import LCTextInput from "../base/LCTextInput";
import LCNumberInput from "../base/LCNumberInput";
import ColorPicker from "../color_picker/BaseColorPicker";
import GroupColorPicker from "../color_picker/GroupColorPicker";
import PaddingSet from "./base/PaddingSet";
import LcSelect from "../base/LCSelect";

let cfgMap = new Map();

cfgMap.set("LcTextInput", LCTextInput);
cfgMap.set("LcNumberInput", LCNumberInput);
cfgMap.set("ColorPicker", ColorPicker);
cfgMap.set("GroupColorPicker", GroupColorPicker);
cfgMap.set("LcPadding", PaddingSet);
cfgMap.set("LcSelect", LcSelect);

export const getCfgComp = (compName: string) => {
    return cfgMap.get(compName);
}