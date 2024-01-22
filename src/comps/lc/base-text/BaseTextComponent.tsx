import {Component} from 'react';
import {ComponentBaseProps} from "../../common-component/common-types";
import './BaseTextComponent.less';

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

export interface BaseTextComponentState extends BaseTextComponentProps {
    edit: boolean;
}

class BaseTextComponent extends Component<BaseTextComponentProps, BaseTextComponentState> {

    constructor(props: BaseTextComponentProps) {
        super(props);
        this.state = {...props, edit: false};
    }

    eventHandlerMap: Record<string, Function> = {};

    onClick = () => {
        if ('click' in this.eventHandlerMap)
            this.eventHandlerMap['click']();
    }

    render() {
        const {style, data, edit} = this.state;
        return (
            <div onDoubleClick={() => this.setState({edit: true})}
                 className={'base-text-component'}
                 style={{...style}}
                 onClick={this.onClick}>
                {edit ? <input
                    ref={(ref) => ref?.select()}
                    onChange={(e) => data!.staticData!.data = e.target.value}
                    onBlur={() => this.setState({edit: false})}
                    autoFocus={true}
                    type={'text'}
                    defaultValue={data?.staticData?.data}/> : data?.staticData?.data}
            </div>
        );
    }
}

export default BaseTextComponent;