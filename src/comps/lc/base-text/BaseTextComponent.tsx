import {CSSProperties, ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import './BaseTextComponent.less';

export interface BaseTextComponentStyle {
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: string;
    alignItems?: string;
    justifyContent?: string;
    strokeWidth?: number;
    strokeColor?: string;
    letterSpacing?: number;
    lineHeight?: number;
}

export interface BaseTextComponentProps extends ComponentBaseProps {
    style?: BaseTextComponentStyle;
}

export interface BaseTextComponentRef {
    updateConfig: (newConfig: BaseTextComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

export const BaseTextComponent = forwardRef((props: BaseTextComponentProps, ref: ForwardedRef<BaseTextComponentRef>) => {
    const [config, setConfig] = useState<BaseTextComponentProps>({...props});
    const {style, data} = config;
    const [edit, setEdit] = useState(false);
    const eventHandlerMap = useRef<Record<string, Function>>({});
    const textRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    const onClick = () => {
        if ('click' in eventHandlerMap.current)
            eventHandlerMap.current['click']();
    }

    const strokeStyle: CSSProperties = {
        WebkitTextStrokeWidth: style?.strokeWidth,
        WebkitTextStrokeColor: style?.strokeColor,
    }

    return (
        <div onDoubleClick={() => setEdit(true)}
             ref={textRef}
             className={'base-text-component'}
             style={{...style, ...strokeStyle}}
             onKeyDown={(e) => e.stopPropagation()}
             onClick={onClick}>
            {edit ? <input
                ref={(ref) => ref?.select()}
                onChange={(e) => data!.staticData = e.target.value}
                onBlur={() => setEdit(false)}
                autoFocus={true}
                type={'text'}
                defaultValue={data?.staticData}/> : data?.staticData}
        </div>
    );
});

export default BaseTextComponent;