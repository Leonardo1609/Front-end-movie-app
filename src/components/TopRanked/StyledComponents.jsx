import styled from '@emotion/styled';

export const Title = styled.h2`
    text-transform: uppercase;
    text-align: center;
    font-size: 2rem;
    margin: 40px 0;
`;
export const FilmsGenres = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
`;
export const Films = styled.div`
    grid-column: 1/2;
`;

export const Genres = styled.div`
    box-sizing: border-box;
    grid-column: 2/3;
    padding-left: 1rem;
    @media ( min-width : 768px ){
        padding: 0px 60px;
    }
    div{
        position: sticky;
        top: 20px;

        h2{
            margin:0;       
        }

        ul{
            list-style: none;
            padding-left: 0;
            line-height: 25px;
            li{

                a{
                    text-decoration: none;
                    color: inherit;
                    &:hover{
                        color: #00e054;
                    }
                }

                .active{
                    color: #00e054;
                }
            }
        }
    }
`;