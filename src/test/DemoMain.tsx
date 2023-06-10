import React, {Component} from 'react';

const MENU_TYPE = 'SIMPLE';

export default class SimpleMenu extends Component<any, any> {

    state: any = {
        logs: []
    }


    constructor(props: any) {
        super(props);

        this.state = {logs: []};
    }

    handleClick = (e: any, data: any) => {
        const {logs} = this.state;
        this.setState(() => ({
            logs: [`Clicked on menu ${data.item}`, ...logs]
        }));
    }

    render() {
        const {logs} = this.state;
        return (
            <div>

            </div>
        );
    }
}