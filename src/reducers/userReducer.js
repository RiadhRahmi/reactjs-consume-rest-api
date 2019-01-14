import {
    DELETE_USER,
    GET_USERS,
    UPDATE_USER
} from '../actions/types'

const INITIAL_STATE = {
    users: {},
    deleted: false,
    updatedUser: false,

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {


        case UPDATE_USER:
            return {
                ...state,
                updatedUser: true
            }
        case DELETE_USER:
            return {
                ...state,
                deleted: true
            }


        case GET_USERS:
            return {
                ...state,
                users: action.users

            }
        default:
            return state;
    }
}
