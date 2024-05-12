import {useRef} from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {ConfigType} from "../../../designer/right/ConfigContent";
import {AMapController} from "../../map/AMapController.ts";


export default function G2PlotCustomConfig(props: ConfigType<AMapController>) {
    const {controller} = props;
    const config = controller.getConfig()?.style;

    const codeRef = useRef<string>(config?.customCode || '') ;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, dataFragment} = fieldChangeData;
        if (id === 'customCode') {
            codeRef.current = data as string;
            return;
        }
        if (id === 'refreshChart')
            controller.update({style: {customCode: codeRef.current}});
        else
            controller.update(dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                type: 'card-panel',
                label: 'G2Plot代码',
                tip: '请参考G2Plot官方文档复制粘贴并调试代码',
                config: {
                    contentStyle: {
                        padding: 0
                    }
                },
                children: [
                    {
                        id: 'customCode',
                        type: 'code-editor',
                        value: codeRef.current,
                        config: {
                            language: 'javascript',
                            height: 600
                        }
                    }
                ]
            },
            {
                type: 'button',
                id: 'refreshChart',
                config: {
                    children: '刷新图表',
                    style: {
                        width: '100%'
                    }
                }
            }
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}
