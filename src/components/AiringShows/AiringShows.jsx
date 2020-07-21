import React, { useEffect, useContext } from 'react'
import ApiContext from '../../context/API/apiContext';
import styled from '@emotion/styled';
// import Card from '../CardItem/Card';
import Pagination from '../Pagination';
import Loading from '../Loading/Loading';
import SliderItems from './../SliderItems/SliderItems';

const Title = styled.h2`
    text-transform: uppercase;
    text-align: center;
    font-size: 2rem;
    margin: 40px 0;
`;

const AiringShows = () => {
    const apiContext = useContext( ApiContext );
    const{ page, shows, loading, 
           getShowsInAiring, clean, setLoading } = apiContext;

    useEffect( () => {
        setLoading( true );
        getShowsInAiring( page );
        
        return () => clean();
        // eslint-disable-next-line
    },[ page ] ) 
    
    return (
        <div className = "container" >
            <Title>TV Shows on Air</Title>
                { loading ? <Loading /> :
                 ( shows.length > 0 )
                    ? 
                    <SliderItems 
                        items = { shows }
                    />
                    : 
                    <p>No se encontraron elementos</p>
                }
            <Pagination />
        </div>
    );
}
 
export default AiringShows;