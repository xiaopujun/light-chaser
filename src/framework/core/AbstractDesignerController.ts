import {ThemeItemType} from "../../designer/DesignerType";
import AbstractController from "./AbstractController";
import HttpUtil from "../../utils/HttpUtil";
import {ComponentBaseProps} from "../../comps/common-component/common-types";

abstract class AbstractDesignerController<I = any, C = any> extends AbstractController<I, C> {
    //轮询请求定时器
    protected interval: NodeJS.Timeout | null = null;
    //上一次数据连接状态 true：成功 false：失败
    protected lastReqState: boolean = true;
    //是否为断开后重新连接
    protected reConnect: boolean = false;
    //异常提示信息dom元素
    private errMsgDom: HTMLElement | null = null;

    /**
     * 更新组件数据,且必须触发组件的重新渲染
     * @param data
     */
    changeData(data: any): void {
    }

    registerEvent(): void {
    }

    /**
     * 加载组件数据，用于在预览（展示）模式下渲染完组件后根据当前组件的数据配置自动加载并更逊组件数组。
     * 注：若自定义组件有自己的数据加载方式，则需要覆写此方法
     */
    loadComponentData(): void {
        //预览模式
        const {data} = this.config! as ComponentBaseProps;
        if (!data) return;
        const {dataSource} = data!;
        switch (dataSource) {
            case "static":
                //静态数据不做处理，组件首次渲染时默认读取静态数据
                break;
            case "api":
                const {url, method, params, header, flashFrequency = 5} = data?.apiData!;
                this.interval = setInterval(() => {
                    HttpUtil.sendHttpRequest(url!, method!, header!, params!).then((data: any) => {
                        if (data) {
                            if (!this.lastReqState) {
                                this.lastReqState = true;
                                this.errMsgDom?.remove();
                                this.errMsgDom = null;
                                this.changeData(data);
                            }
                            this.changeData(data);
                        }
                    }).catch(() => {
                        this.lastReqState = false;
                        //请求失败，在原有容器的基础上添加异常提示信息的dom元素（此处直接操作dom元素，不适用react的api进行组件的反复挂载和卸载）
                        if (!this.errMsgDom) {
                            this.errMsgDom = document.createElement("div");
                            this.errMsgDom.classList.add("view-error-message");
                            this.errMsgDom.innerText = "数据加载失败...";
                            this.container!.appendChild(this.errMsgDom);
                        }
                    });
                }, flashFrequency * 1000);
                break;
        }
    }

    /**
     * 更新本组件的主题样式方法，用于在全局切换主题时使用
     * @param newTheme 新主题
     */
    updateTheme(newTheme: ThemeItemType): void {
    }

}

export default AbstractDesignerController;
