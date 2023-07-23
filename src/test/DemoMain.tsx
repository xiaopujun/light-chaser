import React from 'react';
import ComponentContainer from './DemoContainer';

class MyComponent extends React.Component {

    ref: any = null;



    render() {
        return (
            <div className='pyz-tmd' ref={ref => this.ref = ref} >
                <ComponentContainer />
            </div>
        )
    }

}

export default MyComponent;
