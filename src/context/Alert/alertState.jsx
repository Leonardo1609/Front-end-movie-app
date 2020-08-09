import React, { useReducer } from 'react'
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SHOW_ALERT, HIDE_ALERT } from '../../types';

const AlertState = props => {

    const initialState = {
        showalert : false,
        alert: null
    };

    const [ state, dispatch ] = useReducer( AlertReducer, initialState );

    const setAlert = ( alert ) => {

        dispatch({
            type: SHOW_ALERT,
            payload: alert
        });

        setTimeout( () => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 4000 );
    }

    const hideAlert = () => {
        dispatch({
            type: HIDE_ALERT
        })
    }
    return (
        <AlertContext.Provider
            value = {{
                showalert: state.showalert,
                alert: state.alert,
                setAlert,
                hideAlert
            }}
        >
            { props.children }
        </AlertContext.Provider>
    );
}

export default AlertState;