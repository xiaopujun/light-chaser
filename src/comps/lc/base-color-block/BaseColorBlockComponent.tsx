import {Component} from 'react';
import {ComponentInfoType} from "../../common-component/common-types";

export interface BaseColorBlockComponentStyle {
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: string;
    background?: string;
}

export interface BaseColorBlockComponentProps {
    info?: ComponentInfoType;
    style?: BaseColorBlockComponentStyle;
}

class BaseColorBlockComponent extends Component<BaseColorBlockComponentProps, BaseColorBlockComponentProps> {

    constructor(props: BaseColorBlockComponentProps) {
        super(props);
        this.state = {...props};
    }

    render() {
        const {style} = this.state;
        return (
            <div style={{...{height: '100%', display: 'flex'}, ...style}}/>
        );
    }
}

export default BaseColorBlockComponent;