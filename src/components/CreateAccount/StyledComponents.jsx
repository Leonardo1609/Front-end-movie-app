import styled from '@emotion/styled';

export const FormCreate = styled.form`
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