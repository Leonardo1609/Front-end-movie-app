import React, { useState, useContext } from 'react';
import { ModalChangePasswordContainer } from './StyledComponents';
import AlertContext from '../../context/Alert/alertContext';
import AuthContext from '../../context/Auth/authContext';
const ModalChangePassword = () => {

    const [ changepassword, setchangePassword ] = useState({
        password:'',
        newPassword: '',
        confirmPassword: ''
    });

    const { password, newPassword, confirmPassword } = changepassword;

    const alertContext = useContext( AlertContext );
    const { setAlert } = alertContext;

    const authContext = useContext( AuthContext );
    const { changePassword } = authContext;

    const clearState = () => {
        setchangePassword({
            password:'',
            newPassword: '',
            confirmPassword: ''
        });
    }
    
    const onChange = e => {
        setchangePassword({
            ...changepassword,
            [ e.target.name ]: e.target.value
        })
    }
    
    const onSubmit = e => {
        e.preventDefault();
        
        if( password.trim() === '' || newPassword === '' || confirmPassword === '' ){
            const alert ={ 
                message: 'Please, complete inputs',
                classes: 'error'
            }
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
        
        if( newPassword.length < 6 || confirmPassword.length < 6 ){
            const alert ={ 
                message: 'Min. 6 characteres',
                classes: 'error'
            }
            setAlert( alert );
            return;
        }
        

        changePassword({ password, newPassword });
        clearState();
    }

    return ( 
        <div className="modal fade p-0" id="modalPassword" tabIndex="-1" style={{zIndex:"100000"}} role="dialog" aria-labelledby="modalRegisterLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <ModalChangePasswordContainer className="modal-content">
                <div className="modal-body">
                    <div className="row">
                        <div className="col">
                            <div>
                                <span className="d-inline-block mb-3">CHANGE PASSWORD</span>
                                <button onClick = { clearState } type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={ onSubmit }>
                                <label htmlFor="password">Current Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id = "password"
                                    value = { password } 
                                    onChange = { onChange }
                                />
                                <label htmlFor="password">New Password</label>
                                <input 
                                    type="password" 
                                    name="newPassword"
                                    id = "newPassword" 
                                    value = { newPassword } 
                                    onChange = { onChange }
                                />
                                <label htmlFor="confirm-password">Confirm new Password</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword"
                                    id = "confirm-password" 
                                    value = { confirmPassword } 
                                    onChange = { onChange }
                                />
                                <div className="d-flex justify-content-end mt-3">     
                                    <button 
                                        type="button"
                                        className="button cancel"
                                        data-dismiss="modal"
                                        onClick = { clearState }  
                                    >Cancel</button> 
                                    <button 
                                        type="submit"
                                        className="button change ml-3"
                                    ><span>Change</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ModalChangePasswordContainer>
        </div>
    </div>
    );
}
 
export default ModalChangePassword;