import { 
    GET_PUBLIC_USER, 
    GET_REGISTERS_PUBLIC, 
    GET_REGIST, 
    RESET_STATE,
    MODIFY_LIKES_REGIST,
    LOADING,
    CHANGE_PAGE
} from "../../types";

const ProfileReducer = ( state, action ) => {
    switch( action.type ){
        case LOADING:
            return{
                ...state,
                loadingregist: action.payload
            }
        case CHANGE_PAGE:
            return {
                ...state,
                pagepublic: action.payload
            }
        case GET_PUBLIC_USER:
            return {
                ...state,
                userpublic: action.payload.user,
            }
        case GET_REGISTERS_PUBLIC:
            return {
                ...state,
                registerspublic: action.payload.registers,
            }
        case GET_REGIST:
            return{
                ...state,
                registselected: action.payload.register,
                loadingregist: false
            }
        case MODIFY_LIKES_REGIST:
            return{
                ...state,
                registerspublic: state.registerspublic.map( register => {
                    if ( register.id === action.payload.register.id ){
                        return action.payload.register;
                    } else{
                        return register;
                    }
                }),
            }
        case RESET_STATE:
            return{
                userpublic: null,
                registerspublic: [],
                lists:null,
                registselected: null,
                loadingregist: true,
                pagepublic: 1
            }
        default:
            return state
    }
}


export default ProfileReducer;