import React, { useState, useContext } from 'react'
import styled from '@emotion/styled';
import AuthContext from '../../context/Auth/authContext';
import AlertContext from '../../context/Alert/alertContext';
import { Redirect, history, useHistory } from 'react-router-dom';

const ResetPasswordContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 73vh;
    margin-top: 60px;
    h3{
        font-size: 1.6rem;
        text-align: center;
        color: white;
        font-weight: 700;
    }

    form{
        width: 300px;
        margin-top: 1rem;

        @media ( min-width: 450px ){
            width: 400px;
        }

        label{
            font-size: 1.1rem;
            margin: 20px 0 5px 0;
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
const ResetPassword = ({ match }) => {

    const [ resetpassword, setResetPassword ] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    
    const { newPassword, confirmPassword } = resetpassword;

    const authContext = useContext( AuthContext );
    const { authenticated, resetPassword } = authContext;

    const alertContext = useContext( AlertContext );
    const { setAlert } = alertContext;

    const history = useHistory();
    
    const onChange = e => {
        setResetPassword({
            ...resetpassword,
            [ e.target.name ] : e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        if( newPassword.trim() === '' || confirmPassword.trim() === '' ){
            const alert = {
                message: 'Please, complete inputs',
                classes: 'error'
            };
            setAlert( alert );
            return;
        }
        
        if( newPassword.trim().length < 6 ){
            const alert = {
                message: 'Min. 6 characters',
                classes: 'error'
            };
            setAlert( alert );
            return;
        }

        if( newPassword.trim() !== confirmPassword.trim() ){
            const alert ={ 
                message: 'The passwords you entered were not identical. Please try again.',
                classes: 'error'
            }
            setAlert( alert );
            return;
        }

        resetPassword( newPassword, match.params.token ).then(
            resp => {
                if( resp === 'updated' ){
                    history.push('/');
                }
            }
        );
    }

    if ( authenticated ) return <Redirect to='/' />

    return ( 
        <ResetPasswordContainer className="container">
            <h3>Reset Password</h3>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                        className="form-control" 
                        type="password" 
                        name="newPassword" 
                        id="newPassword"
                        onChange={ onChange }
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        className="form-control" 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword"
                        onChange={ onChange }
                    />
                </div>
                <div className="form-group">
                    <button type="submit">SEND</button>
                </div>
            </form>
        </ResetPasswordContainer>
    );
}
 
export default ResetPassword;