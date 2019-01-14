import React from 'react';
import {Switch} from 'react-router-dom';

import asyncComponent from './AsyncComponent'
import NotAuthenticated from "./NotAuthenticated";
import Authorization from "./Authorization";


const Dashboard = asyncComponent(() =>
    import('../components/layout/Dashboard').then(module => module.default)
)

const Articles = asyncComponent(() =>
    import('../components/article/Articles').then(module => module.default)
)


const Page404 = asyncComponent(() =>
    import('../components/errors/Page404').then(module => module.default)
)

const Page403 = asyncComponent(() =>
    import('../components/errors/Page403').then(module => module.default)
)


const ListUser = asyncComponent(() =>
    import('../components/users/ListUser').then(module => module.default)
)

const CreateUser = asyncComponent(() =>
    import('../components/users/CreateUser').then(module => module.default)
)

const Login = asyncComponent(() =>
    import('../components/auth/Login').then(module => module.default)
)

const Register = asyncComponent(() =>
    import('../components/auth/Register').then(module => module.default)
)

const Profil = asyncComponent(() =>
    import('../components/auth/Profil').then(module => module.default)
)

const Datatable = asyncComponent(() =>
    import('../components/datatable/datatable').then(module => module.default)
)



const Router = () => {

    return (
        <Switch>
            <Authorization exact path='/' component={Dashboard}/>
            <Authorization  path='/articles' component={Articles}/>

            <Authorization exact path='/users' component={ListUser} permission="admin"/>
            <Authorization path='/users/add' component={CreateUser} permission="admin"/>

            <NotAuthenticated path="/login" component={Login}/>
            <NotAuthenticated path="/register" component={Register}/>

            <Authorization path="/profil" component={Profil}/>

            <Authorization path="/datatable" component={Datatable}/>

            <Authorization exact path="/page-403" component={Page403}/>
            <Authorization exact path="*" component={Page404}/>
        </Switch>
    );
}

export default Router;
