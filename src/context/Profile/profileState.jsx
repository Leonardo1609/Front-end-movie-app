import React, { useReducer } from 'react'
import ProfileContext from './profileContext';
import clientAxios from '../../config/axios';
import { 
    GET_PUBLIC_USER, 
    GET_REGISTERS_PUBLIC, 
    GET_REGIST,
    RESET_STATE,
    MODIFY_LIKES_REGIST
} from '../../types';
import ProfileReducer from './profileReducer';

const ProfileState = props => {

    const initialState ={
        userpublic: null,
        registerspublic: [],
        listspublic: null,
        registselected: null
    };

    const [ state, dispatch ] = useReducer( ProfileReducer, initialState );

    const getPublicUser = async ( username ) => {
        const result = await clientAxios.get('/api/users', { params : { username } });
        dispatch({
            type: GET_PUBLIC_USER,
            payload: result.data
        })

        return result.data.user;
    }

    const getRegisters = async username => {
        try {            
            const result = await clientAxios.get('/api/registers/public', { params : { username } });
    
            dispatch({
                type: GET_REGISTERS_PUBLIC,
                payload: result.data
            })
        } catch (error) {
            console.log( error );
        }
    } 

    const getRegister = async ( id, userId ) => {
        try {
            const result = await clientAxios(`/api/registers/${ id }`, { params : { userId }});
            dispatch({
                type: GET_REGIST,
                payload: result.data
            });
        } catch (error) {
            console.log( error.response );
        }
    }

    const updateLikes = async ( id ) => {     
        try{
            const result = await clientAxios.patch(`/api/registers/likes/${ id }`);
            dispatch({
                type: MODIFY_LIKES_REGIST,
                payload: result.data
            }); 
        } catch( error ){
            console.log( error.response );
        }
    }

    const cleanState = async () => {
        dispatch({
            type: RESET_STATE
        })
    }
    return ( 
        <ProfileContext.Provider value = {{
            userpublic: state.userpublic,
            registerspublic: state.registerspublic,
            lists: state.lists,
            registselected: state.registselected,
            loading: state.loading,
            getRegister,
            updateLikes,
            getPublicUser,
            getRegisters,
            cleanState
        }}>
            { props.children }
        </ProfileContext.Provider>
    );
}
 
export default ProfileState;