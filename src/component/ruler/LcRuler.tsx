import React, {Component} from 'react';
import Gesto from "gesto";
import Ruler from "@scena/react-ruler";

class LcRuler extends Component {

    ruler1: any;
    ruler2: any;

    componentDidMount() {



    }


    render() {
        return (
            <>
                <div className={'lc-ruler-container'}
                     style={{
                         height: window.innerHeight - 64,
                         position: 'relative',
                         margin: '0',
                         padding: '0',
                         overflow: 'hidden',
                         backgroundColor: '#131e26'
                     }}>
                    <Ruler ref={e => this.ruler1 = e}
                           negativeRuler={true}
                           backgroundColor={'#131e26'}
                           textColor={'#5fccff'}
                           textAlign={"center"}
                           segment={5}
                           mainLineSize={12}
                           shortLineSize={5}
                           longLineSize={4}
                           type="horizontal"
                           style={{
                               position: 'absolute',
                               top: '0',
                               left: '30px',
                               height: '30px',
                               width: 'calc(100% - 30px)'
                           }}
                           font="12px sans-serif"
                           lineWidth={1}
                    />
                    <Ruler ref={e => this.ruler2 = e}
                           negativeRuler={true}
                           backgroundColor={'#131e26'}
                           textColor={'#5fccff'}
                           textAlign={"center"}
                           segment={5}
                           mainLineSize={12}
                           shortLineSize={5}
                           longLineSize={4}
                           type="vertical"
                           style={{
                               position: 'absolute',
                               left: '0',
                               top: '30px',
                               width: '30px',
                               height: 'calc(100% - 30px)'
                           }}
                           font="12px sans-serif"
                           lineWidth={1}
                    />
                    <div style={{top: '30px', left: '30px', position: 'relative'}}>
                        {this.props.children}
                    </div>
                </div>
            </>

        );
    }
}

export default LcRuler;