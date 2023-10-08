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
}

const bpStore = new BPStore();
export default bpStore;