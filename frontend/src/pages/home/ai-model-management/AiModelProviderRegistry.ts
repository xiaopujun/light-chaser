export type AiModelProviderId = "openai" | "deepseek" | "ollama" | "compatible";

export type AiModelModelInputMode = "input" | "select";

export interface AiModelProviderOption {
    label: string;
    value: AiModelProviderId;
}

export interface AiModelProviderMeta {
    id: AiModelProviderId;
    label: string;
    tone: "openai" | "deepseek" | "ollama" | "compatible";
    description: string;
    modelInputMode: AiModelModelInputMode;
    modelOptions: Array<{
        label: string;
        value: string;
    }>;
    defaultModelName: string;
    modelPlaceholder: string;
    defaultBaseUrl: string;
    baseUrlLabel: string;
    baseUrlPlaceholder: string;
    baseUrlRequired: boolean;
    apiKeyLabel: string;
    apiKeyPlaceholder: string;
    apiKeyRequired: boolean;
    apiKeyVisible: boolean;
    temperatureLabel: string;
    temperatureHelp?: string;
    maxTokensLabel: string;
    maxTokensHelp?: string;
}

const PROVIDER_META_MAP: Record<AiModelProviderId, AiModelProviderMeta> = {
    openai: {
        id: "openai",
        label: "OpenAI",
        tone: "openai",
        description: "适用于 OpenAI 官方接口，也适合大多数 OpenAI 兼容网关。",
        modelInputMode: "select",
        modelOptions: [
            {label: "gpt-4o-mini", value: "gpt-4o-mini"},
            {label: "gpt-4o", value: "gpt-4o"},
            {label: "gpt-4.1-mini", value: "gpt-4.1-mini"},
        ],
        defaultModelName: "gpt-4o-mini",
        modelPlaceholder: "请选择或输入 OpenAI 模型标识",
        defaultBaseUrl: "https://api.openai.com/v1",
        baseUrlLabel: "接入地址",
        baseUrlPlaceholder: "例如：https://api.openai.com/v1",
        baseUrlRequired: false,
        apiKeyLabel: "API Key",
        apiKeyPlaceholder: "请输入 OpenAI API Key",
        apiKeyRequired: true,
        apiKeyVisible: true,
        temperatureLabel: "Temperature",
        temperatureHelp: "OpenAI 接口普遍支持温度参数。",
        maxTokensLabel: "最大 Token",
        maxTokensHelp: "留空时使用服务端默认值。",
    },
    deepseek: {
        id: "deepseek",
        label: "DeepSeek",
        tone: "deepseek",
        description: "适用于 DeepSeek 官方接口。",
        modelInputMode: "select",
        modelOptions: [
            {label: "deepseek-chat", value: "deepseek-chat"},
            {label: "deepseek-reasoner", value: "deepseek-reasoner"},
        ],
        defaultModelName: "deepseek-chat",
        modelPlaceholder: "请选择 DeepSeek 模型标识",
        defaultBaseUrl: "https://api.deepseek.com",
        baseUrlLabel: "接入地址",
        baseUrlPlaceholder: "例如：https://api.deepseek.com",
        baseUrlRequired: false,
        apiKeyLabel: "API Key",
        apiKeyPlaceholder: "请输入 DeepSeek API Key",
        apiKeyRequired: true,
        apiKeyVisible: true,
        temperatureLabel: "Temperature",
        temperatureHelp: "DeepSeek 接口支持常规温度设置。",
        maxTokensLabel: "最大 Token",
        maxTokensHelp: "留空时使用服务端默认值。",
    },
    ollama: {
        id: "ollama",
        label: "Ollama",
        tone: "ollama",
        description: "适用于本地 Ollama 或提供 OpenAI 兼容层的本地模型服务。",
        modelInputMode: "input",
        modelOptions: [],
        defaultModelName: "llama3.1",
        modelPlaceholder: "例如：llama3.1、qwen2.5、deepseek-r1",
        defaultBaseUrl: "http://localhost:11434/v1",
        baseUrlLabel: "本地地址",
        baseUrlPlaceholder: "例如：http://localhost:11434/v1",
        baseUrlRequired: false,
        apiKeyLabel: "API Key",
        apiKeyPlaceholder: "Ollama 通常无需 API Key",
        apiKeyRequired: false,
        apiKeyVisible: false,
        temperatureLabel: "Temperature",
        temperatureHelp: "本地模型通常也支持温度设置。",
        maxTokensLabel: "最大 Token",
        maxTokensHelp: "留空时使用服务端默认值。",
    },
    compatible: {
        id: "compatible",
        label: "OpenAI 兼容",
        tone: "compatible",
        description: "适用于 Qwen、Moonshot、SiliconFlow、自建代理等 OpenAI 兼容接口。",
        modelInputMode: "input",
        modelOptions: [],
        defaultModelName: "gpt-4o-mini",
        modelPlaceholder: "例如：qwen-plus、moonshot-v1-128k、gpt-4o-mini",
        defaultBaseUrl: "https://api.openai.com/v1",
        baseUrlLabel: "兼容地址",
        baseUrlPlaceholder: "例如：https://your-endpoint/v1",
        baseUrlRequired: true,
        apiKeyLabel: "API Key",
        apiKeyPlaceholder: "请输入兼容接口 API Key",
        apiKeyRequired: true,
        apiKeyVisible: true,
        temperatureLabel: "Temperature",
        temperatureHelp: "兼容接口通常沿用 OpenAI 参数语义。",
        maxTokensLabel: "最大 Token",
        maxTokensHelp: "留空时使用服务端默认值。",
    },
};

const PROVIDER_ALIAS_MAP: Record<string, AiModelProviderId> = {
    openai: "openai",
    "openai-compatible": "compatible",
    compatible: "compatible",
    custom: "compatible",
    deepseek: "deepseek",
    ollama: "ollama",
};

const resolveDisplayProviderId = (value?: string | null): AiModelProviderId | null => {
    const normalized = value?.trim().toLowerCase();
    if (!normalized) {
        return null;
    }
    return PROVIDER_ALIAS_MAP[normalized] ?? (normalized in PROVIDER_META_MAP ? normalized as AiModelProviderId : null);
};

export const normalizeAiModelProviderId = (value?: string | null): AiModelProviderId => {
    const normalized = value?.trim().toLowerCase();
    if (!normalized) {
        return "compatible";
    }
    return PROVIDER_ALIAS_MAP[normalized] ?? (normalized in PROVIDER_META_MAP ? normalized as AiModelProviderId : "compatible");
};

export const getAiModelProviderMeta = (value?: string | null): AiModelProviderMeta => {
    const providerId = normalizeAiModelProviderId(value);
    return PROVIDER_META_MAP[providerId] ?? PROVIDER_META_MAP.compatible;
};

export const getAiModelProviderOptions = (): AiModelProviderOption[] => {
    return ["openai", "deepseek", "compatible", "ollama"].map((value) => ({
        label: PROVIDER_META_MAP[value as AiModelProviderId].label,
        value: value as AiModelProviderId,
    }));
};

export const getAiModelProviderLabel = (value?: string | null) => {
    const providerId = resolveDisplayProviderId(value);
    if (providerId) {
        return PROVIDER_META_MAP[providerId].label;
    }
    const fallback = value?.trim();
    return fallback || "自定义";
};

export const getAiModelProviderTone = (value?: string | null) => {
    const providerId = resolveDisplayProviderId(value);
    return providerId ? PROVIDER_META_MAP[providerId].tone : "compatible";
};

export const isAiModelProviderApiKeyVisible = (value?: string | null) => {
    return getAiModelProviderMeta(value).apiKeyVisible;
};

export const isAiModelProviderBaseUrlRequired = (value?: string | null) => {
    return getAiModelProviderMeta(value).baseUrlRequired;
};

export const getAiModelProviderDefaultModelName = (value?: string | null) => {
    return getAiModelProviderMeta(value).defaultModelName;
};

export const getAiModelProviderDefaultBaseUrl = (value?: string | null) => {
    return getAiModelProviderMeta(value).defaultBaseUrl;
};
