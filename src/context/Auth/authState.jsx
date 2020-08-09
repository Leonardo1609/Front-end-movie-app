import React, { useReducer, useContext } from 'react'
import AuthContext from './authContext'
import { AuthReducer } from './authReducer'
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { 
    CREATE_USER, 
    GET_USER, 
    SIGN_OUT, 
    LOGIN_USER, 
    GET_REGISTERS, 
    UPDATE_USER,
    POST_REGIST,
    MODIFY_REGIST,
    REMOVE_REGIST,
    GET_COMMENTS,
    POST_COMMENT,
    MODIFY_COMMENT,
    DELETE_COMMENT,
    SET_COMMENT_SELECTED,
    GET_REGIST_AUTH
} from '../../types';
import AlertContext from '../Alert/alertContext';

const AuthState = props => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: false,
        userauth: null,
        registersauth: null,
        comments: [],
        commentselected: null,
        registerselectedauth: null
    }

    const [ state, dispatch ] = useReducer( AuthReducer, initialState );

    const alertContext = useContext( AlertContext );
    const { setAlert } = alertContext;
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
            dispatch({
                type: CREATE_USER,
                payload: result.data
            });

            getUser();

            const alert = {
                classes: 'success',
                message: 'Welcome to Movieapp!'
            };

            setAlert( alert );
            return 'created';
        } catch( error ){
            const alert = {
                classes: 'error',
                message: error.response.data.msg
            };

            setAlert( alert );
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

            const alert = {
                classes: 'success',
                message: 'Login Success!'
            };

            setAlert( alert );
        } catch (error) {
            const alert = {
                classes: 'error',
                message: error.response.data.msg
            }
            setAlert( alert );
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
            const alert = {
                classes: 'success',
                message: 'User updated'
            }
    
            setAlert( alert );
        }catch( error ){
            console.log( error.response );
            const alert = {
                classes: 'error',
                message: error.response.data.msg
            }
    
            setAlert( alert );
        }
    }

    const changePassword = async data => {
        try {
            const result = await clientAxios.post('/api/users/password', data );

            const alert = {
                message: result.data.msg,
                classes: 'success'
            }

            setAlert( alert );

        } catch (error) {
            const alert = {
                message: error.response.data.msg ? error.response.data.msg : error.response.data,
                classes: 'error'
            }

            setAlert( alert );
        }

    }

    const setItemAuth = ( item ) => {
        dispatch({
            type: GET_REGIST_AUTH,
            payload: item
        });
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

    const postRegister = async data => {
        try{
            const result = await clientAxios.post('/api/registers', data);
            dispatch({
                type: POST_REGIST,
                payload: result.data
            });  
        } 
        catch( error ){
            console.log( error.response );
        }
    }

    const modifyRegister = async ( id, data ) => {     
        try{
            const result = await clientAxios.patch(`/api/registers/${ id }`, data);
            dispatch({
                type: MODIFY_REGIST,
                payload: result.data
            }); 
        } catch( error ){
            console.log( error.response );
        }
    }

    const removeRegister = async ( id ) => {
        try{
            await clientAxios.delete(`/api/registers/${ id }`);
            dispatch({
                type: REMOVE_REGIST,
                payload: id
            });
            
            const alert = {
                classes: 'success',
                message: 'Register removed'
            }
    
            setAlert( alert );

        } catch( error ){
            console.log( error.response );
        }
    }

    const setCommentSelected = async ( comment ) => {
        dispatch({
            type: SET_COMMENT_SELECTED,
            payload: comment
        })
    }

    const getComments = async ( id ) => {
        try{
            const result = await clientAxios.get(`/api/comments/register/${ id }`);
            dispatch({
                type: GET_COMMENTS,
                payload: result.data
            })
        } catch ( error ){
            console.log( error.response );
        }
    }

    const postComment = async ( id, text ) => {
        try {
            const result = await clientAxios.post(`/api/comments/register/${ id }`, { text } );
            dispatch({
                type: POST_COMMENT,
                payload: result.data
            })
        } catch ( error ) {
            console.log( error.response );
        }
    }
    
    const modifyComment = async ( id, text ) => {
        try {
            const result = await clientAxios.patch(`/api/comments/${ id }`, { text });
            console.log(result.data);

            dispatch({
                type: MODIFY_COMMENT,
                payload: result.data
            })
        } catch ( error ) {
            console.log( error.response );
        }
    }

    const deleteComment = async ( registId, commentId ) => {
        try {
            await clientAxios.delete(`/api/comments/register/${ registId }/comment/${ commentId }`);
            dispatch({
                type: DELETE_COMMENT,
                payload: commentId
            })

            const alert = {
                classes: 'success',
                message: 'Comment Removed'
            }
    
            setAlert( alert );
        } catch (error) {
            console.log( error.response );
        }
    }

    const signOut = () => {
        
        dispatch({
            type: SIGN_OUT
        });
        
        const alert = {
            classes: 'success',
            message: 'Bye!'
        };

        setAlert( alert );
    }

    return ( 
        <AuthContext.Provider value = {{
            authenticated: state.authenticated,
            userauth: state.userauth,
            registerselectedauth: state.registerselectedauth,
            registersauth: state.registersauth,
            comments: state.comments,
            commentselected: state.commentselected,
            createUser,
            getUser,
            signOut,
            loginUser,
            setItemAuth,
            getRegistersAuth,
            updateUser,
            postRegister,
            modifyRegister,
            removeRegister,
            setCommentSelected,
            getComments,
            postComment,
            modifyComment,
            deleteComment,
            changePassword
        }}>
            { props.children }
        </AuthContext.Provider>
     );
}
 
export default AuthState;