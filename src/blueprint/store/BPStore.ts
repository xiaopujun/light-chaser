import {action, makeObservable, observable} from "mobx";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import {CanvasLineType} from "../types";
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

    selectedNodes: HTMLElement[] = [];

    bpMovableRef: Moveable | null = null;

    bpSelectRef: Selecto | null = null;

    connectedLines: CanvasLineType[] = [];

    //锚点间的对应关系，一个起始点可以链接多个终点
    anchorRelationship: Record<string, string[]> = {};

    //canvas层的上层画笔
    upCtx: CanvasRenderingContext2D | null = null;
    //canvas层的下层画笔
    downCtx: CanvasRenderingContext2D | null = null;

    //节点容器
    nodeContainerRef: HTMLDivElement | null = null;

    nodes: NodeProps[] = [];

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