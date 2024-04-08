import './DemoMain.less';
import {Button} from "antd";
import {RangeSlider, Slider} from "../json-schema/ui/slider/Slider.tsx";


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
    const rangeChange = (data: number[]) => {
        console.log(data)
    }
    return (
        <div style={{width: 400}}>
            <Slider defaultValue={23} min={1} max={100}/>
            <RangeSlider onChange={rangeChange} defaultValue={[23, 39]} min={1} max={100}/>
        </div>
    );
}
