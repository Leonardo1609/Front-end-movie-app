import React, { useReducer } from 'react'
import AuthContext from './authContext'
import { AuthReducer } from './authReducer'
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { CREATE_USER, GET_USER, SIGN_OUT, LOGIN_USER, GET_REGISTERS, UPDATE_USER } from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: false,
        user: null,
        registers: null,
    }

    const [ state, dispatch ] = useReducer( AuthReducer, initialState )

    const getUser = async () => {
        const token = localStorage.getItem('token');

        if( token ){
            tokenAuth( token );
        }

        try{
            const result = await clientAxios.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: result.data
            })
        } catch( error ){
            console.log( error.response );
        }
    }


    const createUser = async data => {
        try {
            const result = await clientAxios.post('/api/users', data);
            console.log( result );
            dispatch({
                type: CREATE_USER,
                payload: result.data
            });

            getUser();
            getRegistersAuth();

        } catch( error ){
            console.log( error.response );
        }
    }
    
    const loginUser = async data => {
        try {
            const result = await clientAxios.post('/api/auth', data);
            dispatch({
                type: LOGIN_USER,
                payload: result.data
            });

            getUser();
            getRegistersAuth();

        } catch (error) {
            console.log( error.response );
        }
    }

    const updateUser = async ( data, image = null ) => {
        try{
            let result;
            if( image ){
                const imagePromise = clientAxios.post('/api/users/avatar-image', image,  {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                });
                const dataPromise = clientAxios.post('/api/users/edit-user', data );
                                             // ambos regresan al usuario, pero el segundo lo regresa sin imagen
                result = await Promise.all([ imagePromise, dataPromise ]);
                dispatch({
                    type: UPDATE_USER,
                    payload: result[0].data
                })

            }
            else{
                result = await clientAxios.post('/api/users/edit-user', data );
                dispatch({
                    type: UPDATE_USER,
                    payload: result.data
                })
            }
        }catch( error ){
            console.log( error.response );
        }
    }

    const getRegistersAuth = async () =>{
        try {
            const result = await clientAxios.get('/api/registers');

            dispatch({
                type: GET_REGISTERS,
                payload: result.data
            })
        } catch (error) {
            console.log( error.response );
        }
    } 

    const signOut = () => {
        dispatch({
            type: SIGN_OUT
        });
    }

    return ( 
        <AuthContext.Provider value = {{
            authenticated: state.authenticated,
            user: state.user,
            registers: state.registers,
            createUser,
            getUser,
            signOut,
            loginUser,
            getRegistersAuth,
            updateUser
        }}>
            { props.children }
        </AuthContext.Provider>
     );
}
 
export default AuthState;