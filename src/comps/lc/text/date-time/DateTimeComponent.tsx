import React, {ForwardedRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {ComponentInfoType} from "../../../common-component/CommonTypes.ts";
import './DateTimeComponent.less';
import {IFilterConfigType} from "../../../../designer/DesignerType.ts";

export interface DateTimeComponentStyle {
    fontSize?: number;
    color?: string;
    fontFamily?: string;
    fontWeight?: number;
    alignItems?: string;
    justifyContent?: string;
    letterSpacing?: string;
    formatType?: FormatType;
}

export interface DateTimeComponentProps {
    base?: ComponentInfoType;
    style?: DateTimeComponentStyle;
    filter?: IFilterConfigType;
}

export interface DateTimeComponentRef {
    updateConfig: (newConfig: DateTimeComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
    destroy: () => void;
}

export enum FormatType {
    DASH = '0',// 2021-01-01 12:00:00
    SLASH = '1', // 2021/01/01 12:00:00
    CN = '2', // 2021年01月01日 12时00分00秒
}

function formatDateTime(format: string): string {
    const current = new Date();
    // 获取年、月、日
    const year = current.getFullYear();
    const month = (current.getMonth() + 1).toString().padStart(2, '0');
    const day = current.getDate().toString().padStart(2, '0');
    // 获取小时、分钟、秒
    const hours = current.getHours().toString().padStart(2, '0');
    const minutes = current.getMinutes().toString().padStart(2, '0');
    const seconds = current.getSeconds().toString().padStart(2, '0');

    switch (format) {
        case FormatType.SLASH:
            return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
        case FormatType.CN:
            return `${year}年${month}月${day}日 ${hours}时${minutes}分${seconds}秒`;
        default:
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}

const DateTimeComponent = React.forwardRef((props: DateTimeComponentProps,
                                            ref: ForwardedRef<DateTimeComponentRef>) => {
    const [config, setConfig] = useState<DateTimeComponentProps>({...props});
    const {formatType = FormatType.CN, ...style} = config?.style!;
    const [datetime, setDateTime] = useState<string>(formatDateTime(formatType));
    const timeRef = useRef<NodeJS.Timeout | null>(null);
    const eventHandlerMap = useRef<Record<string, Function>>({});


    useEffect(() => {
        timeRef.current = setInterval(() => {
            setDateTime(() => formatDateTime(config.style?.formatType!));
        }, 1000);
    }, []);


    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
        destroy: () => {
            timeRef.current && clearInterval(timeRef.current);
            timeRef.current = null;
        }
    }));


    return (
        <div className="date-time-component" style={{...style}}>
            {datetime}
        </div>
    );
});

export default DateTimeComponent;
