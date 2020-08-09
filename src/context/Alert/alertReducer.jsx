import { SHOW_ALERT, HIDE_ALERT } from "../../types";

const AlertReducer = ( state, action ) => {
    switch( action.type ){
        case SHOW_ALERT:
            return {
                ...state,
                showalert: true,
                alert: action.payload
            }
        case HIDE_ALERT:
            return {
                ...state,
                showalert: false,
                alert: null
            }
        default:
            return state;
    }
}

export default AlertReducer;