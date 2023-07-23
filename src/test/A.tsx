import React from "react";

class A extends React.Component<any> {

    state = {
        count: 0
    }

    render() {
        return (
            <div>A组件:{this.state.count}</div>
        )
    }
}

export default A;