import Accordion from "./accordion/Accordion";
import Button from "./button/Button";
import {MonacoEditor} from "./code-editor/MonacoEditor";
import ColorPicker from "./color-picker/ColorPicker";
import ColorsPicker from "./colors-picker/ColorsPicker";
import {Grid} from "./grid/Grid";
import Input from "./input/Input";
import Radio from "./radio/Radio";
import Select from "./select/Select";
import Switch from "./switch/Switch";
import {ItemPanel} from "./item-panel/ItemPanel";
import {Slider} from "./slider/Slider";
import {ImageUpload} from "./imag-upload/ImageUpload";
import ColorMode from "./color-mode/ColorMode";
import {TextOnly} from "./text-only/TextOnly";
import TextArea from "./text-area/TextArea";
import {GroupButton} from "./group-button/GroupButton";

const UIMap = new Map();

UIMap.set('accordion', Accordion);
UIMap.set('button', Button);
UIMap.set('grid', Grid);
UIMap.set('input', Input);
UIMap.set('radio', Radio);
UIMap.set('select', Select);
UIMap.set('switch', Switch);
UIMap.set('code-editor', MonacoEditor);
UIMap.set('color-picker', ColorPicker);
UIMap.set('colors-picker', ColorsPicker);
UIMap.set('color-mode', ColorMode);
UIMap.set('item-panel', ItemPanel);
UIMap.set('slider', Slider);
UIMap.set('image-upload', ImageUpload);
UIMap.set('text-only', TextOnly);
UIMap.set('text-area', TextArea);
UIMap.set('group-button', GroupButton);

export default UIMap;