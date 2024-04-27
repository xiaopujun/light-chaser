import {APIConfig, IDatabase, ThemeItemType} from "../../designer/DesignerType";
import AbstractController from "./AbstractController";
import {ComponentBaseProps} from "../../comps/common-component/common-types";
import FetchUtil from "../../utils/FetchUtil.ts";

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
            FetchUtil.doRequest(url!, method!, header, params).then((res) => {
                let {code, data} = res;
                if (code === 200) {
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
        if (autoFlush)
            this.interval = setInterval(() => request(), frequency * 1000);
        else
            request();
    }

    private doDatabase = (config: IDatabase) => {
        const {sql, targetDb, filter, frequency, autoFlush} = config;
        const request = () => {
            FetchUtil.post(`/api/db/executor/execute`, {id: targetDb, sql}).then(res => {
                let {data, code} = res;
                if (code === 200) {
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

        if (autoFlush)
            this.interval = setInterval(() => request(), (frequency || 5) * 1000);
        else
            request();
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
                this.doApi(data?.apiData!);
                break;
            case 'database':
                this.doDatabase(data?.database!);
                break;
        }
    }

    /**
     * 更新本组件的主题样式方法，用于在全局切换主题时使用
     * @param newTheme 新主题
     */
    public updateTheme(newTheme: ThemeItemType): void {
    }

}

export default AbstractDesignerController;
