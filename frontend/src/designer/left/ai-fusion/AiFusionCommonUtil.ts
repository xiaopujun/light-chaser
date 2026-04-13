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

import cloneDeep from "lodash/cloneDeep";
import {DesignerLoader} from "../../loader/DesignerLoader.ts";
import layerManager from "../../manager/LayerManager.ts";
import {DataConfigType, ILayerItem} from "../../DesignerType.ts";
import type AbstractDesignerController from "../../../framework/core/AbstractDesignerController.ts";
import eventOperateStore from "../../operate-provider/EventOperateStore.ts";

export interface AiFusionSelectionCandidateBase {
    id: string;
    label: string;
    componentType: string;
    layer?: ILayerItem;
    controller?: AbstractDesignerController | null;
    definition?: any;
    config?: Record<string, any> | null;
    style?: Record<string, any> | null;
    data?: DataConfigType | null;
    currentData?: any;
}

export const isPlainObject = (value: unknown): value is Record<string, any> => {
    return !!value && typeof value === "object" && !Array.isArray(value);
};

export const buildSelectionLabel = (labels: Array<string | undefined | null>) => {
    const items = labels
        .map((item) => typeof item === "string" ? item.trim() : "")
        .filter((item) => item.length > 0);
    if (items.length === 0) {
        return "未选中组件";
    }
    return items.join("、");
};

export const stringifyLimited = (value: unknown, limit = 4000) => {
    if (value == null) {
        return "";
    }
    if (typeof value === "string") {
        return value.length > limit ? `${value.slice(0, limit)}\n...` : value;
    }
    try {
        const text = JSON.stringify(value, null, 2);
        if (text.length <= limit) {
            return text;
        }
        return `${text.slice(0, limit)}\n...`;
    } catch {
        return String(value);
    }
};

export const stripCodeFence = (text: string) => {
    return text
        .replace(/^```(?:json|JSON)?\s*/g, "")
        .replace(/\s*```$/g, "")
        .trim();
};

export const extractFirstJsonObject = (text: string): string | null => {
    const startIndex = text.indexOf("{");
    if (startIndex < 0) {
        return null;
    }

    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let index = startIndex; index < text.length; index++) {
        const char = text[index];
        if (inString) {
            if (escaped) {
                escaped = false;
                continue;
            }
            if (char === "\\") {
                escaped = true;
                continue;
            }
            if (char === '"') {
                inString = false;
            }
            continue;
        }

        if (char === '"') {
            inString = true;
            continue;
        }

        if (char === "{") {
            depth += 1;
            continue;
        }

        if (char === "}") {
            depth -= 1;
            if (depth === 0) {
                return text.slice(startIndex, index + 1);
            }
        }
    }

    return null;
};

export const parseJsonLike = (value: unknown): Record<string, any> | null => {
    if (isPlainObject(value)) {
        return value;
    }
    if (typeof value !== "string") {
        return null;
    }

    const stripped = stripCodeFence(value);
    try {
        const parsed = JSON.parse(stripped);
        if (isPlainObject(parsed)) {
            return parsed;
        }
    } catch {
        // ignore
    }

    const candidate = extractFirstJsonObject(stripped);
    if (!candidate) {
        return null;
    }

    try {
        const parsed = JSON.parse(candidate);
        if (isPlainObject(parsed)) {
            return parsed;
        }
    } catch {
        // ignore
    }

    return null;
};

export const resolveCurrentSelectionIds = () => {
    return Array.from(new Set(
        (eventOperateStore.targetIds || [])
            .filter((id: unknown): id is string => typeof id === "string" && id.trim().length > 0),
    ));
};

export const resolveComponentCandidateBase = (layerId: string): AiFusionSelectionCandidateBase => {
    const layer = layerManager.layerConfigs?.[layerId];
    const controller = layer ? layerManager.compController?.[layerId] : undefined;
    const definition = layer?.type ? DesignerLoader.definitionMap[layer.type] : undefined;
    const baseInfo: Record<string, any> = definition?.getBaseInfo?.() ?? {};
    const config = controller?.getConfig?.() ?? null;
    const style = isPlainObject(config?.style) ? config.style : null;
    const data = isPlainObject(config?.data) ? config.data : null;
    const currentData = cloneDeep(data?.staticData ?? null);
    const baseLabel = typeof layer?.name === "string" && layer.name.trim().length > 0
        ? layer.name.trim()
        : typeof baseInfo?.compName === "string" && baseInfo.compName.trim().length > 0
            ? baseInfo.compName.trim()
            : typeof layer?.type === "string" && layer.type.trim().length > 0
                ? layer.type.trim()
                : layerId;

    return {
        id: layerId,
        label: baseLabel,
        componentType: typeof layer?.type === "string" ? layer.type : layerId,
        layer,
        controller,
        definition,
        config,
        style,
        data,
        currentData,
    };
};
