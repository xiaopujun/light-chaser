import React, {Component} from 'react';
import './style/FourAngleGlow.less';

/**
 * 四角辉光边框
 */
class FourAngleGlowBorder extends Component<any> {
    render() {
        const {active, chartConfigs} = this.props.LCDesignerStore;
        const {
            fourAngleGlowColor,
            fourAngleGlowWidth,
            fourAngleGlowLength
        } = chartConfigs[active.id + ''].elemBaseProperties;
        const fourAngleGlowConfig = {
            borderColor: fourAngleGlowColor,
            borderWidth: fourAngleGlowWidth,
            width: fourAngleGlowLength,
            height: fourAngleGlowLength
        };
        return (
            <div className="four-angle-glow">
                <span style={{...fourAngleGlowConfig}} className="angle angle1"/>
                <span style={{...fourAngleGlowConfig}} className="angle angle2"/>
                <span style={{...fourAngleGlowConfig}} className="angle angle3"/>
                <span style={{...fourAngleGlowConfig}} className="angle angle4"/>
                {this.props.children}
            </div>
        );
    }
}

export default FourAngleGlowBorder;