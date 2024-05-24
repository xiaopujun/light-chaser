import {ConfigType} from "../../../designer/right/ConfigContent.tsx";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI.tsx";
import {Control} from "../../../json-schema/SchemaTypes.ts";
import './FilterConfig.less';
import {IFilerConfigType} from "../../../designer/DesignerType.ts";
import {useRef} from "react";
import ObjectUtil from "../../../utils/ObjectUtil.ts";

export default function FilterConfig(props: ConfigType) {
    const {controller} = props;
    const config = controller.getConfig().filter as IFilerConfigType;
    const configRef = useRef(config);


    const schema: Control = {
        type: 'grid',
        config: {
            columns: 2,
            gridGap: '20px'
        },
        children: [
            {
                type: 'switch',
                label: '开启',
                key: 'enable',
                value: configRef.current?.enable
            },
            {
                type: 'slider',
                label: '模糊',
                key: 'blur',
                value: configRef.current?.blur,
                config: {
                    containerStyle: {
                        gridColumn: '1/3'
                    },
                    min: 0,
                    max: 100,
                    step: 0.01
                }
            },
            {
                type: 'slider',
                label: '亮度',
                key: 'brightness',
                value: configRef.current?.brightness,
                config: {
                    containerStyle: {
                        gridColumn: '1/3'
                    },
                    min: 0,
                    max: 2,
                    step: 0.01
                }
            },
            {
                type: 'slider',
                label: '对比度',
                key: 'contrast',
                value: configRef.current?.contrast,
                config: {
                    containerStyle: {
                        gridColumn: '1/3'
                    },
                    min: 0,
                    max: 2,
                    step: 0.01
                }
            },
            {
                type: 'slider',
                label: '透明度',
                key: 'opacity',
                value: configRef.current?.opacity,
                config: {
                    containerStyle: {
                        gridColumn: '1/3'
                    },
                    step: 0.01,
                    max: 1,
                    min: 0
                }
            },
            {
                type: 'slider',
                label: '饱和度',
                key: 'saturate',
                value: configRef.current?.saturate,
                config: {
                    containerStyle: {
                        gridColumn: '1/3'
                    },
                    min: 0,
                    max: 2,
                    step: 0.01
                }
            },
            {
                type: 'slider',
                label: '色调',
                key: 'hueRotate',
                value: configRef.current?.hueRotate,
                config: {
                    containerStyle: {
                        gridColumn: '1/3'
                    },
                    min: 0,
                    max: 360,
                }
            },


            // {
            //     type: 'slider',
            //     label: '混合模式',
            //     value: 50,
            //     config: {
            //         containerStyle: {
            //             gridColumn: '1/3'
            //         }
            //     }
            // },

        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        configRef.current = ObjectUtil.merge(configRef.current, dataFragment);
        controller.updateFilter(configRef.current);
    }

    return (
        <div className={'filter-config'}>
            <LCGUI schema={schema} onFieldChange={onFieldChange}/>
        </div>
    );

}
