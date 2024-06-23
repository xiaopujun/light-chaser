import './DemoMain.less';
import "@amap/amap-jsapi-types";
import Base64Util from "../utils/Base64Util.ts";


export default function Demo() {
    console.time()
    const a = Base64Util.toBase64("select * from user where id = 1;")
    const b = Base64Util.fromBase64(a);
    console.timeEnd()
    return (
        <div>
            <div>转换：{a}</div>
            <div>复原：{b}</div>
        </div>
    );
}
