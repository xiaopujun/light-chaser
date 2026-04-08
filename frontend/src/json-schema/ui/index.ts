/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import Accordion from './accordion/Accordion';
import SubAccordion from './accordion/SubAccordion';
import Button from './button/Button';
import CodeEditor from './code-editor/CodeEditor';
import ColorPicker from './color-picker/ColorPicker';
import ColorsPicker from './colors-picker/ColorsPicker';
import {Grid} from './grid/Grid';
import Input from './input/Input';
import Radio from './radio/Radio';
import Select from './select/Select';
import Switch from './switch/Switch';
import {Slider, RangeSlider} from './slider/Slider';
import {ImageUpload} from './imag-upload/ImageUpload';
import ColorMode from './color-mode/ColorMode';
import {TextOnly} from './text-only/TextOnly';
import TextArea from './text-area/TextArea';
import {GroupButton} from './group-button/GroupButton';
import {CardPanel} from './card-panel/CardPanel';
import NumberInput from './input/NumberInput';
import ControlGroup from './control-group/ControlGroup';
import CheckBox from './checkbox/CheckBox';

const UIMap = new Map();

UIMap.set('accordion', Accordion);
UIMap.set('sub-accordion', SubAccordion);
UIMap.set('button', Button);
UIMap.set('grid', Grid);
UIMap.set('input', Input);
UIMap.set('radio', Radio);
UIMap.set('select', Select);
UIMap.set('switch', Switch);
UIMap.set('code-editor', CodeEditor);
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