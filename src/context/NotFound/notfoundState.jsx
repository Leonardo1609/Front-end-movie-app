import React, { useReducer } from 'react'
import NotfoundContext from './notfoundContext';
import NotfoundReducer from './notfoundReducer';
import { NOT_FOUND } from '../../types';

const NotFoundState = props => {

    const initialState = {
        notfounditem: false
    }

    const [ state, dispatch ] = useReducer( NotfoundReducer, initialState );

    const setNotFound = ( bool ) => {
        dispatch({
            type: NOT_FOUND,
            payload: bool
        })
    };

    return (
        <NotfoundContext.Provider
            value = {{
                notfounditem: state.notfounditem,
                setNotFound
            }}
        >
            { props.children }
        </NotfoundContext.Provider>
    )
}

export default NotFoundState;