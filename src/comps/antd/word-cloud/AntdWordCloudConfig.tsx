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
        config: {columns: 2},
        children: [
            {
                type: 'input',
                label: '遮罩',
                key: 'imageMask',
                value: style?.imageMask,
                config: {
                    containerStyle: {
                        gridColumn: '1/3',
                        marginBottom: '10px'
                    }
                }
            },
            {
                type: 'color-mode',
                key: 'color',
                label: '颜色',
                value: style?.color,
                config: {
                    containerStyle: {
                        gridColumn: '1/3'
                    }
                }
            }
        ]
    }
    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}
export const AntdWordCloudFieldMapping = (props: ConfigType<AntdWordCloudController>) => {
    const {controller} = props;
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const {style} = controller.getConfig()!;
    const schema: Control = {
        type: 'grid',
        key: "style",
        config: {columns: 2},
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

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}