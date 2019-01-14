import {AUTH_SUCCESS, AUTH_LOGOUT, SHOW_SPINNER, HIDE_SPINNER} from './types'
import {AuthService} from "../services/authService"
import {showErrorAlert} from "./AlertActions";

/**
 * Login method
 */
export const login = (user, ownProps) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        AuthService.login(user).then(response => {
            if (response.status === 200) {
                localStorage.setItem('currentUser', JSON.stringify(response.data))
                dispatch({type: HIDE_SPINNER})
                dispatch({type: AUTH_SUCCESS})
                ownProps.history.push('/')
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * register method
 */
export const register = (user, ownProps) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        AuthService.register(user).then(response => {
            if (response.status === 201) {
                localStorage.setItem('currentUser', JSON.stringify(response.data))
                dispatch({type: HIDE_SPINNER})
                dispatch({type: AUTH_SUCCESS})
                ownProps.history.push('/')

            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}


/**
 * logout user
 */

export const logout = (ownProps) => {
    return (dispatch) => {

        // dispatch({type: SHOW_SPINNER})

        dispatch({type: AUTH_LOGOUT})
        ownProps.history.push('/login')

        /*AuthService.logout().then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                dispatch({type: AUTH_LOGOUT})
                ownProps.history.push('/login')
            } else {
                dispatch({type: HIDE_SPINNER})
                dispatch({
                    type: SHOW_ALERT,
                    alert: {
                        showAlert: true,
                        colorAlert: 'danger',
                        messageAlert: 'failed operation',
                    }
                })
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            dispatch({
                type: SHOW_ALERT,
                alert: {
                    showAlert: true,
                    colorAlert: 'danger',
                    messageAlert: 'failed operation' + error.toString()
                }
            })
        })*/
    }
}
