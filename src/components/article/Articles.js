import React, {Component} from 'react';
import {Switch, withRouter} from 'react-router-dom';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'
import Authorization from "../../router/Authorization";
import CreateArticle from "./CreateArticle";
import EditArticle from "./EditArticle";
import ShowArticle from "./ShowArticle";
import ListArticle from "./ListArticle";

class Articles extends Component {

    render() {
        return (
            <div>
                <BreadcrumbsItem to='/articles'>List Articles</BreadcrumbsItem>
                <Switch>
                    <Authorization exact path='/articles' component={ListArticle}/>
                    <Authorization path="/articles/add" component={CreateArticle}/>
                    <Authorization path='/articles/:id/edit' component={EditArticle}/>
                    <Authorization path='/articles/:id/show' component={ShowArticle}/>
                </Switch>
            </div>
        );
    }


}

export default withRouter(Articles);
