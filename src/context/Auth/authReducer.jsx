import { 
    CREATE_USER, 
    GET_USER, 
    SIGN_OUT, 
    LOGIN_USER, 
    GET_REGISTERS, 
    UPDATE_USER,
    POST_REGIST,
    MODIFY_REGIST,
    REMOVE_REGIST,
    GET_COMMENTS,
    POST_COMMENT,
    MODIFY_COMMENT,
    DELETE_COMMENT,
    SET_COMMENT_SELECTED
} from "../../types"

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
                userauth: action.payload.user
            }
        case GET_USER:
            return{
                ...state,
                authenticated: true,
                userauth: action.payload.user
            }
        case GET_REGISTERS:
            return{
                ...state,
                registersauth: action.payload.registers
            }
        case POST_REGIST:
            return{
                ...state,
                registersauth: [ ...state.registersauth, action.payload.register ]
            }
        case MODIFY_REGIST:
            return{
                ...state,
                registersauth: state.registersauth.map( register => {
                    if ( register.id === action.payload.register.id ){
                        return action.payload.register;
                    } else{
                        return register;
                    }
                })
            }
        case REMOVE_REGIST:
            return{
                ...state,
                registersauth: state.registersauth.filter( register => register._id !== action.payload )
            }
        case SET_COMMENT_SELECTED:
            return{
                ...state,
                commentselected: action.payload
            }
        case GET_COMMENTS:
            return{
                ...state,
                comments: action.payload.comments,
            }
        case POST_COMMENT:
            return{
                ...state,
                comments: [ ...state.comments, { comment: action.payload.comment, user : { _id: state.userauth._id, username: state.userauth.username, image: state.userauth.image } } ]
            }
        case MODIFY_COMMENT:
            return{
                ...state,
                comments: state.comments.map( comment => {
                     if( comment.comment._id === action.payload.comment._id ){
                         return { comment: action.payload.comment, user : { _id: state.userauth._id, username: state.userauth.username, image: state.userauth.image } }
                     } else{
                         return comment
                     }
                })
            }
        case DELETE_COMMENT:
            return{
                ...state,
                comments: state.comments.filter( comment => comment.comment._id !== action.payload )
            }
        case SIGN_OUT:
            localStorage.removeItem('token');
            return{
                ...state,
                authenticated: false,
                userauth: null,
                token: null
            }
        default:
            return state
    }
}