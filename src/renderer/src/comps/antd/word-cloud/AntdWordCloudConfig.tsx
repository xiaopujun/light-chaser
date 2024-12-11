import {ConfigType} from "../../../designer/right/ConfigContent";
import AntdWordCloudController from "./AntdWordCloudController.ts";
import AntdCommonUtil from "../../antd-common/AntdCommonUtil.ts";
import {Control} from "../../../json-schema/SchemaTypes.ts";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI.tsx";

export const AntdWordCloudStyle = (props: ConfigType<AntdWordCloudController>) => {
    const {controller} = props;
    const {style} = controller.getConfig()!;
    const schema: Control = {
        type: 'grid',
        key: 'style',
        children: [
            {
                type: 'input',
                label: '遮罩',
                key: 'imageMask',
                value: style?.imageMask,
            },
            {
                type: 'color-mode',
                key: 'color',
                label: '颜色',
                value: style?.color,
            },
            {
                id: 'randomPosition',
                type: 'switch',
                key: 'random',
                label: '随机',
                tip: '开启后词云图每次更新数据，词语位置随机展示',
                value: typeof style?.random !== 'number',
            },
            {
                key: 'spiral',
                type: 'select',
                label: '形状',
                value: style?.spiral,
                config: {
                    options: [
                        {label: '椭圆', value: 'archimedean'},
                        {label: '矩形', value: 'rectangular'},
                    ]

                },
            },
            {
                key: 'wordStyle',
                children: [
                    {
                        type: 'select',
                        key: 'fontFamily',
                        label: '字体',
                        value: style?.wordStyle?.fontFamily,
                        config: {
                            options: [
                                {label: '钉钉进步体', value: 'DingTalk JinBuTi'},
                                {label: '抖音美好体', value: 'DouyinSansBold'},
                                {label: '优设标题黑', value: '优设标题黑'},
                                {label: '庞门正道标题', value: '庞门正道标题体免费版'},
                            ]
                        }
                    },
                    {
                        key: 'fontWeight',
                        type: 'number-input',
                        label: '粗细',
                        value: style?.wordStyle?.fontWeight || 500,
                        config: {min: 100, max: 900, step: 100},
                    },
                    {
                        key: 'fontSize',
                        type: 'range-slider',
                        label: '字号',
                        value: style?.wordStyle?.fontSize,
                        config: {min: 0},
                    },
                    {
                        key: 'padding',
                        type: 'number-input',
                        label: '间距',
                        value: style?.wordStyle?.padding,
                        config: {min: 0},
                    },
                ]
            }
        ]
    }
    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment, data, id} = fieldChangeData;
        if (id === 'randomPosition') {
            const random = data ? undefined : 0.5;
            controller.update({style: {random}})
        } else {
            controller.update(dataFragment);
        }
    }

    return <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
}
export const AntdWordCloudFieldMapping = (props: ConfigType<AntdWordCloudController>) => {
    const {controller} = props;
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const {style} = controller.getConfig()!;
    const schema: Control = {
        type: 'grid',
        key: "style",
        children: [
            {
                type: 'select',
                label: '颜色字段',
                key: 'colorField',
                value: style?.colorField,
                config: {
                    options,
                }
            },
            {
                type: 'select',
                label: '权重字段',
                key: 'weightField',
                value: style?.weightField,
                config: {
                    options,
                }
            },
            {
                type: 'select',
                label: '内容字段',
                key: 'wordField',
                value: style?.wordField,
                config: {
                    options,
                }
            },
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    return <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
}