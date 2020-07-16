import React, { useReducer, useContext } from 'react'
import ProfileContext from './profileContext';
import clientAxios from '../../config/axios';
import { GET_PUBLIC_USER, GET_REGISTERS_PUBLIC } from '../../types';
import ProfileReducer from './profileReducer';
import AuthContext from '../Auth/authContext';

const ProfileState = props => {

    const authContext = useContext( AuthContext );
    const { getRegistersAuth } = authContext;

    const initialState ={
        user: null,
        registers: [],
        lists: null    
    };

    const [ state, dispatch ] = useReducer( ProfileReducer, initialState );

    const getPublicUser = async (username) => {
        const result = await clientAxios.get('/api/users', { params : { username } });

        dispatch({
            type: GET_PUBLIC_USER,
            payload: result.data
        })
    }

    const getRegisters = async username => {
        const result = await clientAxios.get('/api/registers/public', { params : { username } });

        dispatch({
            type: GET_REGISTERS_PUBLIC,
            payload: result.data
        })
    } 

    const postRegister = async data => {
        try{
            await clientAxios.post('/api/registers', data);
            getRegistersAuth();
        } catch( error ){
            console.log( error.response )
        }
    }
    const modifyRegister = async ( id, data ) => {     
        try{
            await clientAxios.patch(`/api/registers/${ id }`, data);
            getRegistersAuth();
        } catch( error ){
            console.log( error.response );
        }
    }

    const removeRegister = async ( id ) => {
        try{
            await clientAxios.delete(`/api/registers/${ id }`);
            console.log( 'removed' );
            getRegistersAuth();
        } catch( error ){
            console.log( error.response );
        }
    }

    return ( 
        <ProfileContext.Provider value = {{
            user: state.user,
            registers: state.registers,
            lists: state.lists,
            getPublicUser,
            getRegisters,
            postRegister,
            modifyRegister,
            removeRegister
        }}>
            { props.children }
        </ProfileContext.Provider>
    );
}
 
export default ProfileState;