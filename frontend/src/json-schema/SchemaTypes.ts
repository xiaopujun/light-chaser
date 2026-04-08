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

import React, {CSSProperties} from "react";
import {BtnItemType} from "./ui/group-button/GroupButton.tsx";
import {RadioOption} from "./ui/radio/Radio.tsx";
import {ISelectOption} from "./ui/select/Select.tsx";

export type BaseType = string | boolean | number | object | null | undefined;

export type BaseDataType = BaseType | Record<string, BaseType>;

export type ControlValueType = BaseDataType | BaseDataType[];

export interface BaseSchemaType {
    id?: string;
    key?: string;
    label?: string;
    tip?: string;
    value?: ControlValueType;
    rules?: string;
    reRender?: boolean;
    children?: Control[];
    parent?: Control;
}

export interface AccordionConfigType extends BaseSchemaType {
    type: "accordion";
    config?: Record<string, unknown>;
}

export interface SubAccordionConfigType extends BaseSchemaType {
    type: "sub-accordion";
    config?: Record<string, unknown>;
}

export interface ButtonConfigType extends BaseSchemaType {
    type: "button";
    config?: {
        type?: readonly ["default", "primary", "dashed", "link", "text"];
        width?: string | number;
        height?: string | number;
        children?: React.ReactNode;
    }
}

export interface CheckboxConfigType extends BaseSchemaType {
    type: "checkbox";
    config?: {
        containerStyle?: React.CSSProperties;
    }
}

export interface CodeEditorConfigType extends BaseSchemaType {
    type: "code-editor";
    config?: {
        readonly?: boolean;
        language?: 'json' | 'javascript' | 'sql';
        width?: string | number;
        height?: string | number;
        fullScreen?: boolean;
    }
}

export interface ColorModeConfigType extends BaseSchemaType {
    type: "color-mode";
    config?: {
        containerStyle?: React.CSSProperties;
    }
}

export interface ColorPickerConfigType extends BaseSchemaType {
    type: "color-picker";
    config?: {
        showText?: boolean;
        disabled?: boolean;
        containerStyle?: React.CSSProperties;
    }
}

export interface ColorsPickerConfigType extends BaseSchemaType {
    type: "colors-picker";
    config?: {
        canAdd?: boolean;
        containerStyle?: React.CSSProperties;
    }
}

export interface ControlGroupConfigType extends BaseSchemaType {
    type: "control-group";
    config?: {
        itemName?: string;
        template?: Control;
    }
}

export interface GridConfigType extends BaseSchemaType {
    type: "grid";
    config?: {
        columns?: number;
        gridGap?: string;
        containerStyle?: React.CSSProperties;
    }
}

export interface GroupButtonConfigType extends BaseSchemaType {
    type: "group-button";
    config?: {
        items: Array<BtnItemType>;
        containerStyle?: React.CSSProperties;
    }
}

export interface ImageUploadConfigType extends BaseSchemaType {
    type: "image-upload";
    config?: {
        containerStyle?: React.CSSProperties;
        accept?: string;
        size?: number;
    }
}

export interface InputConfigType extends BaseSchemaType {
    type: "input";
    config?: {
        placeholder?: string;
        disabled?: boolean;
        type?: "text" | "password" | "email" | "number";
        containerStyle?: React.CSSProperties;
    }
}

export interface NumberInputConfigType extends BaseSchemaType {
    type: "number-input";
    config?: {
        disabled?: boolean;
        min?: number;
        max?: number;
        step?: number;
        containerStyle?: React.CSSProperties;
    }
}

export interface RadioConfigType extends BaseSchemaType {
    type: "radio";
    config?: {
        disabled?: boolean;
        options?: RadioOption[];
        containerStyle?: React.CSSProperties;
    }
}

export interface SelectConfigType extends BaseSchemaType {
    type: "select";
    config?: {
        options: ISelectOption[];
        disabled?: boolean;
        placeholder?: string;
        containerStyle?: React.CSSProperties;
    }
}

export interface SliderConfigType extends BaseSchemaType {
    type: "slider";
    config?: {
        max?: number;
        min?: number;
        step?: number;
        containerStyle?: React.CSSProperties;
    }
}

export interface RangeSliderConfigType extends BaseSchemaType {
    type: "range-slider";
    config?: {
        max?: number;
        min?: number;
        step?: number;
        containerStyle?: React.CSSProperties;
    }
}

export interface SwitchConfigType extends BaseSchemaType {
    type: "switch";
    config?: {
        disabled?: boolean;
        containerStyle?: React.CSSProperties;
    }
}

export interface TextAreaConfigType extends BaseSchemaType {
    type: "text-area";
    config?: {
        containerStyle?: React.CSSProperties;
    }
}

export interface TextOnlyConfigType extends BaseSchemaType {
    type: "text-only";
    config?: {
        containerStyle?: React.CSSProperties;
    }
}

export interface CardPanelType extends BaseSchemaType {
    type?: "card-panel";
    config?: {
        contentStyle?: CSSProperties;
    };
}

export type Control =
    ButtonConfigType
    | AccordionConfigType
    | SubAccordionConfigType
    | CheckboxConfigType
    | CodeEditorConfigType
    | ColorModeConfigType
    | ColorPickerConfigType
    | ColorsPickerConfigType
    | ControlGroupConfigType
    | GridConfigType
    | GroupButtonConfigType
    | ImageUploadConfigType
    | InputConfigType
    | NumberInputConfigType
    | RadioConfigType
    | SelectConfigType
    | SliderConfigType
    | RangeSliderConfigType
    | SwitchConfigType
    | TextAreaConfigType
    | TextOnlyConfigType
    | CardPanelType;