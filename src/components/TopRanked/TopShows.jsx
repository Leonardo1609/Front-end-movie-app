import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../context/API/apiContext';
import slug from 'slug';
import Loading from '../Loading/Loading';
import { Title, FilmsGenres, Films, Genres } from './StyledComponents';
import SliderItems from '../SliderItems/SliderItems';

const TopShows = ({ match }) => {
    
    const apiContext = useContext( ApiContext );
    const{ shows, genres, genreselected, loading,
           getTopShows, resetState, getGenres, setGenre, setLoading } = apiContext;

    let tv_shows = [];
    if( match.params.id ){
        tv_shows = [ ...shows.filter( show => show.genre_ids.includes( Number( match.params.id ) ) ) ];
    } else {
        tv_shows = [ ...shows ]
    }

    useEffect( () => {
        
        getGenres( 'tv' );
        setGenre( match.params.id );
        setLoading( true );
        getTopShows( 1, 10, genreselected );

        return () => resetState();
        // eslint-disable-next-line
    },[ match.params.id, genreselected ] );

    return (
        <div className = "container" >

            <Title>TOP TV SHOWS</Title>
            <FilmsGenres>
                <Films>
                    { 
                        loading ? <Loading /> : 
                        (tv_shows.length > 0 )
                        ? 
                        <SliderItems
                            items = { tv_shows }
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
                            to = '/top-shows'
                            onClick = { () => { setGenre( null )}}
                            className = { !genreselected ? 'active' : '' }
                            >All</Link></li>
                        {
                            genres.map( genre => 
                                <li
                                    key = { genre.id }
                                ><Link
                                    to = {`/top-shows/${ slug(genre.name) }/${ genre.id }`}
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
 
export default TopShows;