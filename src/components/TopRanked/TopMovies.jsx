import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../context/API/apiContext';
import slug from 'slug';
import Loading from '../Loading/Loading';
import { Title, FilmsGenres, Films, Genres } from './StyledComponents';
import SliderItems from '../SliderItems/SliderItems';

const TopMovies = ({ match }) => {
    const apiContext = useContext( ApiContext );
    const{ movies, genres, genreselected, loading,
           getTopMovies, resetState, getGenres, setGenre, setLoading } = apiContext;
    
    let films = [];

    if( match.params.id ){
        films = [...movies.filter( movie => movie.genre_ids.includes( Number(match.params.id) ) )];
    } else{
        films = [ ...movies ];
    }

    useEffect( () => {
        getGenres( 'movie' );
        setGenre( match.params.id );
        setLoading( true );
        getTopMovies( 1, 10, genreselected );

        return () => resetState();
        // eslint-disable-next-line
    },[ match.params.id, genreselected ] );

    return (
        <div className = "container" >

            <Title>TOP FILMS</Title>
            <FilmsGenres>
                <Films>
                    { loading ? <Loading /> : 
                     (films.length > 0 )
                        ? 

                        <SliderItems
                            items = { films }
                            index = { true }
                        />
                        : 
                        <p>No results</p>
                    }
                </Films>
                <Genres>
                    <div>
                    <h2>Top Rated Films by Genre</h2>
                    <ul>
                        <li>
                        <Link
                            to = '/top-movies'
                            onClick = { () => { setGenre( null )}}
                            className = { !match.params.id ? 'active' : '' }
                        >All</Link></li>
                    {
                        genres.map( genre => 
                            <li
                                key = { genre.id }
                            ><Link
                                to = {`/top-movies/${ slug(genre.name) }/${ genre.id }`}
                                onClick = { () => { setGenre( genre.id.toString() ) }}
                                className = { genreselected === genre.id.toString() ? 'active' : '' }
                            >{ genre.name }</Link>
                            </li>
                        )
                    }
                    </ul>
                    </div>
                </Genres>
            </FilmsGenres>

        </div>
    );
}
 
export default TopMovies;