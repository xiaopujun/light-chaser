import React, {Component} from 'react';

interface CfgItemBorderProps {
    width?: number | string;
}

class CfgItemBorder extends Component<CfgItemBorderProps> {
    render() {
        const {width = '100%'} = this.props;
        const _style = {
            width: width,
            border: '1px solid #00b5ff6b',
            padding: '3px',
            borderRadius: '3px'
        }
        return (
            <div className={'lc-config-item-border'} style={{..._style}}>
                {this.props.children}
            </div>
        );
    }
}

export default CfgItemBorder;