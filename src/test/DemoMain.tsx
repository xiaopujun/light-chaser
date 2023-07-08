import React from 'react';

class MyComponent extends React.Component {

    fakeRef: any = null;

    componentDidMount() {
        this.fakeRef.addEventListener('pointerdown', (e: any) => {
            console.log('pointerdown');
            this.fakeRef.addEventListener('pointermove', this.move);
        });
        this.fakeRef.addEventListener('pointerup', (e: any) => {
            console.log('pointerup');
            this.fakeRef.removeEventListener('pointermove', this.move);
        });
    }

    move = () => {
        console.log('move');
    }

    render() {

        return (
            <div className={'container'}>
                <div className={'A'}>
                    <div className={'A1'}></div>
                    <div className={'A2'}></div>
                    <div className={'A3'}></div>
                </div>
                <div className={'B'}></div>
            </div>
        )
    }

}

export default MyComponent;
