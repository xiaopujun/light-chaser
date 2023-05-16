import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";

export let designerRouter: any = null;

ReactDOM.render(
    <BrowserRouter ref={ref => designerRouter = ref}>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);