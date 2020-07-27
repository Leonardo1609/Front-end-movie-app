import { GET_PUBLIC_USER, GET_REGISTERS_PUBLIC, GET_REGIST, RESET_STATE } from "../../types";

const ProfileReducer = ( state, action ) => {
    switch( action.type ){
        case GET_PUBLIC_USER:
            return {
                ...state,
                user: action.payload.user
            }
        case GET_REGISTERS_PUBLIC:
            return {
                ...state,
                registers: action.payload.registers
            }
        case GET_REGIST:
            return{
                ...state,
                registselected: action.payload.register
            }
        case RESET_STATE:
            return{
                user: null,
                registers: [],
                lists:null,
                registselected: null
            }
        default:
            return state
    }
}


export default ProfileReducer;