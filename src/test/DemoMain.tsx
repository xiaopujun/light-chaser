import React from 'react';

class MyComponent extends React.Component {

    componentDidMount() {
        document.addEventListener('mousedown', (e) => {
            console.log(e.button);
        });
    }

    render() {
        return <div>hello</div>
    }

}

export default MyComponent;
