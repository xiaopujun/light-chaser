import {ReactNode, useEffect, useRef, useState} from 'react';
import './Accordion.less';
import {QuestionCircleOutlined, RightOutlined} from "@ant-design/icons";
import Switch from "../switch/Switch";
import {Tooltip} from "antd";

interface AccordionProps {
    /**
     * 标题
     */
    label?: string;
    /**
     * 说明文字
     */
    tip?: string;
    /**
     * 是否显示开关
     */
    showSwitch?: boolean;
    // 开关值变化回调
    onChange?: (data: boolean) => void;
    // 开关状态值（受控）
    value?: boolean;
    // 开关状态值（非受控）
    defaultValue?: boolean;
    titleStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    children?: ReactNode;
}

/**
 * 手风琴组件
 * 说明:该组件的。 Title属性show switch属性。 都是非受控的属性。 也就是说只能在创建这个组件的时候就确定这两个属性的值，
 * 后续是无法改变的。 除非销毁这个组件之后重新创建组件。 Value属性和defaultValue属性。 两者任选其一。 如果你使用value属性。
 * 则这个组件的值是受控的。 可以通过外部控制来更新这个组件的状态值。 如果你使用的是defaultValue属性，则这个组件的值是非受控的。
 * 操作这个组件的时候。 组件值，由本组件自身维护，不受外部控制。
 */
export default function Accordion(props: AccordionProps) {
    const {
        label, tip, showSwitch, value, defaultValue,
        titleStyle, bodyStyle, onChange, children
    } = props;
    const accordionBodyRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const controlled = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState(controlled ? !!value : !!defaultValue);
    const finalValue = controlled ? value : stateValue;

    const titleClickMode = () => {
        calculateFold(!headerRef?.current?.classList.contains("accordion-active"));
    };

    const calculateFold = (_value: boolean) => {
        if (!headerRef.current || !accordionBodyRef.current) return;
        if (!showSwitch)
            headerRef?.current?.classList.toggle("accordion-active");
        if (_value)
            accordionBodyRef.current!.style.display = 'block';
        else
            accordionBodyRef.current!.style.display = 'none';
    }

    const switchChange = (_value: boolean) => {
        calculateFold(_value);
        onChange && onChange(_value);
        if (!controlled) setStateValue(_value);
    }

    useEffect(() => {
        if (!showSwitch) {
            //普通模式
            headerRef?.current?.addEventListener("click", titleClickMode);
            accordionBodyRef!.current!.style.display = 'none';
        }
        if (showSwitch && finalValue)
            accordionBodyRef!.current!.style.display = 'block';  //开关模式处于开启
        else
            accordionBodyRef!.current!.style.display = 'none'; //开关模式处于关闭

        return () => headerRef?.current?.removeEventListener("click", titleClickMode);
    }, []);

    return (
        <div className={'lc-accordion'}>
            <div className="accordion-header" ref={headerRef} style={{...titleStyle}}>
                <div className={'title-content'}>{label} &nbsp;
                    {tip && <Tooltip title={tip}><QuestionCircleOutlined/>&nbsp;&nbsp;</Tooltip>}</div>
                <div className={'title-switch'}>{showSwitch ?
                    <Switch value={finalValue} onChange={switchChange}/>
                    : <RightOutlined className={'accordion-icon'}/>}</div>
            </div>
            <div className="lc-accordion-body" style={{...bodyStyle}} ref={accordionBodyRef}>{children}</div>
        </div>
    );
}