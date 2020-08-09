import styled from '@emotion/styled';

export const Name = styled.div`
    display: none;
    max-width: 500px;
    text-overflow: ellipsis;
    white-space: nowrap; 
    position: absolute;
    height:26px;
    top: -35px;
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
        top: 24px;
        right: calc(50% - 10px);
        border-top:   8px solid #456;    
        border-right: 8px solid transparent;
        border-left:  8px solid transparent;
        border-bottom:8px solid transparent;
    }
`;

export const CardContainer = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: #2c3440;
    border-radius: 10px;
    border: 3px solid transparent; 

    &:hover > .name{
        display: block;
    }

    &:hover {
        border: 3px solid #00e054;
    }

    a{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        text-decoration: none;
        width: 100%;
        min-height: 100%;
    
        span{
            max-width: 150px;
            padding: 0 10px;
            overflow: hidden;
        }

        img{
            height: 100%;
            width: 100%;
            color: #fff;
            text-align: center;
            border-radius: 10px;

            span{
                margin-top: 8px;
            }
        }
    }
`;