import './DemoMain.less';
import {useEffect} from "react";


export default function Demo() {
    useEffect(() => {

    }, []);

    return (
        <div style={{width: 500, height: 200}}>
            <div className="text-scroller-container">
                <div className="text-scroller">
                    数据库的发的是开发商的交锋是点击发送的
                </div>
            </div>
        </div>

    );
}
