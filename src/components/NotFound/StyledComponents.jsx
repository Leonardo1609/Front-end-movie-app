import styled from '@emotion/styled';

export const NotFoundContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background-image: url('https://i.pinimg.com/originals/95/30/d0/9530d0942ac37d684d733cc49b515f5d.jpg');
    background-size: cover;
    background-position: center center;
    section{
        position: absolute;
        top: 20px;
        left: 25px;
        font-size: 1.5rem;
        a{
            font-weight: 700;
            text-decoration: none;
            color: inherit;
            text-transform: uppercase;
            font-size: 2rem;

            &:hover{
                color: white;
            }
        }
    }
`;
