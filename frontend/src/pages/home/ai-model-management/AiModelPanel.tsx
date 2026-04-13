import {Button, Col, ConfigProvider, Form, Input, InputNumber, Modal, Row, Select, Switch} from "antd";
import {observer} from "mobx-react";
import {useEffect, useRef} from "react";
import {IAiModel} from "./AiModelStore.ts";
import "./AiModelPanel.less";
import {
    getAiModelProviderDefaultBaseUrl,
    getAiModelProviderDefaultModelName,
    getAiModelProviderMeta,
    getAiModelProviderOptions,
    isAiModelProviderApiKeyVisible,
    isAiModelProviderBaseUrlRequired,
    normalizeAiModelProviderId,
    type AiModelProviderId,
} from "./AiModelProviderRegistry.ts";

type AiModelFormValues = {
    id?: string;
    name: string;
    provider: AiModelProviderId;
    modelName: string;
    baseUrl?: string;
    apiKey?: string;
    clearApiKey?: boolean;
    description?: string;
    temperature?: number;
    maxTokens?: number;
    enabled: boolean;
    isDefault: boolean;
};

const DEFAULT_PROVIDER: AiModelProviderId = "compatible";

const DEFAULT_VALUES: AiModelFormValues = {
    id: undefined,
    name: "",
    provider: DEFAULT_PROVIDER,
    modelName: getAiModelProviderDefaultModelName(DEFAULT_PROVIDER),
    baseUrl: getAiModelProviderDefaultBaseUrl(DEFAULT_PROVIDER),
    apiKey: "",
    clearApiKey: false,
    description: "",
    temperature: 0.3,
    maxTokens: undefined,
    enabled: true,
    isDefault: false,
};

const selectTheme = {
    components: {
        Select: {
            colorBgContainer: "#1e1e2f",
            selectorBg: "#1e1e2f",
            colorBorder: "#3A3A4E",
            colorText: "#FFFFFF",
            colorTextPlaceholder: "#6A6A7A",
            borderRadius: 4,
            hoverBorderColor: "#4FB8FF",
            activeBorderColor: "#4FB8FF",
            activeOutlineColor: "rgba(79, 184, 255, 0.2)",
            optionSelectedBg: "rgba(79, 184, 255, 0.2)",
            optionSelectedColor: "#4FB8FF",
            optionActiveBg: "rgba(79, 184, 255, 0.1)",
            optionPadding: "8px 12px",
            singleItemHeightLG: 40,
            showArrowPaddingInlineEnd: 12,
            paddingXXS: 4,
            colorBgElevated: "#1e1e2f",
        },
    },
};

const isFieldTouched = (value: unknown) => {
    return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
};

export interface AiModelPanelProps {
    title?: string;
    width?: number;
    visible: boolean;
    onClose: () => void;
    onSubmitted: (data: IAiModel) => Promise<void>;
    data?: IAiModel;
}

const AiModelPanel = observer((props: AiModelPanelProps) => {
    const {visible, onClose, data, onSubmitted, title, width = 860} = props;
    const [form] = Form.useForm<AiModelFormValues>();
    const clearApiKey = Form.useWatch("clearApiKey", form) ?? false;
    const providerValue = normalizeAiModelProviderId(Form.useWatch("provider", form) ?? DEFAULT_PROVIDER);
    const providerMeta = getAiModelProviderMeta(providerValue);
    const providerRef = useRef<AiModelProviderId>(DEFAULT_PROVIDER);
    const hasSavedApiKey = data?.hasApiKey === true;

    useEffect(() => {
        if (!visible) {
            form.resetFields();
            return;
        }

        const normalizedProvider = normalizeAiModelProviderId(data?.provider ?? DEFAULT_PROVIDER);
        const initialProviderMeta = getAiModelProviderMeta(normalizedProvider);
        providerRef.current = normalizedProvider;

        form.setFieldsValue({
            ...DEFAULT_VALUES,
            id: data?.id,
            provider: normalizedProvider,
            name: data?.name ?? "",
            modelName: data?.modelName?.trim() || initialProviderMeta.defaultModelName,
            baseUrl: data?.baseUrl?.trim() || initialProviderMeta.defaultBaseUrl,
            apiKey: "",
            clearApiKey: false,
            description: data?.description ?? "",
            temperature: typeof data?.temperature === "number" ? data.temperature : 0.3,
            maxTokens: typeof data?.maxTokens === "number" ? data.maxTokens : undefined,
            enabled: data?.enabled !== 0,
            isDefault: data?.isDefault === 1,
        });
    }, [data, form, visible]);

    const close = () => {
        form.resetFields();
        onClose();
    };

    const syncProviderDefaults = (nextProviderValue: string, nextValues: AiModelFormValues) => {
        const nextProvider = normalizeAiModelProviderId(nextProviderValue);
        const previousProvider = providerRef.current;
        const previousMeta = getAiModelProviderMeta(previousProvider);
        const nextMeta = getAiModelProviderMeta(nextProvider);
        const nextModelName = typeof nextValues.modelName === "string" ? nextValues.modelName.trim() : "";
        const nextBaseUrl = typeof nextValues.baseUrl === "string" ? nextValues.baseUrl.trim() : "";
        const patch: Partial<AiModelFormValues> = {
            provider: nextProvider,
        };

        if (!isFieldTouched(nextModelName) || nextModelName === previousMeta.defaultModelName) {
            patch.modelName = nextMeta.defaultModelName;
        }
        if (!isFieldTouched(nextBaseUrl) || nextBaseUrl === previousMeta.defaultBaseUrl) {
            patch.baseUrl = nextMeta.defaultBaseUrl;
        }
        if (!nextMeta.apiKeyVisible) {
            patch.apiKey = "";
            patch.clearApiKey = false;
        }

        providerRef.current = nextProvider;
        form.setFieldsValue(patch);
    };

    const handleSave = async () => {
        const values = await form.validateFields();
        const normalizedProvider = normalizeAiModelProviderId(values.provider);
        const normalizedProviderMeta = getAiModelProviderMeta(normalizedProvider);
        const trimmedApiKey = values.apiKey?.trim() || "";
        const keepExistingApiKey = Boolean(
            normalizedProviderMeta.apiKeyVisible
            && data?.id
            && hasSavedApiKey
            && !values.clearApiKey
            && !trimmedApiKey,
        );
        const normalizedBaseUrl = values.baseUrl?.trim() || normalizedProviderMeta.defaultBaseUrl;
        const normalizedModelName = values.modelName?.trim() || normalizedProviderMeta.defaultModelName;
        const nextItem: IAiModel = {
            id: data?.id,
            name: values.name.trim(),
            provider: normalizedProvider,
            providerLabel: normalizedProviderMeta.label,
            modelName: normalizedModelName,
            baseUrl: normalizedBaseUrl,
            apiKey: normalizedProviderMeta.apiKeyVisible
                ? (keepExistingApiKey ? undefined : trimmedApiKey)
                : undefined,
            hasApiKey: normalizedProviderMeta.apiKeyVisible
                ? (keepExistingApiKey ? true : !!trimmedApiKey)
                : false,
            clearApiKey: normalizedProviderMeta.apiKeyVisible
                ? !!values.clearApiKey
                : true,
            description: values.description?.trim() || "",
            temperature: typeof values.temperature === "number" ? values.temperature : 0.3,
            maxTokens: typeof values.maxTokens === "number" ? values.maxTokens : undefined,
            enabled: values.isDefault ? 1 : (values.enabled ? 1 : 0),
            isDefault: values.isDefault ? 1 : 0,
        };
        await onSubmitted(nextItem);
    };

    return (
        <Modal
            title={title || (data?.id ? "编辑AI模型" : "新建AI模型")}
            open={visible}
            onCancel={close}
            maskClosable={false}
            width={width}
            className="ai-model-edit-modal"
            footer={[
                <Button key="ok" type="primary" onClick={handleSave}>
                    {data?.id ? "保存" : "创建"}
                </Button>,
                <Button key="cancel" onClick={close}>
                    取消
                </Button>,
            ]}
        >
            <div className="modal-lead">{providerMeta.description}</div>
            <ConfigProvider theme={selectTheme}>
                <Form<AiModelFormValues>
                    form={form}
                    layout="vertical"
                    requiredMark="optional"
                    className="edit-form"
                    onValuesChange={(changedValues, allValues) => {
                        if (changedValues.isDefault && !allValues.enabled) {
                            form.setFieldValue("enabled", true);
                        }
                        if (changedValues.provider) {
                            syncProviderDefaults(String(changedValues.provider), allValues as AiModelFormValues);
                        }
                    }}
                >
                    <Row gutter={[12, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item hidden={true} name="id">
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="模型名称"
                                name="name"
                                rules={[
                                    {required: true, message: "请输入模型名称"},
                                    {max: 80, message: "模型名称不能超过80个字符"},
                                ]}
                            >
                                <Input placeholder="例如：默认对话模型" maxLength={80} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="提供商"
                                name="provider"
                                rules={[{required: true, message: "请选择提供商"}]}
                            >
                                <Select
                                    style={{
                                        width: "100%",
                                        height: 40,
                                        paddingInline: 12,
                                        paddingBlock: 8,
                                        boxSizing: "border-box",
                                    }}
                                    options={getAiModelProviderOptions()}
                                    placeholder="请选择提供商"
                                    getPopupContainer={(trigger) => trigger.parentElement || document.body}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="模型标识"
                                name="modelName"
                                rules={[
                                    {required: true, message: "请输入模型标识"},
                                    {max: 120, message: "模型标识不能超过120个字符"},
                                ]}
                            >
                                {providerMeta.modelInputMode === "select" ? (
                                    <Select
                                        showSearch
                                        allowClear
                                        options={providerMeta.modelOptions}
                                        placeholder={providerMeta.modelPlaceholder}
                                        getPopupContainer={(trigger) => trigger.parentElement || document.body}
                                        filterOption={(input, option) => {
                                            const label = typeof option?.label === "string" ? option.label : "";
                                            const value = typeof option?.value === "string" ? option.value : "";
                                            return `${label} ${value}`.toLowerCase().includes(input.toLowerCase());
                                        }}
                                    />
                                ) : (
                                    <Input placeholder={providerMeta.modelPlaceholder} maxLength={120} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={providerMeta.baseUrlLabel}
                                name="baseUrl"
                                rules={[
                                    ...(isAiModelProviderBaseUrlRequired(providerValue)
                                        ? [{required: true, message: `请输入${providerMeta.baseUrlLabel}`}]
                                        : []),
                                    {max: 300, message: "接入地址不能超过300个字符"},
                                ]}
                            >
                                <Input
                                    placeholder={providerMeta.baseUrlPlaceholder}
                                    maxLength={300}
                                />
                            </Form.Item>
                        </Col>

                        {isAiModelProviderApiKeyVisible(providerValue) ? (
                            <Col xs={24}>
                                <Form.Item
                                    label={providerMeta.apiKeyLabel}
                                    name="apiKey"
                                    rules={[
                                        ...(providerMeta.apiKeyRequired
                                            ? [{
                                                required: !data?.id || !hasSavedApiKey || clearApiKey,
                                                message: `请输入${providerMeta.apiKeyLabel}`,
                                            }]
                                            : []),
                                        {max: 300, message: "API Key不能超过300个字符"},
                                    ]}
                                    extra={hasSavedApiKey && !clearApiKey
                                        ? "已保存 API Key，留空则保持原值，不会明文回显。"
                                        : undefined}
                                >
                                    <Input.Password
                                        placeholder={
                                            clearApiKey
                                                ? "保存后将清空已保存的 API Key"
                                                : (hasSavedApiKey
                                                    ? `如需更换请输入新的 ${providerMeta.apiKeyLabel}`
                                                    : `请输入${providerMeta.apiKeyLabel}`)
                                        }
                                        maxLength={300}
                                        autoComplete="off"
                                        disabled={clearApiKey}
                                    />
                                </Form.Item>
                            </Col>
                        ) : (
                            <Col xs={24}>
                                <div className="modal-lead">
                                    {providerMeta.label} 不需要单独配置 API Key，系统会在保存时自动清空旧密钥。
                                </div>
                            </Col>
                        )}

                        {data?.id && hasSavedApiKey && isAiModelProviderApiKeyVisible(providerValue) ? (
                            <Col xs={24}>
                                <Form.Item
                                    label="API Key 操作"
                                    name="clearApiKey"
                                    valuePropName="checked"
                                    className="switch-card"
                                >
                                    <Switch checkedChildren="清空已保存 Key" unCheckedChildren="保留已保存 Key" />
                                </Form.Item>
                            </Col>
                        ) : null}

                        <Col xs={24} md={12}>
                            <Form.Item
                                label={providerMeta.temperatureLabel}
                                name="temperature"
                                rules={[{required: true, message: `请输入${providerMeta.temperatureLabel}`}]}
                                extra={providerMeta.temperatureHelp}
                            >
                                <InputNumber
                                    min={0}
                                    max={2}
                                    step={0.1}
                                    precision={1}
                                    style={{width: "100%"}}
                                    placeholder="默认 0.3"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={providerMeta.maxTokensLabel}
                                name="maxTokens"
                                extra={providerMeta.maxTokensHelp}
                            >
                                <InputNumber
                                    min={1}
                                    max={200000}
                                    precision={0}
                                    style={{width: "100%"}}
                                    placeholder="为空时使用服务端默认值"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                label="描述"
                                name="description"
                                rules={[{max: 300, message: "描述不能超过300个字符"}]}
                            >
                                <Input.TextArea
                                    placeholder="补充说明模型用途、适用场景或限流说明"
                                    rows={4}
                                    maxLength={300}
                                    showCount
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="启用状态"
                                name="enabled"
                                valuePropName="checked"
                                className="switch-card"
                            >
                                <Switch checkedChildren="已启用" unCheckedChildren="已停用" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="默认模型"
                                name="isDefault"
                                valuePropName="checked"
                                className="switch-card"
                            >
                                <Switch checkedChildren="默认" unCheckedChildren="普通" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </ConfigProvider>
        </Modal>
    );
});

export default AiModelPanel;
