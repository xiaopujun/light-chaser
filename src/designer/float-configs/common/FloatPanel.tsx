import {Component} from 'react';
import {LineOutlined} from "@ant-design/icons";
import CommonDragger from "../../operate-provider/drag/CommonDragger";
import './FloatPanel.less';

export interface FloatPanelProps {
    title?: string;
    initPosition?: { x: number, y: number };
    width?: number;
    height?: number;
    onClose?: () => void;
    className?: string;
}

/**
 * 浮动面板容器，提供浮动面板的拖拽功能
 */
class FloatPanel extends Component<FloatPanelProps> {

    panelRef: any = null;
    dragTargetRef: any = null;

    componentDidMount() {
        const {initPosition = {x: 0, y: 0}} = this.props;
        if (this.dragTargetRef && this.panelRef)
            new CommonDragger(this.panelRef, this.dragTargetRef, initPosition);
    }

    onClose = () => {
        const {onClose} = this.props;
        onClose && onClose();
    }

    render() {
        const {initPosition = {x: 0, y: 0}, title, className, width} = this.props;
        return (
            <div className={`float-panel ${className}`}
                 style={{transform: `translate(${initPosition.x}px, ${initPosition.y}px)`, width}}
                 ref={ref => this.panelRef = ref}>
                <div className={'panel-title'}>
                    <div className={'title-left'}>{title}</div>
                    <div ref={ref => this.dragTargetRef = ref} className={'title-drag-target'}
                         style={{width: '50%', height: '100%'}}>
                    </div>
                    <div className={'title-right'} onClick={this.onClose}><span><LineOutlined/></span></div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default FloatPanel;