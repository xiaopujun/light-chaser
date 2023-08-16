import React, {Component} from 'react';
import './Accordion.less';
import LcSwitch from "../lc-switch/LcSwitch";
import {RightOutlined} from "@ant-design/icons";

interface AccordionProps {
    // 标题（非受控）
    title?: string;
    // 是否显示开关（非受控）
    showSwitch?: boolean;
    // 开关变化回调
    onChange?: (data: boolean) => void;
    // 开关状态值（受控）
    value?: boolean;
    // 开关状态值（非受控）
    defaultValue?: boolean;
}

/**
 * 手风琴组件
 * 说明:该组件的。 Title属性show switch属性。 都是非受控的属性。 也就是说只能在创建这个组件的时候就确定这两个属性的值，
 * 后续是无法改变的。 除非销毁这个组件之后重新创建组件。 Value属性和defaultValue属性。 两者任选其一。 如果你使用value属性。
 * 则这个组件的值是受控的。 可以通过外部控制来更新这个组件的状态值。 如果你使用的是defaultValue属性，则这个组件的值是非受控的。
 * 操作这个组件的时候。 组件值，由本组件自身维护，不受外部控制。
 */
class Accordion extends Component<AccordionProps> {

    accDom: any = null;
    valueControl: boolean = true;
    pendingTimer: NodeJS.Timer | null = null;

    state: any = {
        value: false,
        title: '',
        showSwitch: false,
    }

    constructor(props: AccordionProps) {
        super(props);
        let {value, title, showSwitch, defaultValue} = this.props;
        if (defaultValue !== undefined && value === undefined)
            this.valueControl = false;
        value = !!(value || defaultValue);
        this.state = {value, title, showSwitch};
    }

    componentDidMount() {
        const {showSwitch = false, value} = this.state;
        if (!showSwitch) {
            this.accDom.addEventListener("click", this.titleClickMode);
            let panel = this.accDom.nextElementSibling;
            panel.style.overflow = 'hidden';
        }
        if (showSwitch && value) {
            this.accDom.classList.toggle("accordion-active");
            let panel = this.accDom.nextElementSibling;
            if (panel?.style.maxHeight)
                panel.style.maxHeight = null;
            else
                panel.style.maxHeight = (panel.scrollHeight || 2000) + "px";
        } else {
            let panel = this.accDom.nextElementSibling;
            panel.style.overflow = 'hidden';
        }
    }

    componentWillUnmount() {
        this.accDom.removeEventListener("click", this.titleClickMode);
    }

    calculateFold = (value: boolean) => {
        this.accDom.classList.toggle("accordion-active");
        let panel = this.accDom.nextElementSibling;
        if (value) {
            this.pendingTimer = setTimeout(() => {
                panel.style.overflow = 'visible';
                this.pendingTimer = null;
            }, 200);
        } else {
            panel.style.overflow = 'hidden';
            if (this.pendingTimer) {
                clearTimeout(this.pendingTimer);
                this.pendingTimer = null;
            }
        }
        if (panel?.style.maxHeight)
            panel.style.maxHeight = null;
        else
            panel.style.maxHeight = (panel.scrollHeight || 2000) + "px";
    }


    /**
     * 标题点击模式，点击标题，展开内容
     */
    titleClickMode = () => {
        const value = !this.state.value;
        this.setState({value});
        this.calculateFold(value);
    }

    /**
     * 手风琴标题开关变化
     */
    switchChange = (value: boolean) => {
        this.calculateFold(value);
        const {onChange} = this.props;
        onChange && onChange(value);
        if (!this.valueControl)
            this.setState({value});
    }

    render() {
        const {title, showSwitch} = this.state;
        return (
            <div className={'lc-accordion'}>
                <div className="accordion-header" ref={dom => this.accDom = dom}>
                    <div className={'title-content'}>{title}</div>
                    <div className={'title-switch'}>{showSwitch ?
                        <LcSwitch
                            value={this.valueControl ? this.props.value : this.state.value}
                            onChange={this.switchChange}/> :
                        <RightOutlined className={'accordion-icon'}/>}</div>
                </div>
                <div className="lc-accordion-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Accordion;