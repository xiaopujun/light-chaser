import {Component} from 'react';
import {ComponentBaseProps} from "../../common-component/common-types";

export interface BaseIframeComponentStyle {
    src?: string;
}

export interface BaseIframeComponentProps extends ComponentBaseProps {
    style?: BaseIframeComponentStyle;
}

class BaseIframeComponent extends Component<BaseIframeComponentProps, BaseIframeComponentProps> {

    constructor(props: BaseIframeComponentProps) {
        super(props);
        this.state = {...props};
    }

    render() {
        const {src} = this.state.style!;
        return (
            <>
                {src === "" ? <div style={{
                    color: '#9a9a9a',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div>请设置iframe地址</div>
                </div> : <div style={{height: '100%', display: 'flex'}}>
                    <iframe title={'lc标准iframe组件'} src={src} style={{width: '100%', height: '100%', border: 'none'}}/>
                </div>}
            </>
        );
    }
}

export default BaseIframeComponent;