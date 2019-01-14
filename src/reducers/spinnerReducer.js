import {
    SHOW_SPINNER,
    HIDE_SPINNER,
} from '../actions/types'

const INITIAL_STATE = {
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_SPINNER:
            return {
                ...state,
                loading: true,
            }
        case HIDE_SPINNER:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
