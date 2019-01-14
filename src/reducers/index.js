import {combineReducers} from 'redux';
import auth from './authReducer';
import article from './articleReducer';
import user from './userReducer';
import alert from './alertReducer';
import spinner from './spinnerReducer';

export default combineReducers({
    auth: auth,
    article: article,
    user: user,
    alert: alert,
    spinner: spinner,
});
