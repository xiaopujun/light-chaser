import React, {Component} from 'react';
import B from "./B";
import C from "./C";
import {observer} from "mobx-react";

class A extends Component {

    render() {
        console.log('A render');
        return (
            <>
                <B/>
                <C/>
            </>
        );
    }
}

export default observer(A);