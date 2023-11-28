import {action, makeObservable, observable} from "mobx";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import ObjectUtil from "../../utils/ObjectUtil";
import {AbstractBPNodeController, AnchorPointInfoType} from "../node/core/AbstractBPNodeController";
import bpNodeControllerMap from "../node/core/impl/BPNodeControllerMap";

export interface IBPLine {
    id?: string;
    color?: string;
    lineWidth?: number;
    lineDash?: number[];
    startPoint?: IPoint;
    endPoint?: IPoint;
    firstCP?: IPoint;
    secondCP?: IPoint;
    //采样点列表
    samplePoints?: IPoint[];
    //起始锚点id
    startAnchorId?: string;
    //结束锚点id
    endAnchorId?: string;
}

export type IPoint = { x: number; y: number; }

export interface BPNodeLayoutType {
    id?: string;
    type?: string;
    position?: IPoint;
}

class BPStore {
    constructor() {
        makeObservable(this, {
            selectedNodes: observable,
            bpNodeLayoutMap: observable,
            canvasScale: observable,
            setSelectedNodes: action,
            addBPNodeLayout: action,
            updBpNodeLayout: action,
            setCanvasScale: action,
        });
    }

    //蓝图节点上锚点与锚点的映射关系，一个起始点可以链接多个终点（入库）
    bpAPMap: Record<string, string[]> = {};

    //蓝图节点锚点间连接的线条列表(入库）
    bpLines: Record<string, IBPLine> = {};

    //锚点与线条的对应关系（入库），一个锚点可以连接多条线，用于位置更新时，快速找到线条并更新线条位置
    bpAPLineMap: Record<string, string[]> = {};

    //蓝图节点布局信息映射（入库）
    bpNodeLayoutMap: Record<string, BPNodeLayoutType> = {};

    //蓝图节点控制器实例映射（入库）
    bpNodeControllerInsMap: Record<string, AbstractBPNodeController> = {};

    //蓝图节点产生的配置信息映射（入库）
    bpNodeConfigMap: Record<string, any> = {};

    //被选中的蓝图节点列表
    selectedNodes: HTMLElement[] = [];

    //被选中的线条列表
    selectedLines: IBPLine[] = [];

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

    //蓝图拖拽容器dom引用
    bpDragContentRef: HTMLDivElement | null = null;

    //蓝图画布相对于屏幕的偏移量
    canvasOffset: IPoint = {x: 320, y: 40};

    //蓝图画布拖拽后的偏移量
    canvasTranslate: IPoint = {x: 0, y: 0};

    //蓝图画布缩放比例
    canvasScale: number = 1;

    setBpDragContentRef = (ref: HTMLDivElement) => this.bpDragContentRef = ref;

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

    setSelectedLines = (lines: IBPLine[]) => {
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

    //更新线段的位置
    updLinePos = (line: IBPLine) => {
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

    setLines = (connectedLines: Record<string, IBPLine>) => {
        this.bpLines = connectedLines;
    }

    addAPMap = (startAnchorId: string, endAnchorId: string) => {
        if (!this.bpAPMap[startAnchorId])
            this.bpAPMap[startAnchorId] = [];
        this.bpAPMap[startAnchorId].push(endAnchorId);
    }

    addLine = (line: IBPLine) => {
        this.bpLines[line.id!] = line;
    }

    setCanvasScale = (scale: number) => {
        this.canvasScale = scale;
    }

    setCanvasTranslate = (translate: IPoint) => {
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

    /**
     * 删除节点步骤：
     * 1. 如果节点关联的锚点有连线
     *  1.1 删除锚点与锚点的映射关系
     *  1.2 删除锚点与线段的映射关系
     *  1.3 删除线段
     * 2. 删除节点配置
     * 3. 删除节点布局信息
     * 4. 删除节点controller实例信息
     * @param ids
     */
    delNode = (ids: string[]) => {
        if (!ids || ids.length === 0)
            return;
        //先删除节点上的线段，后删除节点
        ids.forEach(id => {
            let bpNodeController = this.bpNodeControllerInsMap[id];
            if (!bpNodeController) {
                //如果没有获取到实例，判断是否由于没有打开过蓝图编辑器导致。如果没有打开，则临时初始化所有节点的controller实例
                const nodeLayoutList = Object.values(this.bpNodeLayoutMap);
                if (Object.keys(this.bpNodeControllerInsMap).length === 0 && nodeLayoutList.length !== 0) {
                    //存在节点布局信息，但没有controller实例信息，说明没有打开过蓝图编辑器（实例信息在渲染节点时才产生）
                    nodeLayoutList.forEach(layout => {
                        const Controller = bpNodeControllerMap.get(layout.type!);
                        const config = this.bpNodeConfigMap[layout.id!];
                        if (Controller) {
                            //@ts-ignore  todo这里在抽象类中统一定义了构造器格式，理论上应该支持，后续研究下是否ts不支持这种方式
                            this.bpNodeControllerInsMap[layout.id!] = new Controller(config)!;
                        }
                    })
                }
                //再次获取实例
                bpNodeController = this.bpNodeControllerInsMap[id];
            }
            if (bpNodeController) {
                let nodeConfig = bpNodeController.getConfig();
                //获取当前节点下的所有锚点
                const aps: AnchorPointInfoType[] = [...nodeConfig.input!, ...nodeConfig.output!];
                aps.forEach(ap => {
                    const {id} = ap;
                    //删除锚点与锚点的映射关系
                    if (id! in this.bpAPMap)
                        delete this.bpAPMap[id!];
                    //删除锚点关联的线段 & 删除锚点与线段的映射关系
                    if (id! in this.bpAPLineMap) {
                        const lineIds = this.bpAPLineMap[id!];
                        //传递lines副本，避免操作原始数据造成的数据不一致
                        this.delLine([...lineIds]);
                        delete this.bpAPLineMap[id!];
                    }
                });

            }
            //删除节点配置信息（如果存在）
            delete this.bpNodeConfigMap[id];
            //删除节点布局信息
            delete this.bpNodeLayoutMap[id];
            //删除节点实例信息
            delete this.bpNodeControllerInsMap[id];
        });
        this.setSelectedNodes([]);
        // console.log("删除节点后的映射关系：", this.bpAPMap, this.bpAPLineMap, this.bpLines);
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