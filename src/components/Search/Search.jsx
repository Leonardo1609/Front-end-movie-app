import React, { useContext, useEffect } from 'react'
import ApiContext from '../../context/API/apiContext';
import styled from '@emotion/styled';
import Pagination from '../Pagination';
import Loading from '../Loading/Loading';
import SliderItems from '../SliderItems/SliderItems';

const Search = ({ match }) => {

    const Title = styled.h2`
    text-transform: uppercase;
    text-align: center;
    font-size: 2rem;
    margin: 40px 0;
    `;

    const apiContext = useContext( ApiContext );
    const{ movies, shows, page, loading, searchItem, clean, setLoading } = apiContext;

    useEffect( () => {
        setLoading( true );
        searchItem( match.params.name, page );
        
        return () => { clean() };
        // eslint-disable-next-line
    },[ page, match ] ) 
    

    return (
        <div className = "container" >
            <Title>Results for: { match.params.name }</Title>
            {
                loading ? <Loading /> :
                ( movies )
                ?       

                    <SliderItems 
                        header = { true }
                        title = "movies"
                        items = { movies } 
                    />
                :  
                    null  
            }
            {
                loading ? <Loading /> :
                ( shows )
                ?       

                    <SliderItems 
                        header = { true }
                        title = "shows"
                        items = { shows } 
                    />
                :  
                    null  
            }
            <Pagination />
        </div>
    );
}
 
export default Search;