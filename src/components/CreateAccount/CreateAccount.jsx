import React, { useState, useContext } from 'react'
import AuthContext from '../../context/Auth/authContext';
import { Redirect, useHistory } from 'react-router-dom';
import { FormCreate } from './StyledComponents';
import AlertContext from '../../context/Alert/alertContext';

const CreateAccount = () => {

    const history = useHistory();
    const [ newuser, setNewUser ] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = newuser;

    const authContext = useContext( AuthContext );
    const { authenticated, createUser } = authContext;

    const alertContext = useContext( AlertContext );
    const { setAlert } = alertContext;

    const onChange = e => {
        setNewUser({
            ...newuser,
            [e.target.name] : e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        if( username.trim() === '' || email.trim() === '' || password.trim() === '' ){
            console.log( 'Enter all inputs' );
            const alert = {
                message: 'Enter all inputs',
                classes: 'error'
            }
            setAlert( alert );
            return;
        }

        if( username.trim().length < 6 || username.trim().length > 15 ){
            const alert = {
                message: 'Min 6 characters - Max 15 characters for username',
                classes: 'error'
            }
            setAlert( alert );
            return;
        }

        if( password.trim().length < 6 ){
            const alert = {
                message: 'Min 6 characters for password',
                classes: 'error'
            }
            setAlert( alert );
            return;
        }

        createUser( newuser ).then(
            data => {
                if ( data === 'created' ){
                    history.push('/');
                }
            }
        );
    }

    if ( authenticated ) return <Redirect to= '/' />

    return ( 
        <div style = {{ height : '100vh' }}>
            <FormCreate onSubmit = { onSubmit }>
                <h2>Join MovieApp</h2>
                <label htmlFor = "username">
                    Username
                </label>
                <input 
                    type = "text"
                    name = "username"
                    id = "username"
                    value = { username }
                    onChange = { onChange }
                    required
                    />
                <label htmlFor = "email">
                    Email address
                </label>
                <input 
                    type = "email"
                    name = "email"
                    onChange = { onChange }
                    value = { email }
                    id = "email"
                    required
                />
                <label htmlFor = "pass">
                    Password
                </label>
                <input 
                    type = "password"
                    name = "password"
                    onChange = { onChange }
                    value = { password }
                    id = "pass"
                    required
                />
                <button
                    type = "submit"
                >Sign Up</button>
            </FormCreate>
        </div>
    );
}
 
export default CreateAccount;