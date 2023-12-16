import React, {ForwardedRef, useImperativeHandle, useState} from 'react';
import {ComponentInfoType} from "../../common-component/common-types";

export interface BaseColorBlockComponentStyle {
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: string;
    background?: string;
}

export interface BaseColorBlockComponentProps {
    base?: ComponentInfoType;
    style?: BaseColorBlockComponentStyle;
}

export interface BaseColorBlockComponentRef {
    updateConfig: (newConfig: BaseColorBlockComponentProps) => void;
}

const BaseColorBlockComponent = React.forwardRef((props: BaseColorBlockComponentProps,
                                                  ref: ForwardedRef<BaseColorBlockComponentRef>) => {
    const [config, setConfig] = useState<BaseColorBlockComponentProps>({...props});

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig})
    }));

    const {style} = config;
    return (
        <div style={{...{height: '100%', display: 'flex'}, ...style}}/>
    );
});

export default BaseColorBlockComponent;