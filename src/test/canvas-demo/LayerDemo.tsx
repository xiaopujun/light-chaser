import React from "react";
import {SelectableDemo} from "./SelectableDemo";
import {MovableDemo} from "./MovableDemo";
import './LayerDemo.less';
import SortBinaryTree from "../../framework/data-structure/sort-binary-tree/SortBinaryTree";

export const LayerDemo: React.FC<{}> = props => {
    new SortBinaryTree();
    return (
        <div style={{width: '100%', height: '100%', background: 'black', position: 'relative'}}
             className={'selectable-demo-container'}>
            <SelectableDemo>
                <MovableDemo>
                    <div style={{
                        display: 'block',
                        position: 'absolute',
                        width: 10,
                        height: 10,
                        background: '#8b2c24',
                        transform: 'translate(0, 0)'
                    }} className={'selectable-demo-item container-demo'}>
                        <div style={{
                            width: 100,
                            height: 100,
                            position: 'absolute',
                            background: '#6d6d6d',
                            transform: 'translate(500px, 250px)'
                        }} className={'selectable-demo-item'}/>
                        <div style={{
                            width: 100,
                            height: 100,
                            position: 'absolute',
                            background: '#6d6d6d',
                            transform: 'translate(200px, 300px)'
                        }} className={'selectable-demo-item'}>
                            sfsdf塑料袋放进看
                        </div>
                    </div>
                </MovableDemo>
            </SelectableDemo>
        </div>
    );
};