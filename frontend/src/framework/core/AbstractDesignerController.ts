/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {APIConfig, IDatabase, IFilterConfigType, ThemeItemType} from "../../designer/DesignerType";
import AbstractController from "./AbstractController";
import {ComponentBaseProps} from "../../comps/common-component/CommonTypes.ts";
import FetchUtil from "../../utils/FetchUtil.ts";
import Base64Util from "../../utils/Base64Util.ts";

/**
 * AbstractDesignerController继承自AbstractController，在泛型的定义和约束上和AbstractController完全保持一致。
 * 此外，AbstractDesignerController扩展了一些自定义组件所需的特有方法，如：修改组件数据、注册蓝图事件等
 */
abstract class AbstractDesignerController<I = any, C = any> extends AbstractController<I, C> {
    //轮询请求定时器
    protected interval: NodeJS.Timeout | null = null;
    //上一次数据连接状态 true：成功 false：失败
    protected lastReqState: boolean = true;
    //异常提示信息dom元素
    private errMsgDom: HTMLElement | null = null;

    /**
     * 更新组件数据,且必须触发组件的重新渲染
     * @param data
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public changeData(data: any): void {
    }

    /**
     * 用于注册组件事件，在组件接入蓝图事件系统时使用
     */
    public registerEvent(): void {
    }


    private doApi = (config: APIConfig) => {
        const {url, method, params, header, frequency = 5, filter, autoFlush} = config;
        const request = () => {
            FetchUtil.doRequestNativeResult(url!, method!, header, params).then((res) => {
                if (res) {
                    if (!this.lastReqState) {
                        this.lastReqState = true;
                        this.errMsgDom?.remove();
                        this.errMsgDom = null;
                    }
                    if (filter && filter !== '') {
                        const func = eval(`(${filter})`);
                        res = typeof func === 'function' ? func(res) : res;
                    }
                    this.changeData(res);
                } else {
                    this.lastReqState = false;
                    //请求失败，在原有容器的基础上添加异常提示信息的dom元素（此处直接操作dom元素，不适用react的api进行组件的反复挂载和卸载）
                    if (!this.errMsgDom) {
                        this.errMsgDom = document.createElement("div");
                        this.errMsgDom.classList.add("view-error-message");
                        this.errMsgDom.innerText = "数据加载失败...";
                        this.container!.appendChild(this.errMsgDom);
                    }
                }
            });
        }
        request();
        if (autoFlush)
            this.interval = setInterval(() => request(), frequency * 1000);
    }

    private doDatabase = (config: IDatabase) => {
        const {sql, targetDb, filter, frequency, autoFlush} = config;
        const request = () => {
            if (!sql || sql === '')
                return;
            FetchUtil.post(`/api/db/executor/execute`, {id: targetDb, sql: Base64Util.toBase64(sql)}).then(res => {
                let {data} = res;
                if (res.code === 200) {
                    if (!this.lastReqState) {
                        this.lastReqState = true;
                        this.errMsgDom?.remove();
                        this.errMsgDom = null;
                    }
                    if (filter && filter !== '') {
                        const func = eval(`(${filter})`);
                        data = typeof func === 'function' ? func(data) : data;
                    }
                    this.changeData(data);
                } else {
                    this.lastReqState = false;
                    //请求失败，在原有容器的基础上添加异常提示信息的dom元素（此处直接操作dom元素，不适用react的api进行组件的反复挂载和卸载）
                    if (!this.errMsgDom) {
                        this.errMsgDom = document.createElement("div");
                        this.errMsgDom.classList.add("view-error-message");
                        this.errMsgDom.innerText = "数据加载失败...";
                        this.container!.appendChild(this.errMsgDom);
                    }
                }
            });
        }
        request();
        if (autoFlush)
            this.interval = setInterval(() => request(), (frequency || 5) * 1000);
    }

    /**
     * 加载组件数据，用于在预览（展示）模式下渲染完组件后根据当前组件的数据配置自动加载并更新组件数组。
     * 注：若自定义组件有自己的数据加载方式，则需要覆写此方法
     */
    public loadComponentData(): void {
        //预览模式
        const {data} = this.config! as ComponentBaseProps;
        if (!data) return;
        const {sourceType} = data!;
        switch (sourceType) {
            case "static":
                //静态数据不做处理，组件首次渲染时默认读取静态数据
                break;
            case "api":
                this.doApi(data?.apiData ?? {});
                break;
            case 'database':
                this.doDatabase(data?.database ?? {});
                break;
        }
    }

    /**
     * 更新本组件的主题样式方法，用于在全局切换主题时使用
     * @param newTheme 新主题
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public updateTheme(newTheme: ThemeItemType): void {
    }

    public updateFilter(filter: IFilterConfigType): void {
        if (this.config && (this.config as ComponentBaseProps).filter)
            (this.config as ComponentBaseProps)!.filter = filter;
        if (!this.container)
            return;
        if (filter?.enable) {
            this.container.style.filter = `blur(${filter.blur}px) brightness(${filter.brightness}) contrast(${filter.contrast}) opacity(${filter.opacity}) saturate(${filter.saturate}) hue-rotate(${filter.hueRotate}deg)`
        } else {
            this.container.style.filter = 'none';
        }
    }

    /**
     * 设置组件的显示状态，默认直接使用css属性控制组件显示。
     * 接入组件的过程中，建议自行实现该方法以达到更好的性能表现。建议的做法是显示时重新渲染组件. 隐藏时卸载整个组件即dom元素。可以节省内存开销
     * @param visible
     */
    public setVisible(visible: boolean): void {
        if (this.container) {
            if (visible)
                this.container.style.visibility = "visible";
            else
                this.container.style.visibility = "hidden";
        }
    }

}

export default AbstractDesignerController;
