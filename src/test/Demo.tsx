import './DemoMain.less';
import {useEffect, useRef} from "react";
import {CountUp} from "countup.js";
import {Odometer} from "odometer_countup";

export default function Demo() {

    const countUpRef = useRef(null);
    let countUpAnim: CountUp;

    useEffect(() => {
        countUpAnim = new CountUp(countUpRef.current!, 21548125415, {
            startVal: 0,
            plugin: new Odometer({duration: 1, lastDigitDelay: 0}),
            duration: 1,
            enableScrollSpy: true
        });
        if (!countUpAnim.error) {
            countUpAnim.start();
        } else {
            console.error(countUpAnim.error);
        }
    }, []);

    return (
        <div style={{fontSize: '60px', fontWeight: 700}} ref={countUpRef} onClick={() => {
            countUpAnim.reset();
            countUpAnim.start();
        }}>0
        </div>
    );
}
