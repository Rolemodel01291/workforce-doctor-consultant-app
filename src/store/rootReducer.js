import { combineReducers } from '@reduxjs/toolkit';
import auth from './reducers/authReducer';
import dashboard from './reducers/dashboardReducer';
import agent from './reducers/agentReducer';
import patient from './reducers/patientReducer';
import doctor from './reducers/doctorReducer';

const createReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        auth,
        dashboard,
        agent,
        patient,
        doctor,
        ...asyncReducers,
    });

    /*
	Reset the redux store when user logged out
	 */
    // if (action.type === 'auth/userLoggedOut') {
    //     state = undefined;
    // }

    return combinedReducer(state, action);
};

export default createReducer;
