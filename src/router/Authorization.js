import React from 'react';
import {Redirect, Route} from 'react-router-dom';



const Authorization = ({component: Component, permission, ...rest}) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const roles = ['admin', 'editor'];

    return (

        <Route {...rest} render={props => (
            currentUser ? (
                permission ? (
                    roles[currentUser.role] === permission ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{
                            pathname: '/page-403',
                            state: {from: props.location}
                        }}/>
                    )
                ) : (
                    <Component {...props} />
                )

            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    );
}

export default Authorization;
