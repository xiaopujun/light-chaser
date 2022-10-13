import React, {Component} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import {Route, Switch} from "react-router-dom";
import LCDesigner from "./component/designer";
import Preview from "./component/preview/Preview";
import LightChaserList from "./component/list/LightChaserList";

class App extends Component<any> {
    render() {
        return (
            <Switch>
                <Route path={'/list'} component={LightChaserList}/>
                <Route path={'/designer'} exact={true} component={LCDesigner}/>
                <Route path={'/preview'} component={Preview}/>
            </Switch>
        );
    }
}

export default App;
