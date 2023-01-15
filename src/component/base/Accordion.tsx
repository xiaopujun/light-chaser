import React, {Component} from 'react';
import './style/Accordion.less';
import LcSwitch from "./LcSwitch";
import {RightOutlined} from "@ant-design/icons";

interface AccordionProps {
    showSwitch?: boolean;
    title?: string;
}

//todo 需要优化，dom元素获取遍历的时候不能遍历到其他组件的dom元素
class Accordion extends Component<AccordionProps> {

    accDom: any = null;

    componentDidMount() {
        const {showSwitch = false} = this.props;
        this.accDom = document.getElementsByClassName("accordion-title");
        if (!showSwitch)
            this.titleClickMode();
    }

    /**
     * 标题点击模式，点击标题，展开内容
     */
    titleClickMode = () => {
        for (let i = 0; i < this.accDom.length; i++) {
            let accItem: any = this.accDom[i];
            accItem.addEventListener("click", function () {
                accItem.classList.toggle("accordion-active");
                let panel = accItem.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
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
        for (let i = 0; i < this.accDom.length; i++) {
            let accItem: any = this.accDom[i];
            accItem.classList.toggle("accordion-active");
            let panel = accItem.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }

    render() {
        const {showSwitch = false, title = ''} = this.props;
        return (
            <div className={'lc-accordion'}>
                <div className="accordion-title">
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