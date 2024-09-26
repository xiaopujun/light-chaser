import React, {ForwardedRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import {Carousel, Input, ConfigProvider} from "antd";
import './BaseFormInput.less';
import defaultData from './carousel.png';
import BaseFormInputDefinition from "./BaseFormInputDefinition";

export interface AntdTokenProps {
    fontSize?: number;
    fontWeight?: number;
    colorText?: string;
    fontFamily?: string;
    colorBgContainer?: string;
    borderRadius?: number;
    colorBorder?: string;
}

export interface BaseFormInputComponentStyle {
    //切换样式类型
    styleType?: 'none'|'hover'|'focus';
    defaultStyle?: AntdTokenProps;
    hoverStyle?: AntdTokenProps;
    focusStyle?: AntdTokenProps;
    size?: "small"|"middle"|"large";
}

export interface BaseFormInputComponentProps extends ComponentBaseProps {
    style?: BaseFormInputComponentStyle;
}

export interface BaseFormInputComponentRef {
    updateConfig: (newConfig: BaseFormInputComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

function getTypeStyle(style: BaseFormInputComponentStyle | undefined) {
    const styleType =style?.['styleType'];
    let styleObj = {};
    switch (styleType) {
        case "none":
            styleObj = Object.assign({}, style?.['defaultStyle'])
            break;
        case "hover":
            styleObj = Object.assign({}, style?.['hoverStyle'])
            break;
        case "focus":
            styleObj = Object.assign({}, style?.['focusStyle'])
            break;
    }

    return styleObj;
}

const BaseFormInputComponent = React.forwardRef((props: BaseFormInputComponentProps,
                                                 ref: ForwardedRef<BaseFormInputComponentRef>) => {
    const [config, setConfig] = useState<BaseFormInputComponentProps>({...props});
    const {style} = config;
    const [value, setValue] = useState("");

    useEffect(()=>{
        setValue(config.data?.staticData);
    },[config.data?.staticData])

    const eventHandlerMap = useRef<Record<string, Function>>({});

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => {
            eventHandlerMap.current = eventMap
        },
    }));

    const onChange = (e) => {
        if ('onChange' in eventHandlerMap.current) {
            eventHandlerMap.current['onChange'](e.target.value);
            setValue(e.target.value);
            // 更新config
            eventHandlerMap.current['update']({data:{staticData: e.target.value}});
        }
    }
    const onPressEnter = (e) => {
        if ('onPressEnter' in eventHandlerMap.current) {
            eventHandlerMap.current['onPressEnter'](e.target.value);
        }
    }

    const styleObj = getTypeStyle(style);

    return (
        <ConfigProvider theme={{token:styleObj}}>
            <div style={{width: '100%', height: '100%', overflow: 'hidden'}} className={'antd-input'}>
                <Input size={style?.size} onChange={onChange} value={value} onPressEnter={onPressEnter}/>
            </div>
        </ConfigProvider>
    );
});

export default BaseFormInputComponent;
