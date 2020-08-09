import React, { useContext } from 'react'
import styled from '@emotion/styled';
import ProfileContext from '../context/Profile/profileContext';

const PaginationPublic = ({ totalpages }) => {

    const PagesContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        button{
            margin: 0 5px;
            background-color: transparent;
            outline: none;
            border: none;
            color: #D8E0E8;
            cursor: pointer;
        }
    `;

    const profileContext = useContext( ProfileContext );
    const { changePagePublic, pagepublic } = profileContext;

    return (
        <PagesContainer>
            {
            ( pagepublic !== 1) ?
            <button onClick = { () => changePagePublic( pagepublic - 1 ) }><i className="fas fa-caret-left"></i></button>
            : null
            }
            { pagepublic } / { totalpages }
            {
            ( pagepublic !== totalpages) ?
            <button onClick = { () => changePagePublic( pagepublic + 1 ) }><i className="fas fa-caret-right"></i></button>
            : null
            }
        </PagesContainer>
    );
}

export default PaginationPublic;