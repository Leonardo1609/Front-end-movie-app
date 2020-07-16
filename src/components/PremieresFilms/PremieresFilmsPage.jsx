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
    margin-bottom: 40px;
    margin-top: 40px;
`;

const Films = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const PremieresFilmsPage = () => {
        
    const apiContext = useContext( ApiContext );
    const{ movies, page, loading,
           getMovies, clean, setLoading } = apiContext;
    
    const margin = {
        margin: "0 12px"
    }

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
                    <Films>
                        { movies.map( (movie) => (
                            <div
                                key = { movie.id }
                                style = { margin }
                            >
                                <Card
                                    item = { movie }
                                />
                            </div>
                            ))
                        }
                            
                    </Films>
                :         
                    <p>No results</p>
            }

            <Pagination />
        </div>
    );
}
 
export default PremieresFilmsPage;