import {BPTransportNode} from "../BPExecutor";

/**
 * 节点解析器，用于解析蓝图执行路径上不同节点的处理逻辑
 */
export default abstract class AbstractNodeParser {
    /**
     * 解析执行函数，解析识别当前的节点类型，
     * 并执行节点提供的处理逻辑。根据节点类型输出对应的结果
     */
    public abstract doParse(transportNode: BPTransportNode, params: any): void;
}