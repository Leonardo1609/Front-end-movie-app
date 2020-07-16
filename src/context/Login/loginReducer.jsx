import { SHOW_LOGIN } from "../../types"

export const LoginReducer = (state , action) => {
    switch (action.type) {
        case SHOW_LOGIN:
            return {
                ...state,
                login: action.payload.bool,
                click: action.payload.click
            }
        default:
            return state
    }
}