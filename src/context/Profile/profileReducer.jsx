import { GET_PUBLIC_USER, GET_REGISTERS_PUBLIC } from "../../types";

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
        default:
            return state
    }
}


export default ProfileReducer;