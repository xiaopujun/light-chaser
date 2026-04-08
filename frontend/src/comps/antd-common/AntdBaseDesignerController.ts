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

import AbstractDesignerController from "../../framework/core/AbstractDesignerController";
import {UpdateOptions} from "../../framework/core/AbstractController";
import {ComponentBaseProps} from "../common-component/CommonTypes.ts";
import {Options, Plot} from "@antv/g2plot";
import ObjectUtil from "../../utils/ObjectUtil";
import BPExecutor from "../../designer/blueprint/core/BPExecutor";

export abstract class AntdBaseDesignerController<I extends Plot<any> = Plot<Options>,
    C extends ComponentBaseProps = ComponentBaseProps> extends AbstractDesignerController<I, C> {

    protected interval: NodeJS.Timeout | null = null;
    //上一次数据连接状态 true：成功 false：失败
    protected lastReqState: boolean = true;
    private ClazzTemplate: (new (...args: any[]) => I) | undefined;

    changeData(data: any) {
        this.instance?.changeData(data);
        //g2plot系列图表，style.data是其内部存储图表数据的地方，因此每次更新数据，该属性可以主动更新
        if (this.config?.style?.data)
            this.config!.style!.data = data;
        //data.staticData是LC表中组件属性存储静态数据的地方，也作为其他数据源存储结果的中转站，更新数据时应该同时更新staticData属性
        this.config!['data']!['staticData'] = data;
    }

    registerEvent(): void {
        const nodeId = this.config?.base?.id ?? "";
        this.instance?.on('plot:click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "globalClick", this.config)
        });
        this.instance?.on('element:click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "elementClick", this.config)
        });
        // 图例添加点击事件
        this.instance?.on('legend-item:click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "legendClick", this.config)
        });
        // 图例名称添加点击事件
        this.instance?.on('legend-item-name:click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "elementNameClick", this.config)
        });
        // axis-label 添加点击事件
        this.instance?.on('axis-label:click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "axisLabelClick", this.config)
        });
    }

    public commonCreate(container: HTMLElement, Clazz: new (...args: any[]) => I, config: C): void {
        this.config = config;
        this.container = container;
        this.instance = new Clazz(container, this.config?.style ?? {} as C);
        this.instance?.render();
        this.ClazzTemplate = Clazz;
        this.registerEvent();
    }

    public commonUpdate(config: C, Clazz: new (...args: any[]) => I, upOp?: UpdateOptions,): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.update(this.config?.style ?? {});
    }

    setVisible(visible: boolean) {
        if (visible) {
            //显示
            if (!this.ClazzTemplate || this.instance)
                return;
            this.instance = new this.ClazzTemplate(this.container, this.config?.style ?? {} as C);
            this.instance?.render();
        } else {
            //隐藏
            this.instance?.destroy();
            this.instance = null;
            //移除container下的所有子dom
            while (this.container?.firstChild) {
                this.container?.removeChild(this.container?.firstChild);
            }
        }

    }
}