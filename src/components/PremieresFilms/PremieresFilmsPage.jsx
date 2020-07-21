import React, { useEffect, useContext } from 'react'
import ApiContext from '../../context/API/apiContext';
import styled from '@emotion/styled';
import Pagination from '../Pagination';
import Loading from '../Loading/Loading';
import SliderItems from '../SliderItems/SliderItems';

const Title = styled.h2`
    text-transform: uppercase;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 40px;
    margin-top: 40px;
`;

const PremieresFilmsPage = () => {
        
    const apiContext = useContext( ApiContext );
    const{ movies, page, loading,
           getMovies, clean, setLoading } = apiContext;

    useEffect( () => {
        setLoading( true );
        getMovies( page );
        return () => { clean() };
        // eslint-disable-next-line
    },[ page ] ) 
    

    return (
        <div className = "container" >
            <Title>Premiere Films</Title>

            { 
                loading ? <Loading /> :
                (movies.length > 0 )
                ?
                    <SliderItems
                        items = { movies }
                    />
                    :         
                    <p>No results</p>
            }

            <Pagination />
        </div>
    );
}
 
export default PremieresFilmsPage;