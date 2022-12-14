import React, {Component} from 'react';
import './index.less';

/**
 * 四角辉光边框
 */
class FourAngleGlow extends Component<any> {
    render() {
        const {borderConfig} = this.props;
        return (
            <>
                {borderConfig.showBorder ? (
                    <div className="glow-border-out">
                        <div className="glow-border-in">
                            {this.props.children}
                        </div>
                    </div>
                ) : (<>{this.props.children}</>)}
            </>
        );
    }
}

export default FourAngleGlow;