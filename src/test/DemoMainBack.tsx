import * as React from "react";
import Selecto from "react-selecto";
import Moveable from "react-moveable";


export default function App() {
    const [targets, setTargets] = React.useState([]);
    const moveableRef = React.useRef(null);
    const selectoRef = React.useRef(null);
    const cubes = [];

    for (let i = 0; i < 30; ++i) {
        cubes.push(i);
    }

    return <div className="moveable app">
        <div className="container">
            <div className="logo logos" id="logo">
                <a href="https://github.com/daybrush/selecto" target="_blank">
                    <img src="https://daybrush.com/selecto/images/256x256.png" className="selecto"/>
                </a>
                <a href="https://github.com/daybrush/moveable" target="_blank">
                    <img src="https://daybrush.com/moveable/images/256x256.png"/>
                </a>
            </div>
            <h1>Select Moveable targets in real time.</h1>
            <p className="description">You can drag and move targets and select them.</p>
            <Moveable
                ref={moveableRef}
                draggable={true}
                target={targets}
                onClickGroup={e => {
                    (selectoRef as any).current?.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                }}
                onDragGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.transform = ev.transform;
                    });
                }}
            />
            <Selecto
                ref={selectoRef}
                dragContainer={".elements"}
                selectableTargets={[".selecto-area .cube"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                onDragStart={e => {
                    const moveable: any = moveableRef.current;
                    const target = e.inputEvent.target;
                    if (
                        moveable.isMoveableElement(target)
                        || targets.some((t: any) => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }}
                onSelect={(e: any) => {
                    setTargets(e.selected);
                }}
                onSelectEnd={e => {
                    const moveable: any = moveableRef.current;
                    if (e.isDragStart) {
                        e.inputEvent.preventDefault();
                        setTimeout(() => {
                            moveable.dragStart(e.inputEvent);
                        });
                    }
                }}
            />

            <div className="elements selecto-area">
                {cubes.map(i => <div className="cube target" key={i}/>)}
            </div>
            <div className="empty elements"/>
        </div>
    </div>;
}