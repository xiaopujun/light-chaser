import React, {CSSProperties} from 'react';
import './ConfigItem.less';

interface ConfigItemProps {
    title: string;
    itemStyle?: CSSProperties;
    titleStyle?: CSSProperties;
    contentStyle?: CSSProperties;
}

class ConfigItem extends React.PureComponent<ConfigItemProps> {
    render() {
        const {title = '', contentStyle, itemStyle, titleStyle} = this.props;
        return (
            <div className={'lc-config-item'} style={{...itemStyle}}>
                <div className={'item-title'} style={{...titleStyle}}>{title}</div>
                <div className={'item-content'} style={{...contentStyle}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ConfigItem;