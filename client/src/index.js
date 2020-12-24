import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from 'react-router-dom'; 
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import App from "./App";

ReactDOM.render(
    <ScopedCssBaseline>
        <HashRouter>
            <App />
        </HashRouter>
    </ScopedCssBaseline>
, document.getElementById("root"));
