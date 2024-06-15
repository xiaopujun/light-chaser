import {observer} from "mobx-react";
import {AloneStore} from "./AloneStore.ts";

const storeB = new AloneStore();
export {storeB};

const TestStoreB = () => {
    console.log('TestStoreB')
    return (
        <div>
            <h1>TestStoreB</h1>
            <p>count{storeB.count}</p>
        </div>
    );
}

export default observer(TestStoreB);