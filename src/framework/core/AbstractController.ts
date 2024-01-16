export interface UpdateOptions {
    reRender: boolean;
}

/**
 * 设计器自定义组件控制器的顶级抽象接口，用于控制自定义组件的整个生命周期
 * @param I 组件实例类型，若组件为React的class组件，则I=class的实例化对象。
 * 若组件为React的函数式组件，则I=forwardRef钩子传递出的ref引用（当然你也可以有其他自定义的实现）
 * 若组件为纯Js实现的组件，则I=组件实例化对象（可参考Echarts活G2创建实例后的返回值）
 * @param C 组件配置类型，即组件的完整属性类型
 */
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
