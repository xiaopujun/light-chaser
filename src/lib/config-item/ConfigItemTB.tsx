import React, {Component, CSSProperties} from 'react';
import './ConfigItemTB.less';

interface ConfigItemTBProps {
    title: string;
    contentStyle?: CSSProperties;
}

class ConfigItemTB extends Component<ConfigItemTBProps> {
    render() {
        const {title = '', contentStyle = {width: 90}} = this.props;
        return (
            <div className={'lc-config-item-tb'}>
                <div className={'item-tb-title'}>{title}</div>
                <div className={'item-tb-content'} style={{...contentStyle}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ConfigItemTB;