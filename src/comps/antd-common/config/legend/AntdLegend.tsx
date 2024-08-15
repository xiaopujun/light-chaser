import './Legend.less';
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI";
import {Control} from "../../../../json-schema/SchemaTypes";
import {ConfigType} from "../../../../designer/right/ConfigContent";
import {cloneDeep} from "lodash";
import {useState} from "react";

const defaultLegendConfig = {
    legend: {
        position: "top",
        layout: "horizontal",
        itemName: {
            style: {
                fill: "#989898ff",
                fontSize: 10,
            },
        },
    }
}

export const AntdLegend = (props: ConfigType) => {
    const {controller} = props;
    const {legend} = controller.getConfig().style;
    const [count, setCount] = useState(0);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, dataFragment, reRender} = fieldChangeData;
        if (id === 'legendSwitch') {
            if (data) controller.update({style: cloneDeep(defaultLegendConfig)});
            else controller.update({style: {legend: false}});
        } else {
            controller.update(dataFragment);
        }
        if (reRender)
            setCount(count + 1);
    }

    const schema: Control = {
        key: 'style',
        id: 'legendSwitch',
        type: 'accordion',
        label: '图例',
        config: {showSwitch: true},
        value: !!legend,
        children: [
            {
                key: 'legend',
                type: 'grid',
                children: [
                    {
                        id: 'legendSwitch',
                        type: 'switch',
                        label: '显示',
                        reRender: true,
                        value: !!legend
                    },
                    {
                        rules: `"${!!legend}" === "true"`,
                        children: [
                            {
                                key: 'position',
                                type: 'select',
                                label: '位置',
                                value: 'left-top',
                                config: {
                                    options: [
                                        {value: 'left-top', label: '左上'},
                                        {value: 'left', label: '正左'},
                                        {value: 'left-bottom', label: '左下'},
                                        {value: 'top-left', label: '上左'},
                                        {value: 'top', label: '正上'},
                                        {value: 'top-right', label: '上右'},
                                        {value: 'right-top', label: '右上'},
                                        {value: 'right', label: '正右'},
                                        {value: 'right-bottom', label: '右下'},
                                        {value: 'bottom-left', label: '下左'},
                                        {value: 'bottom', label: '正下'},
                                        {value: 'bottom-right', label: '下右'},
                                    ]
                                }
                            },
                            {
                                key: 'layout',
                                type: 'select',
                                label: '方向',
                                value: 'horizontal',
                                config: {
                                    options: [
                                        {value: 'horizontal', label: '水平'},
                                        {value: 'vertical', label: '垂直'},
                                    ]
                                }
                            },
                            {
                                key: 'itemName',
                                children: [
                                    {
                                        key: 'style',
                                        children: [
                                            {
                                                key: 'fontSize',
                                                type: 'number-input',
                                                label: '字号',
                                                value: 12,
                                                config: {
                                                    min: 0,
                                                    max: 100,
                                                }
                                            },
                                            {
                                                key: 'fill',
                                                type: 'color-picker',
                                                label: '颜色',
                                                value: '#1c1c1c',
                                                config: {
                                                    showText: true,
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    );
};
