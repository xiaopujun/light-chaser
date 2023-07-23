import React from "react";
import DemoA from "./DemoA";


class ComponentContainer extends React.Component {

    private ref: any;

    componentDidMount(): void {
        //通过ref创建组件，并将组件实例方法Map中。后续通过Map匹配到具体实例，
        //调用实例的对象方法进行组件的更新操作
        const demoA = new DemoA();
        demoA.create(this.ref).then((instance: any) => {
            console.log('chuang jian hao le ', instance)
        })


    }


    render() {
        return (
            <div ref={(ref) => this.ref = ref}>组件容器</div>
        )
    }
}


export default ComponentContainer;