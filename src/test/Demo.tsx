import './DemoMain.less';
import "@amap/amap-jsapi-types";
import TestStoreA, {storeA} from "./alone-store-demo/TestStoreA.tsx";
import TestStoreB, {storeB} from "./alone-store-demo/TestStoreB.tsx";


export default function Demo() {
    console.log('Demo')
    return (
        <div className="Demo">
            <TestStoreA/>
            <br/>
            <br/>
            <br/>
            <TestStoreB/>
            <br/>
            <br/>
            <button onClick={() => storeA.setCount(storeA.count + 1)}>add A store</button>
            <button onClick={() => storeB.setCount(storeB.count + 1)}>add B store</button>
        </div>
    );
}
