import styled from '@emotion/styled';

export const Title = styled.h2`
text-transform: uppercase;
text-align: center;
font-size: 2rem;
margin: 40px 0;
`;
export const FilmsGenres = styled.div`
display: flex;
`;
export const Films = styled.div`
display: flex;
flex-wrap: wrap;
width: 60%;
justify-content: center;

`;

export const Genres = styled.div`
box-sizing: border-box;
width: 40%;
padding: 0px 60px;
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
`;