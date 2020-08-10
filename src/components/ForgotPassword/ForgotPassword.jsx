import React, { useState, useContext } from 'react'
import styled from '@emotion/styled';
import AuthContext from '../../context/Auth/authContext';
import AlertContext from '../../context/Alert/alertContext';
import { Redirect } from 'react-router-dom';

const ForgotPasswordContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 73vh;
    margin-top: 60px;
    h3{
        font-size: 1.3rem;
        text-align: center;
        color: white;
        font-weight: 700;
    }

    form{
        width: 300px;
        margin-top: 2rem;

        @media ( min-width: 450px ){
            width: 400px;
        }

        label{
            font-size: 1.1rem;
            margin-bottom: 8px;
        }

        input[ type="email" ]{
            background-color: #CCDDEE;
        }
        button{
            margin-top: 5px;
            width: 100%;
            appearance: none;
            display: inline-block;
            padding: 11px 0;
            line-height: 12px;
            outline: none;
            border: none;
            text-transform: uppercase;
            color: white;
            font-weight: bold;
            font-size: .9rem;
            border-radius: 3px;
            background: #00b020;
        }
    }
`;

const ForgotPassword = () => {
    
    const [ email, setEmail ] = useState('');
    
    const authContext = useContext( AuthContext );
    const { authenticated, sendEmailToResetPassword } = authContext;

    const alertContext = useContext( AlertContext );
    const { setAlert } = alertContext;


    const onChange = e => {
        setEmail( e.target.value );
    }

    const onSubmit = e => {
        e.preventDefault();

        if( email.trim() === ''){
            const alert = {
                message: 'Enter a valid email',
                classes: 'error'
            };
            setAlert( alert );
            return;
        }

        sendEmailToResetPassword( email );
    }

    if( authenticated ) return <Redirect to="/" />
    return ( 
        <ForgotPasswordContainer className="container">
            <h3>Put your email to restore your password</h3>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        className="form-control" 
                        type="email" 
                        name="email" 
                        id="email"
                        onChange={ onChange }
                    />
                </div>
                <div className="form-group">
                    <button type="submit">SEND</button>
                </div>
            </form>
        </ForgotPasswordContainer>
    );
}
 
export default ForgotPassword;