import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import headerStore from "../../HeaderStore";
import {CodeSandboxSquareFilled} from "@ant-design/icons";
import eventOperateStore from "../../../operate-provider/EventOperateStore";

export default class BluePrintHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        const {setBluePrintVisible} = headerStore;
        return {
            icon: CodeSandboxSquareFilled,
            name: '蓝图交互',
            order: 0,
            onClick: () => {
                //打开蓝图前清空画布中已经选中的组件,避免删除蓝图节点时，误删画布中的组件
                const {setTargetIds} = eventOperateStore;
                setTargetIds([]);
                setBluePrintVisible(true);
            }
        };
    }
}
