import {
    HIDE_SPINNER,
    DELETE_USER,
    GET_USERS,
    SHOW_SPINNER,
    UPDATE_USER
} from './types'
import UserService from "../services/userService";
import {showSuccessAlert, showErrorAlert} from "./AlertActions";


/**
 * Add USER method
 */
export const addUser = (user, ownProps) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})
        UserService.post(user).then(response => {
            if (response.status === 201) {
                dispatch({type: HIDE_SPINNER})
                ownProps.history.push('/users')
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
 * update user
 */
export const updateUser = (id, user, ownProps) => {
    return (dispatch) => {
        UserService.update(id, user).then(response => {
            // window.location.reload(true)

            let users = []
            ownProps.users.forEach(us => {
                if (us.id === id) {
                    us.email = user.email
                    us.role = user.role
                    us.password = user.password
                    us.name = user.name
                }
                users.push(us)
            })

            dispatch({
                type: GET_USERS,
                users: users
            })

            dispatch({type: UPDATE_USER})
        }, error => {
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}


/**
 * delete USER
 */

export const deleteUsers = (usersIds, ownProps) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        UserService.deleteUsers(usersIds).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                dispatch({type: DELETE_USER})
                showSuccessAlert(dispatch, 'operation with success')
                ownProps.getUsers();

            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())

        });
    }
}


/**
 * fetch USERs
 */

export const getUsers = () => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        UserService.get().then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                dispatch({
                    type: GET_USERS,
                    users: response.data,
                })

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


