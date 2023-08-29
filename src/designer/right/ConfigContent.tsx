import React, {Component, Suspense} from 'react';
import {LineOutlined} from "@ant-design/icons";
import rightStore from "./RightStore";
import {observer} from "mobx-react";
import './ConfigContent.less';
import Loading from "../../lib/loading/Loading";
import designerStore from "../store/DesignerStore";
import {AbstractCustomComponentDefinition} from "../../framework/core/AbstractCustomComponentDefinition";
import {ConfigType} from "./ConfigType";
import EditorDesignerLoader from "../loader/EditorDesignerLoader";
import AbstractDesignerComponent from "../../framework/core/AbstractDesignerComponent";
import ObjectUtil from "../../utils/ObjectUtil";
import historyRecordOperateProxy from "../operate-provider/undo-redo/HistoryRecordOperateProxy";

class ConfigContent extends Component {

    createProxy = (instance: AbstractDesignerComponent) => {
        return new Proxy(instance, {
            get(target, prop) {
                const originalMethod = target[prop as keyof AbstractDesignerComponent];
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

    buildConfigContent = () => {
        const {compInstances} = designerStore;
        let {activeMenu, activeElem} = rightStore;
        let abstractConfigObj: AbstractCustomComponentDefinition = EditorDesignerLoader.getInstance().customComponentInfoMap[activeElem.type + '']
        let configMapping = abstractConfigObj.getMenuToConfigContentMap();
        const ConfigComp: React.ComponentType<ConfigType> = configMapping![activeMenu];
        //使用动态代理对象，监听属性变化
        const instance = this.createProxy(compInstances[activeElem.id + '']);
        return (
            <Suspense fallback={<Loading/>}>
                <ConfigComp instance={instance}/>
            </Suspense>
        )

    }

    onClose = () => {
        const {setContentVisible} = rightStore;
        setContentVisible && setContentVisible(false);
    }

    render() {
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
                    <div className={'panel-operate'} onClick={this.onClose}><LineOutlined/></div>
                </div>
                <div className={'lc-panel-content'}>
                    {this.buildConfigContent()}
                </div>
            </div>
        );
    }
}

export default observer(ConfigContent);