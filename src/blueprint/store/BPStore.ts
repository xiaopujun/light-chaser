import {action, makeObservable, observable} from "mobx";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import {CanvasLineType, PointType} from "../types";
import {NodeProps} from "../node/BPNode";

class BPStore {
    constructor() {
        makeObservable(this, {
            selectedNodes: observable,
            setSelectedNodes: action,
            nodes: observable,
            addNodes: action,
        });
    }

    //被选中的蓝图节点列表
    selectedNodes: HTMLElement[] = [];

    //蓝图移动框架引用
    bpMovableRef: Moveable | null = null;

    //蓝图选择框架引用
    bpSelectRef: Selecto | null = null;

    //已经连接的线条列表(入库）
    connectedLines: CanvasLineType[] = [];

    //锚点间的对应关系，一个起始点可以链接多个终点（入库）
    anchorRelationship: Record<string, string[]> = {};

    //蓝图canvas图层的上层画笔
    upCtx: CanvasRenderingContext2D | null = null;

    //蓝图canvas图层的下层画笔
    downCtx: CanvasRenderingContext2D | null = null;

    //节点容器
    nodeContainerRef: HTMLDivElement | null = null;

    //拖拽到蓝图中的节点（入库）
    nodes: NodeProps[] = [];

    //蓝图画布相对于屏幕的偏移量
    canvasOffset: PointType = {x: 320, y: 40};

    //蓝图画布拖拽后的偏移量
    canvasTranslate: PointType = {x: 0, y: 0};

    //蓝图画布缩放比例
    canvasScale: number = 1;

    setCanvasScale = (scale: number) => {
        this.canvasScale = scale;
    }

    setCanvasTranslate = (translate: PointType) => {
        this.canvasTranslate = translate;
    }

    setSelectedNodes = (nodes: HTMLElement[]) => {
        this.selectedNodes = nodes;
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

    addNodes = (node: NodeProps) => {
        this.nodes.push(node);
    }

    addAnchorRelationship = (startAnchorId: string, endAnchorId: string) => {
        if (!this.anchorRelationship[startAnchorId]) {
            this.anchorRelationship[startAnchorId] = [];
        }
        this.anchorRelationship[startAnchorId].push(endAnchorId);
    }

    removeAnchorRelationship = (startAnchorId: string, endAnchorId: string) => {
        if (this.anchorRelationship[startAnchorId]) {
            const index = this.anchorRelationship[startAnchorId].indexOf(endAnchorId);
            if (index !== -1) {
                this.anchorRelationship[startAnchorId].splice(index, 1);
            }
        }
    }
}

const bpStore = new BPStore();
export default bpStore;