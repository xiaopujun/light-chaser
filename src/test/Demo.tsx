import './DemoMain.less';
import {useEffect, useState} from "react";
import {Button} from "antd";


export class TestRef {
    public targetRef: Function | null = null;
}

export const testRef = new TestRef();


export function Demo2() {

    return (
        <div style={{width: 400}}>
            <Button onClick={() => {
                testRef?.targetRef!()
            }}>Click me</Button>
        </div>
    );
}


export default function Demo() {

    const [count, setCount] = useState(1);

    const testFun = () => {
        setCount(count + 1)
        console.log(count)
    }

    useEffect(() => {
        testRef.targetRef = testFun
    }, []);

    return (
        <div style={{width: 400}}>
            <Demo2/>
        </div>
    );
}
