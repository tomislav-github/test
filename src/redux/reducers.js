import { combineReducers } from 'redux';

// user reducer
const userInitialState = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    description: '',
    addModal: false,
    editModal: false,
    deleteModal: false,
};

export const userReducer = (state = userInitialState, { type, payload }) => {
    switch (type) {
        case 'USER':
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};

// login reducer
const loginInitialState = {
    user_name: '',
    password: ''
};

export const loginReducer = (state = loginInitialState, { type, payload }) => {
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};

const allReducers = combineReducers({
    userReducer,
    loginReducer
});

export default allReducers;