import {observer} from "mobx-react";
import {AloneStore} from "./AloneStore.ts";

const storeA = new AloneStore();
export {storeA};

const TestStoreA = () => {
    console.log('TestStoreA')
    return (
        <div>
            <h1>TestStoreA</h1>
            <p>count{storeA.count}</p>
        </div>
    );
}

export default observer(TestStoreA);