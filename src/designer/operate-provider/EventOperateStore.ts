import {action, makeObservable, observable} from "mobx";

/**
 * 设计器画布及元素操作控制store，用于协调缩放、拖拽、选择，右键操作菜单操作之间的数据传递
 * Designer canvas and element operation control store, used to coordinate data transmission between zoom, drag, selection, right-click operation menu operation
 */
class EventOperateStore {
    constructor() {
        makeObservable(this, {
            scale: observable,
            targets: observable,
            setScale: action,
            setTargets: action,
        })
    }

    /**
     * 缩放系数，所有接入缩放的组件都依赖该值
     */
    scale: number = 1;

    /**
     * 拖拽框架实例引用
     * Drag and drop framework instance reference
     */
    movableRef: any = null;
    /**
     * 选择器框架实例引用
     * Selector framework instance reference
     */
    selectorRef: any = null;
    /**
     * 被框选中的目标元素，用于框选后移动、缩放操作
     * The target element selected by the frame, used for moving and scaling operations after the frame is selected
     */
    targets: any[] = [];
    /**
     * 被框选中的目标元素ID，用于框选后右键操作菜单的继续操作
     * The ID of the target element selected by the frame, used for the subsequent operation of the right-click operation menu after the frame is selected
     */
    targetIds: string[] = [];
    /**
     * 由于是右键触发系统菜单的时候记录该ID。 因此需要有单独的变量来存放，避免和选择元素框架记录的ID进行相互覆盖。
     * Because the ID is recorded when the right mouse button triggers the system menu. Therefore, a separate variable is needed to store it to avoid mutual coverage with the ID recorded by the selected element framework.
     */
    unLockedId: string = '';
    /**
     * 拖拽框架的最大层级，用于操作菜单的置顶操作
     * The maximum level of the drag and drop framework, used for the top operation of the operation menu
     */
    maxOrder = 0;
    /**
     * 拖拽框架的最小层级，用于操作菜单的置底操作
     * The minimum level of the drag and drop framework, used for the bottom operation of the operation menu
     */
    minOrder = 0;

    setMaxOrder = (order: number) => this.maxOrder = order;

    setMinOrder = (order: number) => this.minOrder = order;

    setUnLockedId = (id: string) => this.unLockedId = id;

    setScale = (scale: number) => {
        this.scale = scale;
    };

    setMovableRef = (ref: any) => this.movableRef = ref;

    setSelectorRef = (ref: any) => this.selectorRef = ref;

    setTargets = (targets: any[]) => this.targets = targets;

    setTargetIds = (targetIds: string[]) => this.targetIds = targetIds;
}

const eventOperateStore = new EventOperateStore();
export default eventOperateStore;