import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import TestRuler from "./test/TestRuler";


ReactDOM.render(
    <BrowserRouter>
        {/*<App/>*/}
        <TestRuler/>
    </BrowserRouter>,
    document.getElementById('root')
);