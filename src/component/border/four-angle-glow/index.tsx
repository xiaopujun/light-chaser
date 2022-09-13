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
                    <div className="four-angle-glow">
                        <span className="angle angle1"/>
                        <span className="angle angle2"/>
                        <span className="angle angle3"/>
                        <span className="angle angle4"/>
                        {this.props.children}
                    </div>
                ) : (<>{this.props.children}</>)}
            </>
        );
    }
}

export default FourAngleGlow;