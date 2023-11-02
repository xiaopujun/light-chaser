import {action, makeObservable, observable} from "mobx";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import {CanvasLineType, PointType} from "../types";
import ObjectUtil from "../../utils/ObjectUtil";
import {AbstractBPNodeController} from "../node/core/AbstractBPNodeController";

export interface BPNodeLayoutType {
    id?: string;
    type?: string;
    position?: PointType;
}

class BPStore {
    constructor() {
        makeObservable(this, {
            selectedNodes: observable,
            bpNodeLayoutMap: observable,
            setSelectedNodes: action,
            addBPNodeLayout: action,
            updBpNodeLayout: action,
        });
    }

    //蓝图节点锚点间的对应关系，一个起始点可以链接多个终点（入库）
    bpAPMap: Record<string, string[]> = {};

    //已经连接的线条列表(入库）
    bpLines: Record<string, CanvasLineType> = {};

    //锚点与线条的对应关系（入库），一个锚点可以连接多条线，用于位置更新时，快速找到线条并更新线条位置
    bpAPLineMap: Record<string, string[]> = {};

    //蓝图节点布局信息映射（入库）
    bpNodeLayoutMap: Record<string, BPNodeLayoutType> = {};

    //蓝图节点控制器实例映射（入库）
    bpNodeControllerInsMap: Record<string, AbstractBPNodeController> = {};


    bpNodeConfigMap: Record<string, any> = {};

    //被选中的蓝图节点列表
    selectedNodes: HTMLElement[] = [];

    //被选中的线条列表
    selectedLines: CanvasLineType[] = [];

    //蓝图移动框架引用
    bpMovableRef: Moveable | null = null;

    //蓝图选择框架引用
    bpSelectRef: Selecto | null = null;

    //蓝图canvas图层的上层画笔
    upCtx: CanvasRenderingContext2D | null = null;

    //蓝图canvas图层的下层画笔
    downCtx: CanvasRenderingContext2D | null = null;

    //节点容器
    nodeContainerRef: HTMLDivElement | null = null;

    //蓝图画布相对于屏幕的偏移量
    canvasOffset: PointType = {x: 320, y: 40};

    //蓝图画布拖拽后的偏移量
    canvasTranslate: PointType = {x: 0, y: 0};

    //蓝图画布缩放比例
    canvasScale: number = 1;

    setBpNodeControllerInsMap = (insMap: Record<string, AbstractBPNodeController>) => {
        this.bpNodeControllerInsMap = insMap;
    }

    //获取所有节点信息及配置
    getAllNodeConfig = (): Record<string, any> => {
        if (!this.bpNodeLayoutMap)
            return {};

        const bpNodeLayoutList = Object.keys(this.bpNodeLayoutMap);
        //只有在this.bpNodeControllerInsMap数量大于0时候才需要获取蓝图节点配置
        if (Object.keys(this.bpNodeControllerInsMap).length > 0) {
            const nodeConfigMap: Record<string, any> = {};
            bpNodeLayoutList.forEach((id: string) => {
                nodeConfigMap[id] = this.bpNodeControllerInsMap[id].getConfig();
            });
            return nodeConfigMap;
        } else {
            //否则直接返回this.bpNodeConfigMap中的数据即可
            //这包含两种情况：
            // 1. 打开过蓝图编辑器，但是没有产生过节点实例，或者实例被删除
            // 2. 蓝图数据保存过，也产生过节点实例，但是重新打开后没有编辑过蓝图，此时不会产生新的蓝图数据，直接返回之前的数据即可
            return this.bpNodeConfigMap;
        }
    }

    setBpNodeLayoutMap = (layoutMap: Record<string, BPNodeLayoutType>) => {
        this.bpNodeLayoutMap = layoutMap;
    }

    setBpNodeConfigMap = (configMap: Record<string, any>) => {
        this.bpNodeConfigMap = configMap;
    }

    addBPNodeLayout = (layout: BPNodeLayoutType) => {
        this.bpNodeLayoutMap[layout.id!] = layout;
    }

    updBpNodeLayout = (layout: BPNodeLayoutType) => {
        const oldLayout = this.bpNodeLayoutMap[layout.id!];
        if (oldLayout)
            ObjectUtil.merge(oldLayout, layout);
    }

    setSelectedLines = (lines: CanvasLineType[]) => {
        this.selectedLines = lines;
    }

    addAPLineMap = (anchorId: string, lineId: string) => {
        if (!this.bpAPLineMap[anchorId])
            this.bpAPLineMap[anchorId] = [];
        this.bpAPLineMap[anchorId].push(lineId);
    }

    delAPLineMap = (anchorId: string, lineId: string) => {
        if (this.bpAPLineMap[anchorId]) {
            const index = this.bpAPLineMap[anchorId].indexOf(lineId);
            if (index !== -1)
                this.bpAPLineMap[anchorId].splice(index, 1);
            //如果锚点没有连接的线条了，就删除这个锚点
            if (this.bpAPLineMap[anchorId].length === 0)
                delete this.bpAPLineMap[anchorId];
        }
    }

    //更新线段的位置
    updLinePos = (line: CanvasLineType) => {
        const oldLine = this.bpLines[line.id!];
        if (oldLine) {
            oldLine.startPoint = line.startPoint;
            oldLine.endPoint = line.endPoint;
        }
    }

    setAPLineMap = (anchorRelationship: Record<string, string[]>) => {
        this.bpAPLineMap = anchorRelationship;
    }

    setAPMap = (anchorRelationship: Record<string, string[]>) => {
        this.bpAPMap = anchorRelationship;
    }

    setLines = (connectedLines: Record<string, CanvasLineType>) => {
        this.bpLines = connectedLines;
    }

    addAPMap = (startAnchorId: string, endAnchorId: string) => {
        if (!this.bpAPMap[startAnchorId])
            this.bpAPMap[startAnchorId] = [];
        this.bpAPMap[startAnchorId].push(endAnchorId);
    }

    delAPMap = (startAnchorId: string, endAnchorId: string) => {
        if (this.bpAPMap[startAnchorId]) {
            const index = this.bpAPMap[startAnchorId].indexOf(endAnchorId);
            if (index !== -1)
                this.bpAPMap[startAnchorId].splice(index, 1);
            //如果锚点已经没有关联任何其他锚点，就删除这个锚点
            if (this.bpAPMap[startAnchorId].length === 0)
                delete this.bpAPMap[startAnchorId];
        }
    }

    addLine = (line: CanvasLineType) => {
        this.bpLines[line.id!] = line;
    }

    setCanvasScale = (scale: number) => {
        this.canvasScale = scale;
    }

    setCanvasTranslate = (translate: PointType) => {
        if (translate)
            this.canvasTranslate = translate;
    }

    setSelectedNodes = (nodes: HTMLElement[]) => {
        //清理旧的选中节点的样式
        // this.selectedNodes.forEach(node => {
        //     node.style.border = "1px solid #55555570";
        // });
        this.selectedNodes = nodes;
        //设置新的选中节点的样式
        // this.selectedNodes.forEach(node => {
        //     node.style.border = "1px solid #3cd2ff";
        // })
    }

    setBpMovableRef = (ref: Moveable) => {
        this.bpMovableRef = ref;
    }

    setBpSelectRef = (ref: Selecto) => {
        this.bpSelectRef = ref;
    }

    setUpCtx = (ctx: CanvasRenderingContext2D) => {
        this.upCtx = ctx;
    }

    setDownCtx = (ctx: CanvasRenderingContext2D) => {
        this.downCtx = ctx;
    }

    setNodeContainerRef = (ref: HTMLDivElement) => {
        this.nodeContainerRef = ref;
    }

    delNode = (ids: string[]) => {
        if (!ids || ids.length === 0)
            return;
        //先删除节点上的线段，后删除节点
        ids.forEach(id => {
            const bpNodeController = this.bpNodeControllerInsMap[id];
            if (bpNodeController) {
                let nodeConfig = bpNodeController.getConfig();
                const aps = [...nodeConfig.input!, ...nodeConfig.output!];
                //删除与节点相关的连线
                aps.forEach(ap => {
                    const lineIds = this.bpAPLineMap[ap.id!];
                    if (lineIds)
                        this.delLine(lineIds);
                });

            }
            //删除节点布局信息
            delete this.bpNodeLayoutMap[id];
            //删除节点实例信息
            delete this.bpNodeControllerInsMap[id];
            //删除节点配置信息（如果存在）
            delete this.bpNodeConfigMap[id];
        });
        this.setSelectedNodes([]);
    }

    delLine = (ids: string[]) => {
        if (!ids || ids.length === 0)
            return;
        //先删除该条线段对应的锚点映射关系
        ids.forEach(id => {
            const line = this.bpLines[id];
            if (line)
                this.delAPMap(line.startAnchorId!, line.endAnchorId!);
            delete this.bpLines[id];
            //删除锚点与链接线段的映射关系
            this.delAPLineMap(line.startAnchorId!, id);
            this.delAPLineMap(line.endAnchorId!, id);
        });
        this.setSelectedLines([]);
    }

}

const bpStore = new BPStore();
export default bpStore;