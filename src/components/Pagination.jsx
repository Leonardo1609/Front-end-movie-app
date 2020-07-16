import React, { useContext } from 'react'
import ApiContext from '../context/API/apiContext';
import styled from '@emotion/styled';

const Pagination = () => {
  
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
    const apiContext = useContext( ApiContext );
    const{ page, totalpages, changePage } = apiContext;
    
    return (
        <PagesContainer>
            {
            ( page !== 1) ?
            <button onClick = { () => changePage( page - 1 ) }><i className="fas fa-caret-left"></i></button>
            : null
            }
            { page } / { totalpages }
            {
            ( page !== totalpages) ?
            <button onClick = { () => changePage( page + 1 ) }><i className="fas fa-caret-right"></i></button>
            : null
            }
        </PagesContainer>
    );
}
 
export default Pagination;