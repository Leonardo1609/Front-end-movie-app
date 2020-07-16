import styled from '@emotion/styled';

export const Name = styled.div`
    display: none;
    max-width: 500px;
    text-overflow: ellipsis;
    white-space: nowrap; 
    position: absolute;
    height:12px;
    top: -33px;
    text-align: center;
    font-size: .7rem;
    background-color: #456;
    border-radius: 4px;
    padding: 5px 10px;
    z-index: 1000;
    &::after{
        z-index: 2000;
        content:'';
        position: absolute;
        display: block;
        top: 22px;
        right: calc(50% - 10px);
        border-top:   8px solid #456;    
        border-right: 8px solid transparent;
        border-left:  8px solid transparent;
        border-bottom:8px solid transparent;
    }
`;