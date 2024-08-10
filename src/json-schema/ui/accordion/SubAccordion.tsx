import {Collapse, CollapseProps, Tooltip} from "antd";
import {Help} from "@icon-park/react";
import './Accordion.less';
import {AccordionProps} from "./IAccordionType.ts";


/**
 * 手风琴组件
 * 说明:该组件的。 Title属性show switch属性。 都是非受控的属性。 也就是说只能在创建这个组件的时候就确定这两个属性的值，
 * 后续是无法改变的。 除非销毁这个组件之后重新创建组件。 Value属性和defaultValue属性。 两者任选其一。 如果你使用value属性。
 * 则这个组件的值是受控的。 可以通过外部控制来更新这个组件的状态值。 如果你使用的是defaultValue属性，则这个组件的值是非受控的。
 * 操作这个组件的时候。 组件值，由本组件自身维护，不受外部控制。
 */
export default function SubAccordion(props: AccordionProps) {
    const {label, tip, children} = props;
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: label,
            children: <div>{children}</div>,
            extra: tip && <Tooltip title={tip} style={{marginLeft: 1}}><Help/></Tooltip>
        },
    ];

    return (
        <div className={'lc-sub-accordion'}>
            <Collapse bordered={false}
                      expandIconPosition={'end'}
                      items={items}/>
        </div>
    );
}