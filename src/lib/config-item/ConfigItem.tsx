import React, {Component, CSSProperties} from 'react';
import './ConfigItem.less';

interface ConfigItemProps {
    title: string;
    contentStyle?: CSSProperties;
}

class ConfigItem extends React.PureComponent<ConfigItemProps> {
    render() {
        const {title = '', contentStyle = {width: 90}} = this.props;
        return (
            <div className={'lc-config-item'}>
                <div className={'item-title'}>{title}</div>
                <div className={'item-content'} style={{...contentStyle}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ConfigItem;