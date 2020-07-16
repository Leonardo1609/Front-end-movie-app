import { CREATE_USER, GET_USER, SIGN_OUT, LOGIN_USER, GET_REGISTERS, UPDATE_USER} from "../../types"

export const AuthReducer = (state , action) => {
    switch ( action.type ) {
        case LOGIN_USER:
        case CREATE_USER:
            localStorage.setItem( 'token', action.payload.token );
            return {
                ...state,
                token: action.payload.token,
                authenticated: true,
            }
        case UPDATE_USER:
            return{
                ...state,
                user: action.payload.user
            }
        case GET_USER:
            return{
                ...state,
                authenticated: true,
                user: action.payload.user
            }
        case GET_REGISTERS:
            return{
                ...state,
                registers: action.payload.registers
            }
        case SIGN_OUT:
            localStorage.removeItem('token');
            return{
                ...state,
                authenticated: false,
                user: null,
                token: null
            }
        default:
            return state
    }
}