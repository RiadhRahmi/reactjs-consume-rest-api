import React, {Component} from 'react';
import Layout from "./components/layout/Layout";
import {BrowserRouter} from "react-router-dom";
import {ThroughProvider} from 'react-through'

class App extends Component {


    render() {
        return (
            <BrowserRouter>
                <ThroughProvider>
                    <Layout/>
                </ThroughProvider>
            </BrowserRouter>
        );
    }
}

export default App;
