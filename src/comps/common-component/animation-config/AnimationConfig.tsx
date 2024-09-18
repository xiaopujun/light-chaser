import {Component} from 'react';
import './AnimationConfig.less';
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController.ts";

class AnimationConfig extends Component<{ controller: AbstractDesignerController }> {
    render() {
        return (
            <div className={'lc-animation-config'}>
                动画设置
            </div>
        );
    }
}

export default AnimationConfig;