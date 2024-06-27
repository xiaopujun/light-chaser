import React, {Suspense} from 'react';
import rightStore from "./RightStore";
import {observer} from "mobx-react";
import './ConfigContent.less';
import {AbstractDefinition} from "../../framework/core/AbstractDefinition";
import AbstractDesignerController from "../../framework/core/AbstractDesignerController";
import ObjectUtil from "../../utils/ObjectUtil";
import historyRecordOperateProxy from "../operate-provider/undo-redo/HistoryRecordOperateProxy";
import Loading from "../../json-schema/ui/loading/Loading";
import AbstractController from "../../framework/core/AbstractController";
import {Close} from "@icon-park/react";
import layerManager from "../manager/LayerManager.ts";
import editorDesignerLoader from "../loader/EditorDesignerLoader.ts";

export interface ConfigType<T extends AbstractController = AbstractDesignerController> {
    controller: T;
}

const ConfigContent = () => {
    const createProxy = (controller: AbstractDesignerController) => {
        return new Proxy(controller, {
            get(target, prop) {
                const originalMethod = target[prop as keyof AbstractDesignerController];
                if (typeof originalMethod === 'function' && originalMethod.name === "update") {
                    return new Proxy(originalMethod, {
                        apply(target, thisArg, argumentsList) {
                            const newValue = argumentsList[0];
                            const oldValue = ObjectUtil.getOriginValue(thisArg.config, argumentsList[0]);
                            historyRecordOperateProxy.doStyleUpd(newValue, oldValue);
                            return target.apply(thisArg, argumentsList);
                        }
                    });
                }
                return originalMethod;
            }
        });
    }

    const buildConfigContent = () => {
        const {compController} = layerManager;
        const {activeMenu, activeElem} = rightStore;
        const abstractConfigObj: AbstractDefinition = editorDesignerLoader.definitionMap[activeElem.type + '']
        if (!abstractConfigObj) return;
        const configMapping = abstractConfigObj.getMenuToConfigContentMap();
        const ConfigComp: React.ComponentType<ConfigType> = configMapping![activeMenu];
        //使用动态代理对象，监听属性变化
        const controller = createProxy(compController[activeElem.id + '']);
        if (!ConfigComp) return;
        return (
            <Suspense fallback={<Loading/>}>
                <ConfigComp controller={controller}/>
            </Suspense>
        )

    }

    const onClose = () => {
        const {setContentVisible, setActiveMenu} = rightStore;
        setContentVisible && setContentVisible(false);
        setActiveMenu && setActiveMenu('');
    }


    const {activeMenu, menus} = rightStore;
    let activeMenuName = '';
    for (let i = 0; i < menus.length; i++) {
        if (menus[i].key === activeMenu) {
            activeMenuName = menus[i].name;
            break;
        }
    }
    return (
        <div className={'lc-config-panel'}>
            <div className={'lc-panel-top'}>
                <div className={'panel-title'}>
                    <span>{activeMenuName}</span></div>
                <div className={'panel-operate'} onClick={onClose}><Close/></div>
            </div>
            <div className={'lc-panel-content'}>
                {buildConfigContent()}
            </div>
        </div>
    );
}

export default observer(ConfigContent);