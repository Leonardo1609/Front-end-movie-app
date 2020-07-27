import React, { useContext } from 'react'
import LoginContext from '../../context/Login/loginContext';
import { SignInToRate } from './StyledComponents';

const NoAuthenticatedLog = () => {

    const loginContext = useContext( LoginContext );
    const { showLogin } = loginContext;
    
    return ( 
        <SignInToRate>
            <button 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
                onClick = { () => showLogin( true, true )}
            >Sign in to log, rate or review</button>
        </SignInToRate>
    );
}
 
export default NoAuthenticatedLog;