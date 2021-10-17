import { USERS } from '../shared/users';
import * as ActionTypes from './ActionTypes';

export const UsersReducer = (state = USERS, action) => {
    console.log("old state: ", state)
    switch (action.type) {
        case ActionTypes.ADD_USER:   // addUser(email, password)
            const newUser = action.payload; 
            newUser.id = state.length;
            newUser.dateJoined = new Date().toISOString();
            console.log("new state: ", [...state, newUser]);
            return [...state, newUser];
        default:
            return state;
    }
};