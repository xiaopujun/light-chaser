import React from 'react';
import './ConfigCard.less';

interface ConfigPanelProps {
    title: string;
    cardStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
}

/**
 * 配置项面板
 */
class ConfigCard extends React.PureComponent<ConfigPanelProps> {
    render() {
        const {title = '', cardStyle, titleStyle, bodyStyle} = this.props;
        return (
            <div className={'lc-config-card'} style={cardStyle}>
                <div className={'panel-title'} style={titleStyle}>{title}</div>
                <div className={'panel-body'} style={bodyStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ConfigCard;