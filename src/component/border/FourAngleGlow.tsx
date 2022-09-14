import React, {Component} from 'react';
import './style/FourAngleGlow.less';

/**
 * 四角辉光边框
 */
class FourAngleGlow extends Component<any> {
    render() {
        return (
            <div className="four-angle-glow">
                <span className="angle angle1"/>
                <span className="angle angle2"/>
                <span className="angle angle3"/>
                <span className="angle angle4"/>
                {this.props.children}
            </div>
        );
    }
}

export default FourAngleGlow;