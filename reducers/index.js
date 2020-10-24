import {
    AUTH_SUCCESS, AUTH_REQUEST, AUTH_FAILURE,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../actions';

const initialState = {
    loading: false,
    error: '',
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                userID: action.payload.data._id,
            }
        case AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }


        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                userID: null,
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }


        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }


        default:
            return state;
    }
}

export default rootReducer;