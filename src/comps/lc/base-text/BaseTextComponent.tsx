import {Component} from 'react';
import {ComponentBaseProps} from "../../common-component/common-types";
import './FontGlobal.css';

export interface BaseTextComponentStyle {
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: string;
    alignItems?: string;
    justifyContent?: string;
}

export interface BaseTextComponentProps extends ComponentBaseProps {
    style?: BaseTextComponentStyle;
}

class BaseTextComponent extends Component<BaseTextComponentProps, BaseTextComponentProps> {

    constructor(props: BaseTextComponentProps) {
        super(props);
        this.state = {...props};
    }

    eventHandlerMap: Record<string, Function> = {};

    onClick = () => {
        if ('click' in this.eventHandlerMap)
            this.eventHandlerMap['click']();
    }

    render() {
        const {style, data} = this.state;
        return (
            <div style={{height: '100%', overflow: 'hidden', ...style}} onClick={this.onClick}>
                {data?.staticData?.data}
            </div>
        );
    }
}

export default BaseTextComponent;