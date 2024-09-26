import {Component} from 'react';
import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import DesignerCanvas from "../../../designer/canvas/DesignerCanvas";

export interface DynamicPanelComponentStyle {
    src?: string;
}

export interface DynamicPanelComponentProps extends ComponentBaseProps {
    style?: DynamicPanelComponentStyle;
}

class DynamicPanelComponent extends Component<DynamicPanelComponentProps, DynamicPanelComponentProps> {

    constructor(props: DynamicPanelComponentProps) {
        super(props);
        this.state = {...props};
    }

    eventHandlerMap: Record<string, Function> = {};

    onLoad = () => {
        if ('load' in this.eventHandlerMap)
            this.eventHandlerMap['load']();
    }
    // 双击进入订台看板编辑
    onDoubleClick = () => {

    }

    render() {
        const {src} = this.state.style!;
        return (
            <>
                {src === "" ? <div
                    onDoubleClick={this.onDoubleClick}
                    style={{
                    color: '#9a9a9a',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#BFC7C4',
                }}
                >
                    <div>双击编辑动态面板</div>
                </div> : <div style={{height: '100%', display: 'flex'}}>
                    <iframe title={'lc标准iframe组件'} src={src} onLoad={this.onLoad}
                            style={{width: '100%', height: '100%', border: 'none'}}/>
                </div>}
            </>
        );
    }
}

export default DynamicPanelComponent;
