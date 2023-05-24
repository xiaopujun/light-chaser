import React, {Component} from 'react';

class Demo extends Component {

    //这是我的react组件,状态管理使用的mobx。 这个组件中包含ABC3个子组件。
    // 这三个组件依赖于同一个store。 store的结构如下；{a:1,b:2,c:3}
    //其中A组件依赖于a。 B组件依赖于b。 C组件依赖于c。现在存在一个问题是。
    // 当我修改store中的a的值时。 A组件会重新渲染。 B和C组件也会重新渲染。
    //正常来讲。 BC组件依赖的并不是a状态，他们渲染是多余的。 不应该渲染。 如何实现在我修改a状态的时候只渲染A组件。
    render() {
        return (
            <>
                {/*<A/>*/}
                {/*<B/>*/}
                {/*<C/>*/}
            </>
        );
    }
}

export default Demo;