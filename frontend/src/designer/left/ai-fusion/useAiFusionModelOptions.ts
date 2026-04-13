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

import {useEffect, useMemo, useState} from "react";
import FetchUtil from "../../../utils/FetchUtil.ts";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import type {AiFusionModelOption} from "./AiFusionPromptBar.types.ts";

export const useAiFusionModelOptions = (open: boolean) => {
    const [modelOptions, setModelOptions] = useState<AiFusionModelOption[]>([]);
    const [selectedModelId, setSelectedModelId] = useState<string>("");
    const [modelsLoading, setModelsLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            return;
        }
        let cancelled = false;

        const loadModels = async () => {
            setModelsLoading(true);
            try {
                const response = await FetchUtil.get("/api/aiModel/list");
                if (cancelled) {
                    return;
                }
                if (response.code !== 200) {
                    globalMessage.messageApi?.warning(response.msg || "获取 AI 模型列表失败");
                    setModelOptions([]);
                    setSelectedModelId("");
                    return;
                }
                const items = Array.isArray(response.data) ? response.data : [];
                const options = items.filter((item): item is AiFusionModelOption => !!item?.id);
                setModelOptions(options);
                setSelectedModelId((current) => {
                    if (current && options.some((item) => item.id === current)) {
                        return current;
                    }
                    const defaultOption = options.find((item) => item.isDefault) ?? options[0];
                    return defaultOption?.id ?? "";
                });
            } catch (error) {
                if (!cancelled) {
                    globalMessage.messageApi?.warning("获取 AI 模型列表失败");
                    setModelOptions([]);
                    setSelectedModelId("");
                }
                console.error(error);
            } finally {
                if (!cancelled) {
                    setModelsLoading(false);
                }
            }
        };

        void loadModels();
        return () => {
            cancelled = true;
        };
    }, [open]);

    const selectedModel = useMemo(() => {
        return modelOptions.find((item) => item.id === selectedModelId);
    }, [modelOptions, selectedModelId]);

    return {
        modelOptions,
        selectedModelId,
        setSelectedModelId,
        modelsLoading,
        selectedModel,
    };
};
