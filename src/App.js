import React, {Component} from 'react';
import {BrowserRouter ,Route} from 'react-router-dom';


import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/layout/Dashboard";
import ListArticle from "./components/article/ListArticle";
import CreateArticle from "./components/article/CreateArticle";
import Page404 from "./components/errors/Page404";
import EditArticle from "./components/article/EditArticle";
import ShowArticle from "./components/article/ShowArticle";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <div className="container">
                        <Route exact path='/' component={Dashboard}/>
                        <Route exact path='/articles' component={ListArticle}/>
                        <Route path='/articles/add' component={CreateArticle}/>
                        <Route path='/articles/:id/edit' component={EditArticle}/>
                        <Route path='/articles/:id/show' component={ShowArticle}/>
                        <Route path="/page-404" component={Page404} />

                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
