import React, {Component} from 'react';
import Gesto from "gesto";
import Ruler from "./RulerResource";

class DemoRuler extends Component {
    rulerX: any = null;

    state = {
        scale: 1
    }

    componentDidMount() {
        document.addEventListener('wheel', (e: any) => {
            let {scale} = this.state;
            if (e.deltaY > 0)
                scale = Number((scale + 0.1).toFixed(1));
            else
                scale = Number((scale - 0.1).toFixed(1));
            this.setState({scale})
        });


        const body: any = document.getElementsByTagName('body')[0];
        let scrollX = 0;
        new Gesto(body).on("drag", e => {
            let {scale} = this.state;
            scrollX -= e.deltaX;
            console.log("scrollX", scrollX)
            this.rulerX.scroll(scrollX / scale);
        });
    }

    render() {
        return (
            <div>
                <Ruler ref={e => this.rulerX = e}
                       negativeRuler={true}
                       backgroundColor={'#131e26'}
                       textColor={'#5fccff'}
                       zoom={this.state.scale}
                       type="horizontal"
                       style={{
                           position: 'absolute',
                           top: '0',
                           height: '30px',
                           width: '1500px'
                       }}
                />
            </div>
        );
    }
}

export default DemoRuler;