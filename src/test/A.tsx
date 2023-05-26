import React, {Component} from 'react';
import B from "./B";
import C from "./C";
import {observer} from "mobx-react";

class A extends Component {

    componentDidMount() {
        // for (let i = 0; i < 5000; i++) {
        //     document.addEventListener('click', () => {
        //         console.log('click');
        //     });
        // }
    }

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