import React, {Component} from 'react';
import BaseBorderSet from "./BaseBorderSet";

export default class FourAngleGlowBorderSet extends Component<any> {
    
    render() {
        return (
            <>
                <BaseBorderSet {...this.props}/>
            </>
        );
    }
}