import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import headerStore from "../../HeaderStore";
import {CodeSandboxSquareFilled} from "@ant-design/icons";

export default class BluePrintHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        const {setBluePrintVisible} = headerStore;
        return {
            icon: CodeSandboxSquareFilled,
            name: '蓝图交互',
            order: 0,
            onClick: () => {
                setBluePrintVisible(true);
            }
        };
    }
}
