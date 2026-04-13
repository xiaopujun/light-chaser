import {action, makeObservable, observable} from "mobx";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import FetchUtil from "../../../utils/FetchUtil.ts";
import {IPage} from "../../../designer/DesignerType.ts";
import {getAiModelProviderDefaultBaseUrl, getAiModelProviderDefaultModelName, normalizeAiModelProviderId} from "./AiModelProviderRegistry.ts";

export interface IAiModel {
    id?: string;
    key?: string;
    name?: string;
    label?: string;
    provider?: string;
    providerLabel?: string;
    modelName?: string;
    baseUrl?: string;
    apiKey?: string;
    hasApiKey?: boolean;
    clearApiKey?: boolean;
    description?: string;
    temperature?: number;
    maxTokens?: number;
    enabled?: number;
    isDefault?: number;
    apiKeyHeader?: string;
    apiKeyPrefix?: string;
    chatCompletionsPath?: string;
    createTime?: string;
    updateTime?: string;
}

const createBlankModel = (): IAiModel => {
    const provider = "compatible";
    return {
        id: undefined,
        key: undefined,
        name: undefined,
        label: undefined,
        provider,
        providerLabel: undefined,
        modelName: getAiModelProviderDefaultModelName(provider),
        baseUrl: getAiModelProviderDefaultBaseUrl(provider),
        apiKey: undefined,
        hasApiKey: false,
        clearApiKey: false,
        description: undefined,
        temperature: 0.3,
        maxTokens: undefined,
        enabled: 1,
        isDefault: 0,
        apiKeyHeader: undefined,
        apiKeyPrefix: undefined,
        chatCompletionsPath: undefined,
        createTime: undefined,
        updateTime: undefined,
    };
};

export class AiModelStore {
    constructor() {
        makeObservable(this, {
            panelVisible: observable,
            loading: observable,
            aiModelPageData: observable,
            aiModel: observable,
            setPanelVisible: action,
            setAiModelList: action,
            setAiModel: action,
            changeCurrentPage: action,
        });
    }

    panelVisible = false;
    loading = false;
    searchValue: string | null = null;
    aiModelPageData: IPage<IAiModel> = {
        records: [],
        total: 0,
        size: 8,
        current: 1
    };
    aiModel: IAiModel = createBlankModel();

    setPanelVisible = (visible: boolean) => {
        this.panelVisible = visible;
        if (!visible) {
            this.aiModel = createBlankModel();
        }
    };

    setAiModelList = (aiModelPageData: IPage<IAiModel>) => {
        this.aiModelPageData = aiModelPageData;
    };

    setAiModel = (aiModel: IAiModel) => {
        this.aiModel = aiModel;
    };

    changeCurrentPage = (page: number) => {
        this.aiModelPageData.current = page;
        this.getAiModelList();
    };

    private buildSavePayload = (data: IAiModel) => {
        const provider = normalizeAiModelProviderId(data.provider);
        const isDefault = Boolean(data.isDefault);
        const enabled = isDefault ? true : Boolean(data.enabled);
        return {
            id: data.id,
            name: data.name?.trim(),
            provider,
            modelName: data.modelName?.trim(),
            baseUrl: data.baseUrl?.trim(),
            apiKey: data.apiKey?.trim(),
            clearApiKey: data.clearApiKey === true,
            description: data.description?.trim(),
            temperature: typeof data.temperature === "number" ? data.temperature : undefined,
            maxTokens: typeof data.maxTokens === "number" ? data.maxTokens : undefined,
            enabled,
            isDefault,
        };
    };

    openAiModelEditor = (id: string) => {
        FetchUtil.get(`/api/aiModel/get/${id}`).then((res) => {
            if (res.code === 200 && res.data) {
                this.setAiModel({
                    ...(res.data as IAiModel),
                    apiKey: undefined,
                    clearApiKey: false,
                });
                this.setPanelVisible(true);
            } else if (res.code === 200) {
                globalMessage.messageApi?.warning("未找到该 AI 模型");
            } else {
                globalMessage.messageApi?.error(res.msg || "获取 AI 模型失败");
            }
        });
    };

    copyAiModel = (id: string) => {
        FetchUtil.get(`/api/aiModel/copy/${id}`).then((res) => {
            if (res.code === 200) {
                globalMessage.messageApi?.success("复制成功");
                this.getAiModelList();
            } else {
                globalMessage.messageApi?.error(res.msg || "复制失败");
            }
        });
    };

    doBatchDeleteAiModel = (ids: string[]) => {
        if (ids.length === 0) {
            return;
        }
        FetchUtil.post("/api/aiModel/batchDel", ids).then((res) => {
            if (res.code === 200) {
                globalMessage.messageApi?.success("删除成功");
                this.getAiModelList();
            } else {
                globalMessage.messageApi?.error(res.msg || "删除失败");
            }
        });
    };

    getAiModelList = () => {
        this.loading = true;
        FetchUtil.post("/api/aiModel/pageList", {
            current: this.aiModelPageData.current,
            size: this.aiModelPageData.size,
            keywords: this.searchValue
        }).then((res) => {
            const {code, data, msg} = res;
            if (code === 200 && data) {
                const records = Array.isArray(data.records) ? data.records as Array<IAiModel> : [];
                records.forEach((item) => {
                    item.key = item.id;
                });
                this.setAiModelList({
                    records,
                    total: Number(data.total ?? 0),
                    size: Number(data.size ?? this.aiModelPageData.size),
                    current: Number(data.current ?? this.aiModelPageData.current),
                });
            } else {
                globalMessage.messageApi?.error(msg || "获取 AI 模型列表失败");
            }
        }).catch((error) => {
            console.error(error);
            globalMessage.messageApi?.error("获取 AI 模型列表失败");
        }).finally(() => {
            this.loading = false;
        });
    };

    createAiModel = async (data: IAiModel) => {
        const res = await FetchUtil.post("/api/aiModel/create", this.buildSavePayload(data));
        if (res.code === 200) {
            globalMessage.messageApi?.success("创建成功");
            this.getAiModelList();
            this.setPanelVisible(false);
            return;
        }
        globalMessage.messageApi?.error(res.msg || "创建失败");
    };

    updateAiModel = async (data: IAiModel) => {
        const res = await FetchUtil.post("/api/aiModel/update", this.buildSavePayload(data));
        if (res.code === 200) {
            globalMessage.messageApi?.success("保存成功");
            this.getAiModelList();
            this.setPanelVisible(false);
            return;
        }
        globalMessage.messageApi?.error(res.msg || "保存失败");
    };

    doCreateOrUpdateAiModel = async (data: IAiModel) => {
        if (data.id) {
            await this.updateAiModel(data);
            return;
        }
        await this.createAiModel(data);
    };

    searchAiModels = (value: string) => {
        const nextValue = value.trim();
        this.searchValue = nextValue || null;
        this.aiModelPageData.current = 1;
        this.getAiModelList();
    };

    init = () => {
        this.getAiModelList();
    };

    destroy = () => {
        this.searchValue = null;
        this.loading = false;
        this.panelVisible = false;
        this.aiModelPageData = {
            records: [],
            total: 0,
            size: 8,
            current: 1
        };
        this.aiModel = createBlankModel();
    };
}

const aiModelStore = new AiModelStore();
export default aiModelStore;
