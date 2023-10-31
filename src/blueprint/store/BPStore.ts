import {action, makeObservable, observable} from "mobx";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import {CanvasLineType, PointType} from "../types";
import {NodeProps} from "../node/BPNode";
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
            bpNodes: observable,
            bpNodeLayoutMap: observable,
            setSelectedNodes: action,
            addNodes: action,
            updNodePos: action,
            addBPNodeLayout: action,
        });
    }

    //蓝图节点锚点间的对应关系，一个起始点可以链接多个终点（入库）
    bpAPMap: Record<string, string[]> = {};

    //已经连接的线条列表(入库）
    bpLines: Record<string, CanvasLineType> = {};

    //拖拽到蓝图中的节点（入库）
    bpNodes: Record<string, NodeProps> = {};

    //锚点与线条的对应关系（入库），一个锚点可以连接多条线，用于位置更新时，快速找到线条并更新线条位置
    bpAPLineMap: Record<string, string[]> = {};

    //蓝图节点布局信息映射（入库）
    bpNodeLayoutMap: Record<string, BPNodeLayoutType> = {};

    //蓝图节点控制器实例映射（入库）
    bpNodeControllerInsMap: Record<string, AbstractBPNodeController> = {};

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
            if (index !== -1) {
                this.bpAPLineMap[anchorId].splice(index, 1);
            }
        }
    }

    //更新节点与线条的位置
    updNodePos = (node: NodeProps) => {
        const oldNode = this.bpNodes[node.id!];
        if (oldNode) {
            ObjectUtil.merge(oldNode, node);
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

    setNodes = (nodes: Record<string, NodeProps>) => {
        this.bpNodes = nodes;
    }

    addNodes = (node: NodeProps) => {
        this.bpNodes[node.id!] = node;
    }

    addAPMap = (startAnchorId: string, endAnchorId: string) => {
        if (!this.bpAPMap[startAnchorId])
            this.bpAPMap[startAnchorId] = [];
        this.bpAPMap[startAnchorId].push(endAnchorId);
    }

    delAPMap = (startAnchorId: string, endAnchorId: string) => {
        if (this.bpAPMap[startAnchorId]) {
            const index = this.bpAPMap[startAnchorId].indexOf(endAnchorId);
            if (index !== -1) {
                this.bpAPMap[startAnchorId].splice(index, 1);
            }
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
        this.selectedNodes.forEach(node => {
            node.style.border = "1px solid #55555570";
        });
        this.selectedNodes = nodes;
        //设置新的选中节点的样式
        this.selectedNodes.forEach(node => {
            node.style.border = "1px solid #3cd2ff";
        })
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
            const node = this.bpNodes[id];
            if (node) {
                const aps = [...node.input!, ...node.output!];
                aps.forEach(ap => {
                    const lineIds = this.bpAPLineMap[ap.id!];
                    if (lineIds)
                        this.delLine(lineIds);
                });
            }
            delete this.bpNodes[id];
        });
        this.setSelectedNodes([]);
    }

    delLine = (ids: string[]) => {
        if (!ids || ids.length === 0)
            return;
        ids.forEach(id => {
            delete this.bpLines[id];
        });
        this.setSelectedLines([]);
    }

}

const bpStore = new BPStore();
export default bpStore;