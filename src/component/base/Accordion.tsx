import React, {Component} from 'react';
import './style/Accordion.less';
import LcSwitch from "./LcSwitch";
import {RightOutlined} from "@ant-design/icons";

interface AccordionProps {
    showSwitch?: boolean;
    title?: string;
}

class Accordion extends Component<AccordionProps> {

    accDom: any = null;

    componentDidMount() {
        const {showSwitch = false} = this.props;
        if (!showSwitch)
            this.titleClickMode();
    }

    /**
     * 标题点击模式，点击标题，展开内容
     */
    titleClickMode = () => {
        const accDomTemp = this.accDom;
        accDomTemp.addEventListener("click", function () {
            accDomTemp.classList.toggle("accordion-active");
            let panel = accDomTemp.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    /**
     * 开关点击模式，点击开关，展示内容
     */
    switchClickMode = () => {

    }

    /**
     * 手风琴标题开关变化
     */
    switchChange = (data: boolean) => {
        let accDomTemp: any = this.accDom;
        accDomTemp.classList.toggle("accordion-active");
        let panel = accDomTemp.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }

    render() {
        const {showSwitch = false, title = ''} = this.props;
        return (
            <div className={'lc-accordion'}>
                <div className="accordion-header" ref={dom => this.accDom = dom}>
                    <div className={'title-content'}>{title}</div>
                    <div className={'title-switch'}>{showSwitch ? <LcSwitch onChange={this.switchChange}/> :
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