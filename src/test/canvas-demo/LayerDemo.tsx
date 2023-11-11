import React from "react";
import {SelectableDemo} from "./SelectableDemo";
import {MovableDemo} from "./MovableDemo";

export const LayerDemo: React.FC<{}> = props => {
    return (
        <div style={{width: '100%', height: '100%', background: 'black', position: 'relative'}}
             className={'selectable-demo-container'}>
            <SelectableDemo>
                <MovableDemo>
                    <div style={{
                        display: 'block',
                        position: 'absolute',
                        background: '#4f5315',
                        transform: 'translate(0, 0)'
                    }} className={'selectable-demo-item'}>
                        <div style={{
                            width: 100,
                            height: 100,
                            // position: 'absolute',
                            background: '#6d6d6d',
                            transform: 'translate(0, 0)'
                        }} className={'selectable-demo-item'}/>
                        <div style={{
                            width: 100,
                            height: 100,
                            // position: 'absolute',
                            background: '#6d6d6d',
                            transform: 'translate(100px, 100px)'
                        }} className={'selectable-demo-item'}>
                            sfsdf塑料袋放进看
                        </div>
                    </div>

                </MovableDemo>
            </SelectableDemo>
        </div>
    );
};