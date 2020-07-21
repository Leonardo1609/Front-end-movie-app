import styled from '@emotion/styled';

export const Slider = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax( 150px, 1fr ) );
    grid-template-rows: repeat( auto-fill, minmax( 231px, 1fr ) );
    grid-gap: 30px 5px;
    margin: 10px 0 40px 0;     

    p{
        text-transform: uppercase;
        display:block;
        width: 100%;
        text-align: center;
        font-weight: bold;
        font-size: 1.5rem;
    }
`;

export const SectionHeading = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border-bottom: 1px solid #707070;
    font-size: 13px;
    text-transform: uppercase;
    color: #D8E0E8;

    a{
        text-decoration: none;
        color: #5B89F2;
    }
`;
