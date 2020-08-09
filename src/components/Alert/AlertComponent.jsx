import React, { useContext } from 'react'
import styled from '@emotion/styled';
import AlertContext from '../../context/Alert/alertContext';

const AlertContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    .message{
        display: inline-block;
        padding: 25px 40px;
        font-weight: 700;
        color: white;
    }
    .success{
        background-color: #00b020;
    }
    .error{
        background: #ff8000;
    }
`;


const AlertComponent = () => {

    const alertContext = useContext( AlertContext );
    const { showalert, alert } = alertContext;

    if ( !showalert ) return null;
    return (
        <AlertContainer>
            <span className={`message ${ alert.classes }`}>{ alert.message }</span>
        </AlertContainer>
    );
}

export default AlertComponent;