import {Component} from 'react';
import {ComponentBaseProps} from "../../common-component/common-types";

export interface BaseTextComponentStyle {
    color?: string;
    fontSize?: number;
    fontWeight?: number;
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

    render() {
        const {style, data} = this.state;
        return (
            <div style={{...{height: '100%', display: 'flex'}, ...style}}>
                {data?.staticData?.data}
            </div>
        );
    }
}

export default BaseTextComponent;