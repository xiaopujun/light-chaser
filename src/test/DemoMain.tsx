import React, {Component} from 'react';


export default class SimpleMenu extends Component<any, any> {

    ref: any = null;

    componentDidMount() {
        if (this.ref) {
            this.ref.addEventListener('keydown', () => {
            });
            this.ref.addEventListener('click', () => {
            });
        }
    }

    render() {

        return (
            <div tabIndex={0} ref={dom => this.ref = dom}
                 style={{width: 900, height: 900, backgroundColor: '#24726a'}}>
                <div style={{width: 500, height: 500, backgroundColor: '#724f24'}}/>
            </div>
        );
    }
}