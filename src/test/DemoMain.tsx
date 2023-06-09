import * as React from "react";
import GroupMovable from "../lib/lc-movable/GroupMovable";


export default function App() {
    const cubes = [];

    for (let i = 0; i < 30; ++i) {
        cubes.push(i);
    }

    return <div className="moveable app">
        <div className="container">
            <GroupMovable>
                <div className="elements selecto-area">
                    {cubes.map(i => <div className="cube target" key={i}/>)}
                </div>
                <div className="empty elements"/>
            </GroupMovable>
        </div>
    </div>;
}