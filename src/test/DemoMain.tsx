import React from 'react';
import HistoryQueue from "../designer/operate-provider/undo-redo/HistoryQueue";

class MyComponent extends React.Component {

    count: number = 0;

    render() {
        let historyQueue = new HistoryQueue<number>(11);
        return (
            <div>
                <button onClick={() => historyQueue.enqueue(++this.count)}>添加元素</button>
                <button onClick={() => historyQueue.backoff()}>回退</button>
            </div>
        )
    }

}

export default MyComponent;
