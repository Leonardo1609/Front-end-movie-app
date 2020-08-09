import { NOT_FOUND } from "../../types";

const NotfoundReducer = ( state, action ) => {
    switch( action.type ){
        case NOT_FOUND:
            return{
                notfounditem: action.payload
            }
        default:
            return state;
    }
}

export default NotfoundReducer;