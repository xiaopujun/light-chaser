export interface UpdateOptions {
    reRender: boolean;
}

abstract class AbstractController<I = any, C = any> {

    /**
     * 组件实例引用
     * @protected
     */
    protected instance: I | null = null;
    /**
     * 组件配置(包括组件数据)
     * @protected
     */
    public config: C | null = null;
    /**
     * 组件所处容器的dom元素
     * @protected
     */
    public container: HTMLElement | null = null;

    /******************生命周期******************/

    /**
     * 创建组件并将组件挂载到指定的容器中
     * @param container 容器
     * @param config 组件配置
     */
    public abstract create(container: HTMLElement, config: C): Promise<void>;

    /**
     * 更新组件配置，并触发组件重新渲染
     * @param config 组件属性（参数）
     * @param upOp 操作类型
     */
    public abstract update(config: C, upOp?: UpdateOptions): void;

    /**
     * 销毁组件
     */
    public destroy(): void {
        this.instance = null;
        this.config = null;
        this.container = null;
    }


    /******************普通方法******************/
    /**
     * 获取组件配置数据
     */
    public abstract getConfig(): C | null;

}

export default AbstractController;
