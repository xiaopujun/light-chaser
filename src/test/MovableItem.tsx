import React, {Component} from 'react';
import Moveable from "react-moveable";

interface MovableItemProps {
    data?: MovableItemData;
    //可拖拽元素的位置、尺寸等信息，当元素的。相关信息。数据发生变更时。 会触发onChange事件。
    onChange?: (data: MovableItemData) => void;
}

interface MovableItemData {
    width: number;
    height: number;
    position: [number, number];
}

class MovableItem extends Component<MovableItemProps> {

    //可拖拽的目标元素
    target: any;
    data: MovableItemData = {
        width: 192,
        height: 108,
        position: [0, 0]
    }
    state: any = {
        //是否加载完成,用于在目标元素加载完成后再加载挂载Moveable组件
        load: false
    };

    constructor(props: MovableItemProps) {
        super(props);
        const {data} = props;
        if (data) this.data = data;
    }

    onChange = () => {
        const {onChange} = this.props;
        onChange && onChange(this.data);
    }

    componentDidMount() {
        if (this.target)
            this.setState({load: true})
    }


    render() {
        return (
            <>
                <div ref={ref => this.target = ref}
                     style={{
                         width: this.data.width,
                         height: this.data.height,
                         transform: `translate(${this.data.position[0]}px, ${this.data.position[1]}px)`
                     }}>
                    {this.props.children}
                </div>
                {this.state.load && <Moveable
                    target={this.target}
                    draggable={true}
                    resizable={true}
                    snappable={true}
                    dragArea={true}
                    originDraggable={true}
                    originRelative={true}
                    zoom={1}
                    isDisplayGridGuidelines={true}
                    throttleDrag={10}
                    throttleResize={10}
                    onDrag={({target, beforeTranslate}) => {
                        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                        this.data.position[0] = beforeTranslate[0];
                        this.data.position[1] = beforeTranslate[1];
                        this.onChange();
                    }}
                    onResize={({target, width, height, drag}) => {
                        target.style.width = `${width}px`;
                        target.style.height = `${height}px`;
                        target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
                        this.data.width = width;
                        this.data.height = height;
                        this.data.position[0] = drag.beforeTranslate[0];
                        this.data.position[1] = drag.beforeTranslate[1];
                        this.onChange();
                    }}
                />}
            </>
        );
    }
}

export default MovableItem;