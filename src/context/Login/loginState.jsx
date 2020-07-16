import React, { useReducer } from 'react';
import LoginContext from './loginContext';
import { LoginReducer } from './loginReducer';
import { SHOW_LOGIN } from '../../types';

const LoginState = props => {
    
    const initialState = {
        login: false,
        click: false
    }
    
    const [ state, dispatch ] = useReducer( LoginReducer, initialState );

    const showLogin = ( bool, click ) => {
        dispatch ({
            type: SHOW_LOGIN,
            payload: { bool, click }
        })
    }
    
    return ( 
        <LoginContext.Provider
            value = {{
                login: state.login,
                click: state.click,
                showLogin
            }}
        >
            { props.children }
        </LoginContext.Provider>

    );
}
 
export default LoginState;