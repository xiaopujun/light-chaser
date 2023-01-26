import React, {Component} from 'react';

class CfgItemBorder extends Component {
    render() {
        const _style = {
            width: '100%',
            border: '1px solid #00b5ff3b',
            padding: '2px',
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