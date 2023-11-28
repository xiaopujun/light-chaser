import {Component} from 'react';
import './AnimationConfig.less';
import {ConfigType} from "../../../designer/right/ConfigContent";

class AnimationConfig extends Component<ConfigType> {
    render() {
        return (
            <div className={'lc-animation-config'}>
                动画设置
            </div>
        );
    }
}

export default AnimationConfig;