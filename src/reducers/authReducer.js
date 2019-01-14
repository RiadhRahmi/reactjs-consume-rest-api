import {AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/types';

const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                currentUser: JSON.parse(localStorage.getItem('currentUser'))
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                currentUser: localStorage.removeItem('currentUser')
            }
        default:
            return state;
    }
}
