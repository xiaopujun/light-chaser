export enum OperateType {
    CONFIG,
    DATA,
}

abstract class AbstractComponent<I = {}, C = {}> {

    /**
     * 组件实例引用
     * @protected
     */
    protected instance: I | null = null;
    /**
     * 组件配置(包括组件数据)
     * @protected
     */
    protected config: C | null = null;

    /******************生命周期******************/

    /**
     * 创建组件并将组件挂载到指定的容器中
     * @param container 容器
     * @param params 组件属性（参数）
     */
    public abstract create(container: HTMLElement, params?: Record<string, unknown>): Promise<this>;

    /**
     * 更新组件配置，并触发组件重新渲染
     * @param props 组件属性（参数）
     * @param op 操作类型
     */
    public abstract update(props: C, op?: OperateType): void;

    /**
     * 销毁组件
     */
    public abstract destroy(): void;


    /******************普通方法******************/
    /**
     * 获取组件配置数据
     */
    public abstract getConfig(): C | null;

}

export default AbstractComponent;
