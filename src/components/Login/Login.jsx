import React, { useState, useContext } from 'react'
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import './Login.css';
import LoginContext from '../../context/Login/loginContext';
import AuthContext from '../../context/Auth/authContext';

const FormLogin = styled.form`
    position: absolute;
    display: flex; 
    background-color: rgba(20, 24, 28, 0.9);
    z-index: 1000;
    padding: 10px 35px 10px 20px;
    height: 56px;
    top: 0;
    
    .close{
        border: none;
        outline: none;
        color: #ccc;
        background-color: transparent;
        margin-right: 15px;
        margin-top: 16px;
        cursor: pointer;

        &:hover{
          color: white;  
        }
    }
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-right: 20px;
        align-items: start;

        label{
            font-size: .8rem;
            text-align: left;
            margin-bottom: 3px;
        }
        input[ type = "email"]{
            font-size: .9rem;
            width: 170px;
            height: 18px;
            padding: 5px 7px;
            border-radius: 5px;
            border:none;
            outline: none;
        }

        input[ type = "password"]
        {
            font-size: .9rem;
            width: 134px;
            height: 18px;
            padding: 5px 7px;
            border-radius: 5px;
            border:none;
            outline: none;
        }

        button{
            margin-top: 16px;
            width: 80px;
            height: 28px;
            padding: 5px 7px;            
            border-radius: 5px;
            background-color:#00b020; 
            border: none;
            outline: none;
            color: white; 
            font-weight: bold;
            font-size: .9rem;
            cursor: pointer;
        }
    }
`;

const Login = () => {

    const history = useHistory();

    const [ userin , setUserin ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = userin; 
    const loginContext = useContext( LoginContext );
    const { login, click, showLogin } = loginContext;

    const authContext = useContext( AuthContext );
    const { loginUser } = authContext;

    const onChange = e => {
        setUserin({
            ...userin,
            [ e.target.name ] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if( email.trim() === '' || password.trim() === '' ){
            console.log( 'Credenciales incompletas' );
            return;
        }

        loginUser( userin );

        setUserin({
            email: '',
            password: ''
        });

        showLogin( false, true );
        history.push('/');
    }

    return ( 
    <FormLogin 
        className = { click ? ( login ? 'show' : 'hide' ) : 'noshow' } 
        onSubmit = { onSubmit }
        method = "POST"
    >
        <button type = "button" className = "close" onClick = { () => showLogin(false, true) }>
            <i className="fas fa-times"></i>
        </button>
        <div>
            <label htmlFor = "user">
                User
            </label>
            <input 
                type="email" 
                name="email"
                value = { email } 
                onChange = { onChange }
                id="user"
                />
        </div>
        <div>
            <label htmlFor = "password">
                Password
            </label>
            <input 
                type="password" 
                name="password" 
                value = { password } 
                onChange = { onChange }
                id="password"
             />
        </div>
        <div>
            <button type = "submit" >SIGN IN</button>
        </div>
    </FormLogin>
    
    );
}
 
export default Login;