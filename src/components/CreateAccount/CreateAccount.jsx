import React, { useState, useContext } from 'react'
import styled from '@emotion/styled';
import AuthContext from '../../context/Auth/authContext';
import { useHistory } from 'react-router-dom';

const FormCreate = styled.form`
    margin-top: 50px !important;
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 0 auto;
    padding: 50px;

    input[type = "text"],
    input[type = "password"],
    input[type = "email"]{
        border-radius: 3px;
        border: none;
        outline: none;
        margin: 10px 0;
        height: 25px;
        padding: 5px;
        background-color: #CCDDEE;
    }
    button{
        background-color:#00b020; 
        height: 35px;
        padding: 5px;
        border: none;
        outline: none;
        border-radius: 5px;
        margin-top: 20px;
        color: white;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: bold;
        
        &:action{
            background-color: #00b020;
        }
    }
`;

const CreateAccount = () => {

    const history = useHistory();

    const [ newuser, setNewUser ] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = newuser;

    const authContext = useContext( AuthContext );
    const { createUser } = authContext;

    const onChange = e => {
        setNewUser({
            ...newuser,
            [e.target.name] : e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log( process.env.REACT_APP_BACKEND_URL );   
        if( username.trim() === '' || email.trim() === '' || password.trim() === '' ){
            console.log( 'Llena todos los datos' );
            return;
        }

        if( password.length < 6 ){
            console.log( 'Min 6 characters for password' );
            return;
        }

        createUser( newuser );

        setNewUser({
            username: '',
            email: '',
            password: ''
        });

        history.push('/');
    
    }

    return ( 
        <div style = {{ height : '74vh' }}>
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