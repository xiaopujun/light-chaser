import React from "react";

const Accordion = React.lazy(() => import('./accordion/Accordion'));
const Button = React.lazy(() => import('./button/Button'));
const MonacoEditor = React.lazy(() => import('./code-editor/MonacoEditor'));
const ColorPicker = React.lazy(() => import('./color-picker/ColorPicker'));
const ColorsPicker = React.lazy(() => import('./colors-picker/ColorsPicker'));
const Grid = React.lazy(() => import('./grid/Grid').then(({Grid}) => ({default: Grid})));
const Input = React.lazy(() => import('./input/Input'));
const Radio = React.lazy(() => import('./radio/Radio'));
const Select = React.lazy(() => import('./select/Select'));
const Switch = React.lazy(() => import('./switch/Switch'));
const Slider = React.lazy(() => import('./slider/Slider').then(({Slider}) => ({default: Slider})));
const RangeSlider = React.lazy(() => import('./slider/Slider').then(({RangeSlider}) => ({default: RangeSlider})));
const ImageUpload = React.lazy(() => import('./imag-upload/ImageUpload').then(({ImageUpload}) => ({default: ImageUpload})));
const ColorMode = React.lazy(() => import('./color-mode/ColorMode'));
const TextOnly = React.lazy(() => import('./text-only/TextOnly').then(({TextOnly}) => ({default: TextOnly})));
const TextArea = React.lazy(() => import('./text-area/TextArea'));
const GroupButton = React.lazy(() => import('./group-button/GroupButton').then(({GroupButton}) => ({default: GroupButton})));
const CardPanel = React.lazy(() => import('./card-panel/CardPanel').then(({CardPanel}) => ({default: CardPanel})));
const NumberInput = React.lazy(() => import('./number-input/NumberInput'));
const ControlGroup = React.lazy(() => import('./control-group/ControlGroup'));
const CheckBox = React.lazy(() => import('./checkbox/CheckBox.tsx'));

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
UIMap.set('card-panel', CardPanel);
UIMap.set('slider', Slider);
UIMap.set('range-slider', RangeSlider);
UIMap.set('image-upload', ImageUpload);
UIMap.set('text-only', TextOnly);
UIMap.set('text-area', TextArea);
UIMap.set('group-button', GroupButton);
UIMap.set('control-group', ControlGroup);
UIMap.set('number-input', NumberInput);
UIMap.set('checkbox', CheckBox);

export default UIMap;