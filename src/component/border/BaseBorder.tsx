import React, {Component} from 'react';
import './style/BaseBorder.less';

interface BaseBorderProps {

}

/**
 * 基础边框
 */
export default class BaseBorder extends Component<BaseBorderProps> {
    render() {
        return (
            <div className={'lc-base-border'}>
                {this.props.children}
            </div>
        );
    }
}
