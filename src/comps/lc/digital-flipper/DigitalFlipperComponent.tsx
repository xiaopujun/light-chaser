import React, {ForwardedRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import {CountUp} from "countup.js";
import {Odometer} from "odometer_countup";

export interface DigitalFlipperComponentStyle {
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: string;
    color?: string;
    type?: 'slide' | 'caper';
    alignItems?: string;
    justifyContent?: string;
}

export interface DigitalFlipperComponentProps extends ComponentBaseProps {
    style?: DigitalFlipperComponentStyle;
}

export interface DigitalFlipperComponentRef {
    updateConfig: (newConfig: DigitalFlipperComponentProps) => void;
    changeData: (newData: number) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

const DigitalFlipperComponent = React.forwardRef((props: DigitalFlipperComponentProps,
                                                  ref: ForwardedRef<DigitalFlipperComponentRef>) => {
    const [config, setConfig] = useState<DigitalFlipperComponentProps>({...props});

    const eventHandlerMap = useRef<Record<string, Function>>({});
    const countUpRef = useRef(null);
    let countUpAnim: CountUp;

    useEffect(() => {
        countUpAnim = new CountUp(countUpRef.current!, config.data?.staticData, {
            plugin: config.style?.type === 'slide' ? new Odometer({duration: 1, lastDigitDelay: 0}) : undefined,
            duration: 1,
        });
        if (!countUpAnim.error) {
            countUpAnim.start();
        } else {
            console.error(countUpAnim.error);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        changeData: (newData) => countUpAnim.update(newData),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    const onClick = () => {
        if ('click' in eventHandlerMap.current) {
            eventHandlerMap.current['click']();
        }
    }

    const {style} = config;
    return (
        <div ref={countUpRef}
             style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', ...style}}
             onClick={onClick}/>
    );
});

export default DigitalFlipperComponent;