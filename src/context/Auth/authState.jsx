import React, { useReducer } from 'react'
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
    SET_COMMENT_SELECTED
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: false,
        userauth: null,
        registersauth: null,
        comments: [],
        commentselected: null
    }

    const [ state, dispatch ] = useReducer( AuthReducer, initialState );

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

    const postRegister = async data => {
        try{
            const result = await clientAxios.post('/api/registers', data);
            dispatch({
                type: POST_REGIST,
                payload: result.data
            });        
        } 
        catch( error ){
            console.log( error.response )
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
            userauth: state.userauth,
            registersauth: state.registersauth,
            comments: state.comments,
            commentselected: state.commentselected,
            createUser,
            getUser,
            signOut,
            loginUser,
            getRegistersAuth,
            updateUser,
            postRegister,
            modifyRegister,
            removeRegister,
            setCommentSelected,
            getComments,
            postComment,
            modifyComment,
            deleteComment
        }}>
            { props.children }
        </AuthContext.Provider>
     );
}
 
export default AuthState;