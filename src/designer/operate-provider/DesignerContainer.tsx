import {Component} from 'react';

class DesignerContainer extends Component {

    render() {
        return (
            <div style={{outline: 'none'}} className={'lc-event-container'}>
                {this.props.children}
            </div>
        );
    }
}

export default DesignerContainer;