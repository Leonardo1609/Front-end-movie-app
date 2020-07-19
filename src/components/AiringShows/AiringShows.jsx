import React, { useEffect, useContext } from 'react'
import ApiContext from '../../context/API/apiContext';
import styled from '@emotion/styled';
import Card from '../CardItem/Card';
import Pagination from '../Pagination';
import Loading from '../Loading/Loading';

const Title = styled.h2`
    text-transform: uppercase;
    text-align: center;
    font-size: 2rem;
    margin: 40px 0;
`;

const Films = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &::after {
        content: "";
        flex: auto;
    }

`;

const AiringShows = () => {
    const apiContext = useContext( ApiContext );
    const{ page, shows, loading, 
           getShowsInAiring, clean, setLoading } = apiContext;

    const margin = {
        margin: "0 12px"
    }

    useEffect( () => {
        setLoading( true );
        getShowsInAiring( page );
        
        return () => clean();
        // eslint-disable-next-line
    },[ page ] ) 
    
    return (
        <div className = "container" >
            <Title>TV Shows on Air</Title>

            <Films>
                { loading ? <Loading /> :
                 ( shows.length > 0 )
                    ? 

                    shows.map( show => (
                        <div
                            style = { margin }
                            key = { show.id }
                        >
                            <Card
                                item = { show }
                            />
                        </div>
                    ))
                    
                    : 
                    <p>No se encontraron elementos</p>
                }
            </Films>
            <Pagination />
        </div>
    );
}
 
export default AiringShows;