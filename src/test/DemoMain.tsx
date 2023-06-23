import React from 'react';
import HotKey, {TriggerType} from "../designer/operate-provider/keyboard-mouse/HotKey";
import {nanoid} from "nanoid";

class MyComponent extends React.Component {

    componentDidMount() {
        document.addEventListener('mousedown', (e) => {
            console.log(e.button);
        });
    }

    render() {
        console.log(nanoid(10))
        let handlerMapping = {
            'control + s': {
                handler: () => {

                },
                triggerType: TriggerType.SINGLE
            },
            '  + wheel': {
                handler: (e: any) => {
                    let dom: any = document.getElementById('hotkey-test');
                    console.log(dom.contains(e.target));
                    console.log('wheel执行了' + Date.now(), e)
                }
            }
        }
        return <div id={'hotkey-test'} style={{width: 500, height: 200, backgroundColor: '#0d3d52'}}>
            <HotKey handlerMapping={handlerMapping}/>
            <div style={{width: 300, height: 100, backgroundColor: '#295e75'}}>ssss</div>
        </div>
    }

}

export default MyComponent;
