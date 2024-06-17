import React, {useState} from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {BaseFormInputController} from "./BaseFormInputController.ts";
import {ConfigType} from "../../../designer/right/ConfigContent";


export const BaseFormInputConfig: React.FC<ConfigType<BaseFormInputController>> = ({controller}) => {

    const [count, setCount] = useState(0);

    const config = controller.getConfig()?.style! as any;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment, reRender} = fieldChangeData;
        controller.update(dataFragment);
        if (reRender) {
            setCount(count + 1)
        }
    }

    const getPropPath = (config)=>{
        let pathName;
        switch (config.styleType) {
            case "none":
                pathName = "defaultStyle";
                break;
            case "hover":
                pathName = "hoverStyle";
                break;
            case "focus":
                pathName = "focusStyle";
                break;
        }
        return pathName;
    }

    let pathName = getPropPath(config);

    const fontStyle: any = [
        {
            type: 'grid',
            config: {
                columns: 1
            },
            children: [
                {
                    key: 'fontSize',
                    type: 'number-input',
                    label: '字号',
                    value: config?.[pathName]?.fontSize,
                    config: {min: 1}
                },
                {
                    rules: "{styleType}==='none'",
                    key: 'fontWeight',
                    type: 'number-input',
                    label: '加粗',
                    value: config?.[pathName]?.fontWeight || 400,
                    config: {
                        min: 100,
                        max: 900,
                        step: 100
                    }
                },
                {
                    key: 'colorText',
                    type: 'color-picker',
                    label: '颜色',
                    value: config?.[pathName]?.colorText,
                    config: {
                        showText: true,
                    }
                },
                {
                    key: 'fontFamily',
                    type: 'select',
                    label: '字体',
                    value: config?.[pathName]?.fontFamily,
                    config: {
                        options: [
                            {label: '钉钉进步体', value: 'DingTalk JinBuTi'},
                            {label: '抖音美好体', value: 'DouyinSansBold'},
                            {label: '优设标题黑', value: '优设标题黑'},
                            {label: '庞门正道标题', value: '庞门正道标题体免费版'},
                        ],
                    }
                }
            ]
        }
    ];
    const backgroundStyle: any = [
        {
            type: 'grid',
            config: {
                columns: 1
            },
            children: [
                {
                    key: 'colorBgContainer',
                    type: 'color-picker',
                    label: '颜色',
                    value: config?.[pathName]?.colorBgContainer,
                    config: {
                        showText: true,
                    }
                }
            ]
        }
    ];
    const borderStyle: any = [
        {
            type: 'grid',
            config: {
                columns: 1
            },
            children: [
                {
                    key: 'borderRadius',
                    type: 'number-input',
                    label: '圆角',
                    value: config?.[pathName]?.borderRadius,
                    config: {min: 1}
                },
                {
                    key: 'colorBorder',
                    type: 'color-picker',
                    label: '颜色',
                    value: config?.[pathName]?.colorBorder,
                    config: {
                        showText: true,
                    }
                }
            ]
        }
    ];

    const schema: Control = {
        key: 'style',
        type: 'grid',
        config: {columns: 1},
        children: [
            {
                key: 'styleType',
                type: 'select',
                label: '样式',
                value: config?.styleType || 'none',
                reRender: true,
                config: {
                    options: [
                        {label: '默认', value: 'none'},
                        // {label: '悬浮', value: 'hover'},
                        // {label: '聚焦', value: 'focus'},
                    ]
                }
            },
            {
                key: 'size',
                type: 'select',
                label: '尺寸',
                value: config?.size || 'middle',
                reRender: true,
                config: {
                    options: [
                        {label: '大', value: 'large'},
                        {label: '中', value: 'middle'},
                        {label: '小', value: 'small'},
                    ]
                }
            },
            {
                key: 'defaultStyle',
                type: 'accordion',
                label: '文字设置',
                rules: "{styleType}==='none'",
                children: fontStyle,
            },
            {
                key: 'hoverStyle',
                type: 'accordion',
                label: '文字设置',
                rules: "{styleType}==='hover'",
                children: fontStyle,
            },
            {
                key: 'focusStyle',
                type: 'accordion',
                label: '文字设置',
                rules: "{styleType}==='focus'",
                children: fontStyle,
            },
            {
                key: 'defaultStyle',
                type: 'accordion',
                label: '背景设置',
                rules: "{styleType}==='none'",
                children: backgroundStyle,
            },
            {
                key: 'hoverStyle',
                type: 'accordion',
                label: '背景设置',
                rules: "{styleType}==='hover'",
                children: backgroundStyle,
            },
            {
                key: 'focusStyle',
                type: 'accordion',
                label: '背景设置',
                rules: "{styleType}==='focus'",
                children: backgroundStyle,
            },
            {
                key: 'defaultStyle',
                type: 'accordion',
                label: '边框设置',
                rules: "{styleType}==='none'",
                children: borderStyle,
            },
            {
                key: 'hoverStyle',
                type: 'accordion',
                label: '边框设置',
                rules: "{styleType}==='hover'",
                children: borderStyle,
            },
            {
                key: 'focusStyle',
                type: 'accordion',
                label: '边框设置',
                rules: "{styleType}==='focus'",
                children: borderStyle,
            },
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

