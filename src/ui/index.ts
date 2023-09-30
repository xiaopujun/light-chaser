import Accordion from "./accordion/Accordion";
import Button from "./button/Button";
import {MonacoEditor} from "./code-editor/MonacoEditor";
import ColorPicker from "./color-picker/ColorPicker";
import ColorsPicker from "./colors-picker/ColorsPicker";
import {Grid} from "./grid/Grid";
import StringInput from "./string-input/StringInput";
import NumberInput from "./number-input/NumberInput";
import Radio from "./radio/Radio";
import Select from "./select/Select";
import Switch from "./switch/Switch";
import {ItemPanel} from "./item-panel/ItemPanel";

const UIMap = new Map();

UIMap.set('accordion', Accordion);
UIMap.set('button', Button);
UIMap.set('grid', Grid);
UIMap.set('string', StringInput);
UIMap.set('number', NumberInput);
UIMap.set('radio', Radio);
UIMap.set('select', Select);
UIMap.set('switch', Switch);
UIMap.set('code-editor', MonacoEditor);
UIMap.set('color-picker', ColorPicker);
UIMap.set('colors-picker', ColorsPicker);
UIMap.set('item-panel', ItemPanel);

export default UIMap;