import {action, makeObservable, observable} from "mobx";
import Moveable from "react-moveable";
import {Component} from "react";
import layerManager from "../manager/LayerManager.ts";
import ObjectUtil from "../../utils/ObjectUtil";
import {DesignerRulerRef} from "../canvas/DesignerRuler";
import {ILayerItem} from "../DesignerType";
import layerListStore from "../left/layer-list/LayerListStore";
import designerLeftStore from "../left/DesignerLeftStore";
import Selecto from "react-selecto";

/**
 * 组件多选情况下的坐标值
 */
export interface GroupCoordinateType {
    /**
     * 最小X坐标
     */
    minX?: number;
    /**
     * 最小Y坐标
     */
    minY?: number;
    /**
     * 最大X坐标
     */
    maxX?: number;
    /**
     * 最大Y坐标
     */
    maxY?: number;
    /**
     * 组合框的宽度
     */
    groupWidth?: number;
    /**
     * 组合框的高度
     */
    groupHeight?: number;
}


/**
 * 设计器画布及元素操作控制store，用于协调缩放、拖拽、选择，右键操作菜单操作之间的数据传递
 * Designer canvas and element operation control store, used to coordinate data transmission between zoom, drag, selection, right-click operation menu operation
 */
class EventOperateStore {
    constructor() {
        makeObservable(this, {
            targets: observable,
            scale: observable,
            setScale: action,
            setTargetIds: action,
        })
    }

    /**
     * 拖拽框架实例引用
     * Drag and drop framework instance reference
     */
    movableRef: Moveable | null = null;
    /**
     * 选择器框架实例引用
     * Selector framework instance reference
     */
    selectorRef: Selecto | null = null;
    /**
     * 设计器标尺组件实例引用
     */
    rulerRef: DesignerRulerRef | null = null;
    /**
     * 设计器画布拖拽缩放内容dom实例引用（用于同步标尺的缩放）
     */
    dsContentRef: HTMLDivElement | null = null;
    /**
     * 被框选中的目标元素，用于框选后移动、缩放操作
     * The target element selected by the frame, used for moving and scaling operations after the frame is selected
     */
    targets: HTMLElement[] = [];
    /**
     * 被框选中的目标元素ID，用于框选后右键操作菜单的继续操作
     * The ID of the target element selected by the frame, used for the subsequent operation of the right-click operation menu after the frame is selected
     */
    targetIds: string[] = [];

    /**
     * 用于记录鼠标右键点击时的目标元素，用于快捷键操作时的目标元素的范围筛选
     */
    pointerTarget: EventTarget | null = null;

    /**
     * 组合框选时的坐标信息
     */
    groupCoordinate: GroupCoordinateType = {
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
    };

    /**
     * 撤销控制，当backoff = true，变更的数据不会记录到日志队列中。
     */
    backoff: boolean = false;

    /**
     * 用于记录当前手动（双击或拖拽）新添加的组件id,实际渲染时根据该id读取组件数据并记录操作日志。非手动添加的组件不会记录操作日志
     */
    addRecordCompId: string | null = null;

    /**
     * 当前画布的缩放比例，作为响应式变量，再缩放画布时，实时调整控制点的大小
     */
    scale = 1;

    /**
     * 设计器画布缩放比例
     */
    ratio = 1;

    setDsContentRef = (ref: HTMLDivElement | null) => this.dsContentRef = ref;

    setRuleRef = (ref: DesignerRulerRef | null) => this.rulerRef = ref;

    setRatio = (ratio: number) => this.ratio = ratio;

    setScale = (scale: number) => this.scale = scale;

    setAddRecordCompId = (id: string | null) => this.addRecordCompId = id;

    setBackoff = (backoff: boolean) => this.backoff = backoff;

    setMovableRef = (ref: Moveable) => this.movableRef = ref;

    setSelectorRef = (ref: Selecto) => this.selectorRef = ref;

    setTargetIds = (ids: string[]) => {
        //存储之前一次的选中组件id，用于清空图层列表的上一次选中状态
        const oldTargetIds = [...this.targetIds];
        this.targetIds = ids;
        const _targets: HTMLElement[] = [];
        ids.forEach(id => {
            const target = document.getElementById(id);
            target && _targets.push(target);
        });
        this.targets = _targets;

        //更新图层列表状态
        const {layerInstances} = layerListStore;
        const {menu} = designerLeftStore;
        if (menu === 'layer-list') {
            //清除之前的选中
            oldTargetIds.forEach(id => {
                const instance: Component = layerInstances[id];
                if (instance)
                    instance.setState({selected: false});
            });
            //设置本次选中的组件id
            this.targetIds.forEach(id => {
                const instance: Component = layerInstances[id];
                if (instance)
                    instance.setState({selected: true});
            })
        }

        //若选中多个组件，计算更新组件多选时的左上角坐标
        if (this.targets.length > 1) {
            const {calculateGroupCoordinate} = eventOperateStore;
            calculateGroupCoordinate(this.targets);
        }
    }

    setPointerTarget = (target: EventTarget) => this.pointerTarget = target;

    setGroupCoordinate = (coordinate: GroupCoordinateType) => {
        this.groupCoordinate = ObjectUtil.merge(this.groupCoordinate, coordinate);
    }

    /**
     * 计算组件多选时的左上角坐标
     * @param compArr
     */
    calculateGroupCoordinate = (compArr: HTMLElement[]) => {
        const {layerConfigs} = layerManager;
        const groupCoordinate: GroupCoordinateType = {
            minX: Infinity,
            minY: Infinity,
            maxX: -Infinity,
            maxY: -Infinity
        };
        compArr.forEach((item: HTMLElement) => {
            const layerConfig: ILayerItem = layerConfigs[item.id];
            const {x = 0, y = 0, width, height} = layerConfig!;
            if (x < groupCoordinate.minX!)
                groupCoordinate.minX = x;
            if (y < groupCoordinate.minY!)
                groupCoordinate.minY = y;
            if ((x + width!) > groupCoordinate.maxX!)
                groupCoordinate.maxX = x + width!;
            if ((y + height!) > groupCoordinate.maxY!)
                groupCoordinate.maxY = y + height!;
        });
        groupCoordinate.groupWidth = groupCoordinate.maxX! - groupCoordinate.minX!;
        groupCoordinate.groupHeight = groupCoordinate.maxY! - groupCoordinate.minY!;
        this.setGroupCoordinate(groupCoordinate);
    }

    /**
     * 让鼠标重新聚焦到设计器画布上
     */
    focusDesignerCanvas = () => {
        const enforcementCap = document.querySelector('.lc-ruler-content');
        //删除组件后，重新聚焦鼠标指针到容器上，避免鼠标失去焦点导致其他快捷键失效。
        this.setPointerTarget(enforcementCap! as HTMLElement);
    }

}

const eventOperateStore = new EventOperateStore();
export default eventOperateStore;