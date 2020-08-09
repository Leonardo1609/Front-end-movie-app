import React, { useReducer, useContext } from 'react'
import ProfileContext from './profileContext';
import clientAxios from '../../config/axios';
import { 
    GET_PUBLIC_USER, 
    GET_REGISTERS_PUBLIC, 
    GET_REGIST,
    RESET_STATE,
    MODIFY_LIKES_REGIST,
    LOADING,
    CHANGE_PAGE
} from '../../types';
import ProfileReducer from './profileReducer';
import NotfoundContext from '../NotFound/notfoundContext';

const ProfileState = props => {

    const initialState ={
        userpublic: null,
        registerspublic: [],
        listspublic: null,
        registselected: null,
        loadingregist: true,
        pagepublic: 1
    };

    const [ state, dispatch ] = useReducer( ProfileReducer, initialState );

    const notfoundContext = useContext( NotfoundContext );
    const { setNotFound } = notfoundContext; 

    const changePagePublic = ( num ) => {
        dispatch({
            type: CHANGE_PAGE,
            payload: num
        })
    }

    const setLoading = ( bool ) =>{
        dispatch({
            type: LOADING,
            payload: bool
        })
    } 
    const getPublicUser = async ( username ) => {
        try {
            const result = await clientAxios.get('/api/users', { params : { username } });
            dispatch({
                type: GET_PUBLIC_USER,
                payload: result.data
            })
            return result.data.user;
        } catch (error) {
            setNotFound( true );
        }
    }

    const getRegisters = async username => {
        try {            
            const result = await clientAxios.get('/api/registers/public', { params : { username } });
    
            dispatch({
                type: GET_REGISTERS_PUBLIC,
                payload: result.data
            })
        } catch (error) {
            setNotFound( true );
        }
    } 

    const getRegister = async ( id, type, userId ) => {
        try {
            const result = await clientAxios(`/api/registers/${ id }/${ type }`, { params : { userId }});
            dispatch({
                type: GET_REGIST,
                payload: result.data
            });
            return result.data.register;
        } catch (error) {
            setLoading( false );
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
            loadingregist: state.loadingregist,
            pagepublic: state.pagepublic,
            setLoading,
            getRegister,
            updateLikes,
            getPublicUser,
            getRegisters,
            cleanState,
            changePagePublic
        }}>
            { props.children }
        </ProfileContext.Provider>
    );
}
 
export default ProfileState;