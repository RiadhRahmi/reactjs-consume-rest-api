import React from 'react';
import {Redirect, Route} from 'react-router-dom';


const NotAuthenticated = ({component: Component, ...rest}) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <Route {...rest} render={props => (
            currentUser ? (
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}
                />

            ) : (
                <Component {...props} />
            )
        )}/>
    );
}

export default NotAuthenticated;
