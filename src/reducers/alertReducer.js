import {
    SHOW_ALERT,
} from '../actions/types'

const INITIAL_STATE = {
    alert: {
        showAlert: false,
        colorAlert: 'success',
        messageAlert: 'operation with success'
    }

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                alert: action.alert,
            }
        default:
            return state;
    }
}
