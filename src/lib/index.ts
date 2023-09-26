import Accordion from "./lc-accordion/Accordion";
import LcButton from "./lc-button/LcButton";
import {MonacoEditor} from "./lc-code-editer/MonacoEditor";
import ColorMode from "./lc-color-mode/ColorMode";
import BaseColorPicker from "./lc-color-picker/BaseColorPicker";
import GroupColorPicker from "./lc-color-picker/GroupColorPicker";
import {Grid} from "./lc-grid/Grid";
import UnderLineInput from "./lc-input/UnderLineInput";
import Radio from "./lc-radio/Radio";
import Select from "./lc-select/Select";
import LcSwitch from "./lc-switch/LcSwitch";
import ConfigItemTB from "./lc-config-item/ConfigItemTB";

const componentsMap = new Map();

componentsMap.set('accordion', Accordion);
componentsMap.set('button', LcButton);
componentsMap.set('code-editor', MonacoEditor);
componentsMap.set('color-mode', ColorMode);
componentsMap.set('base-color-picker', BaseColorPicker);
componentsMap.set('group-color-picker', GroupColorPicker);
componentsMap.set('grid', Grid);
componentsMap.set('string', UnderLineInput);
componentsMap.set('number', UnderLineInput);
componentsMap.set('radio', Radio);
componentsMap.set('select', Select);
componentsMap.set('switch', LcSwitch);
componentsMap.set('config-item-tb', ConfigItemTB);

export default componentsMap;