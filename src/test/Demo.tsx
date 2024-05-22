import './DemoMain.less';
import "@amap/amap-jsapi-types";
import {useEffect, useState} from "react";


const A = () => {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('timer')
        }, 1000)
        return () => {
            console.log('clear')
            clearInterval(timer)
        }
    }, []);
    return (
        <div>
            <h1>A</h1>
        </div>
    );
}


const compMap: Record<number, any> = {
    1: A,
}

const Container = ({id}: any) => {
    const Comp = compMap[id];
    if (!Comp)
        return null
    return (
        <div>
            <Comp/>
        </div>
    );
}

export default function Demo() {
    const [list, setList] = useState([1]);
    return (
        <div>
            {
                list.map((item, index) => {
                    return <Container key={index} id={item}/>
                })
            }
            <button onClick={() => {
                setList([])
            }}>Toggle
            </button>
        </div>
    );
}
