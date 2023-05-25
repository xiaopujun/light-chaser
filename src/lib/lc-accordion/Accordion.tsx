import React, {Component} from 'react';
import './Accordion.less';
import LcSwitch from "../lc-switch/LcSwitch";
import {RightOutlined} from "@ant-design/icons";

interface AccordionProps {
    // 标题
    title?: string;
    // 是否显示开关
    showSwitch?: boolean;
    // 开关变化回调
    onChange?: (data: boolean) => void;
    // 开关状态值
    visible?: boolean;
}

class Accordion extends Component<AccordionProps> {

    accDom: any = null;

    componentDidMount() {
        const {showSwitch = false, visible} = this.props;
        if (!showSwitch)
            this.titleClickMode();
        if (showSwitch && visible)
            this.unfold();
    }

    componentWillUnmount() {
        this.accDom.removeEventListener("click");
    }

    unfold = () => {
        this.accDom.classList.toggle("accordion-active");
        let panel = this.accDom.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }

    /**
     * 标题点击模式，点击标题，展开内容
     */
    titleClickMode = () => {
        this.accDom.addEventListener("click", () => this.unfold());
    }

    /**
     * 手风琴标题开关变化
     */
    switchChange = (data: boolean) => {
        this.unfold();
        const {onChange} = this.props;
        onChange && onChange(data);
    }

    render() {
        const {showSwitch = false, title = '', visible} = this.props;
        return (
            <div className={'lc-accordion'}>
                <div className="accordion-header" ref={dom => this.accDom = dom}>
                    <div className={'title-content'}>{title}</div>
                    <div className={'title-switch'}>{showSwitch ?
                        <LcSwitch value={visible} onChange={this.switchChange}/> :
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