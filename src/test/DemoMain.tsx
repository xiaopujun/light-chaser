import React from 'react';

class MyComponent extends React.Component {

    fakeRef: any = null;


    move = () => {
        console.log('move');
    }

    render() {

        return (
            <div className={'container'}
                 style={{
                     width: 800,
                     height: 800,
                     backgroundColor: '#00697d',
                     overflowY: 'hidden',
                     position: 'relative'
                 }}>
                <div style={{width: 500, height: 1000, backgroundColor: '#993200', position: 'absolute'}}/>
            </div>
        )
    }

}

export default MyComponent;
