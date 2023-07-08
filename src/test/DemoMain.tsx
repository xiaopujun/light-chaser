import React from 'react';
import HotKey, {TriggerType} from "../designer/operate-provider/keyboard-mouse/HotKey";
import {nanoid} from "nanoid";

class MyComponent extends React.Component {

    fakeRef: any = null;

    componentDidMount() {
        this.fakeRef.addEventListener('pointerdown', (e: any) => {
            console.log('pointerdown');
            this.fakeRef.addEventListener('pointermove', this.move);
        });
        this.fakeRef.addEventListener('pointerup', (e: any) => {
            console.log('pointerup');
            this.fakeRef.removeEventListener('pointermove', this.move);
        });
    }

    move = () => {
        console.log('move');
    }

    render() {

        return (
            <div ref={ref => this.fakeRef = ref}>
                <div onClick={() => console.log('dsajfd')}>
                    niubi
                </div>
            </div>
        )
    }

}

export default MyComponent;
