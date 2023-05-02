import React, {Component} from 'react';
import './ConfigCard.less';

interface ConfigPanelProps {
    title: string;
}

/**
 * 配置项面板
 */
class ConfigCard extends Component<ConfigPanelProps> {
    render() {
        const {title = ''} = this.props;
        return (
            <div className={'lc-config-card'}>
                <div className={'panel-title'}>{title}</div>
                <div className={'panel-body'}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ConfigCard;