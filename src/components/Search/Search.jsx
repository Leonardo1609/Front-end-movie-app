import React, { useContext, useEffect } from 'react'
import ApiContext from '../../context/API/apiContext';
import styled from '@emotion/styled';
import Card from '../CardItem/Card';
import Pagination from '../Pagination';
import Loading from '../Loading/Loading';

const Search = ({ match }) => {

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

        &::after{
            content: '';
            width: auto;
            display: inline-block;
            flex: 1 1 auto;
        }
        /* @media (min-width: 576px) {
            justify-content: center;
        } */
    `;

    const SectionHeading = styled.div`
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
        margin-bottom: 10px;
        border-bottom: 1px solid #707070;
        font-size: 13px;
        text-transform: uppercase;
        color: #D8E0E8;
    `;

    const apiContext = useContext( ApiContext );
    const{ movies, shows, page, loading, searchItem, clean, setLoading } = apiContext;
    
    const margin = {
        margin: "0 8px"
    }

    useEffect( () => {
        setLoading( true );
        searchItem( match.params.name, page );
        
        return () => { clean() };
        // eslint-disable-next-line
    },[ page, match ] ) 
    

    return (
        <div className = "container" >
            <Title>Results for: { match.params.name }</Title>
            <SectionHeading>
                <span>
                    Movies
                </span>
            </SectionHeading>
            { 
                loading ? <Loading /> :
                ( movies.length > 0 )
                ?                        
                    <Films>
                        { movies.map( movie => (
                            <div
                                key = { movie.id }
                                style = { margin }
                            >
                                <Card
                                    width = 'super-small'
                                    item = { movie }
                                />
                            </div>
                            ))
                        }
                            
                    </Films>
                :  
                    <p>No films results</p>  
            }
            <SectionHeading>
                <span>
                    Shows
                </span>
            </SectionHeading>
            { 
                loading ? <Loading /> :
                (shows.length > 0 )
                ?
                    <Films>
                        { shows.map( show => (
                            <div
                                key = { show.id }
                                style = { margin }
                            >
                                <Card
                                    item = { show }
                                    width = 'super-small'
                                />
                            </div>
                            ))
                        }
                            
                    </Films>
                :         
                    <p>No tv shows results</p>
            }
            <Pagination />
        </div>
    );
}
 
export default Search;