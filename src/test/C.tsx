import React, {Component} from 'react';
import {observer} from "mobx-react";
import D from "./D";

class C extends Component {

    render() {
        console.log('C render');
        return (
            <>
                <D/>
            </>
        );
    }
}

export default observer(C);