import React, {ForwardedRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {ComponentInfoType, DesignerMode, IFilterConfigType, SaveType} from "../../../designer/DesignerType.ts";
import Loading from "../../../json-schema/ui/loading/Loading.tsx";
import DesignerManager from "../../../designer/manager/DesignerManager.ts";
import operatorMap from "../../../framework/operate";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import URLUtil from "../../../utils/URLUtil.ts";
import layerBuilder from "../../../designer/left/layer-list/LayerBuilder.ts";

export interface ScreenReferenceComponentStyle {
    screenId?: string;
}

export interface ScreenReferenceComponentProps {
    base?: ComponentInfoType;
    style?: ScreenReferenceComponentStyle;
    filter?: IFilterConfigType;
}

export interface ScreenReferenceComponentRef {
    updateConfig: (newConfig: ScreenReferenceComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

const ScreenReferenceComponent = React.forwardRef((props: ScreenReferenceComponentProps,
                                                   ref: ForwardedRef<ScreenReferenceComponentRef>) => {
    const [config, setConfig] = useState<ScreenReferenceComponentProps>({...props});
    const prevScreenId = useRef<string>(config?.style?.screenId || '');
    const eventHandlerMap = useRef<Record<string, Function>>({});
    const [loaded, setLoaded] = useState<boolean>(false);
    const [designerManager, setDesignerManager] = useState<DesignerManager>(new DesignerManager());

    const loadScreen = (_designerManager: DesignerManager) => {
        if (!config.style?.screenId)
            return;
        const {saveType} = URLUtil.parseUrlParams();
        operatorMap[saveType as SaveType].getProjectData(config.style?.screenId!).then((data) => {
            if (data) {
                _designerManager.init(data, DesignerMode.VIEW);
                setLoaded(true);
            } else {
                globalMessage?.messageApi?.error("大屏引用失败");
            }
        })
    }

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    /**
     * 首次加载，只执行一次
     */
    useEffect(() => {
        if (config.style?.screenId)
            loadScreen(designerManager);
        return () => {
            designerManager.destroy();
        }
    }, []);

    /**
     * 动态切换大屏时调用
     */
    useEffect(() => {
        if (prevScreenId.current !== config.style?.screenId) {
            setLoaded(false);
            prevScreenId.current = config.style?.screenId || '';
            const _designerManager = new DesignerManager();
            loadScreen(_designerManager);
            setDesignerManager(_designerManager);
        }
        return () => {
            designerManager.destroy();
        }
    }, [config]);

    const {width, height} = designerManager.canvasManager.canvasConfig!;
    if (!config.style?.screenId)
        return <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#b0b0b0',
        }}>请引用大屏</div>;
    if (!loaded)
        return <Loading/>;
    return (
        <div style={{...{height: '100%', overflow: 'hidden'}}}>
            <div style={{width, height, background: 'black', overflow: 'hidden', position: "relative"}}>
                {layerBuilder.buildCanvasComponents(designerManager?.layerManager, designerManager.bpExecutor, "screen-reference")}
            </div>
        </div>
    );
});

export default ScreenReferenceComponent;