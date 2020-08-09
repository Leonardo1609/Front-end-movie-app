import React, { useReducer } from 'react'
import ApiContext from './apiContext';
import axios from 'axios';
import { ApiReducer } from './apiReducer';
import moment from 'moment';
import { 
    GET_MOVIES_THEATRE,     
    GET_TV_SHOWS_AIRING,
    CHANGE_PAGE,         
    GET_TOP_MOVIES,         
    RESET_STATE,         
    GET_TOP_SHOWS,
    GET_GENRES,
    SET_GENRE,
    GET_MOVIE,
    GET_SHOW,
    CLEAN,
    SEARCH_ITEM,
    LOADING
} from '../../types';

const ApiState = props => {

    const url = 'https://api.themoviedb.org/3/';
    const apikey = 'd76b20d3a712cc69cd823e33eba9060e';
    const date = moment().format().slice( 0, 10 ); // yyyy-mm-dd
    const initialState = {
        movies: [],
        shows: [],  
        page: 1,
        totalpages: null,
        genres: [],
        genreselected: null,
        itemselected: null,
        loading: false
    };

    const [ state, dispatch ] = useReducer( ApiReducer, initialState );

    const changePage = page => {
        dispatch({
            type: CHANGE_PAGE,
            payload: page
        })
    }

    const setLoading = bool => {
        dispatch({
            type: LOADING,
            payload: bool
        })
    }
    
    const getMovie = async ( movieId ) => {
        try{
            const result = await getMoviePromise( movieId );
            dispatch({
                type: GET_MOVIE,
                payload: result
            })
            //TODO
        } catch ( error ){
            console.log( error.response );
        }
    };
    
    const getMoviePromise = async ( movieId ) => {
        try{
            const moviepromise = axios.get(`${ url }movie/${ movieId }?api_key=${ apikey }&language=en-US`);
            const castpromise = axios.get(`${ url }movie/${ movieId }/credits?api_key=${ apikey }&language=en-US`);

            const [ movie, cast ] = await Promise.all([ moviepromise, castpromise ]);
            const result = { ...movie.data, ...cast.data }
            return result;
        } catch( error ){
            console.log( error.response );
        }
    }

    const getShow = async ( serieId ) => {
        try{
            const result = await getShowPromise( serieId );
            dispatch({
                type: GET_SHOW,
                payload: result
            })
        }  catch ( error ){
            console.log( error.reponse );
        }    
    };

    const getShowPromise = async( serieId ) => {
        try {
            const seriepromise = axios.get(`${ url }tv/${ serieId }?api_key=${ apikey }&language=en-US`);
            const castpromise = axios.get(`${ url }tv/${ serieId }/credits?api_key=${ apikey }&language=en-US`);
    
            const [ serie, cast ] = await Promise.all([ seriepromise, castpromise ]);
            const result = { ...serie.data, ...cast.data };

            return result;
        } catch (error) {
            console.log( error.response );
        }
    }
    const getMovies = async ( page ) => {
        try {
            const result = await axios.get( `${ url }discover/movie?primary_release_date.gte=${ date }&api_key=${ apikey }&page=${ page }` );
            dispatch({
                type: GET_MOVIES_THEATRE,
                payload: result.data
            })
        } catch (error) {
            console.log( error.response );
        }
    }

    const getShowsInAiring = async ( page ) => {
        try {
            const result = await axios.get( `${ url }tv/airing_today?&api_key=${ apikey }&language=en-US&page=${ page }` );
            dispatch({
                type: GET_TV_SHOWS_AIRING,
                payload: result.data
            })
        } catch (error) {
            console.log( error.response );
        }
    }
    
    const getTopMovies = async ( page, cantidad, category ) => {
        
        try {
            let results = [];
    
            if( cantidad ){
                for ( let i = 1; i<= cantidad; i++ ){
                   const result = axios.get( `${ url }movie/top_rated?api_key=${ apikey }&language=en-US&page=${ i }` );
                   results.push( result );
                }
            }else{
                results.push( axios.get( `${ url }movie/top_rated?api_key=${ apikey }&language=en-US&page=${ page }` ));
            }
            results = await Promise.all( results );
            results = results.map( result => result.data.results ).flat(Infinity);
    
            // if ( category ){
            //     results = results.filter( movie => movie.genre_ids.includes( Number(category) ) );
            // } 
            dispatch({
                type: GET_TOP_MOVIES,
                payload: results
            })
        } catch (error) {
            console.log( error );
        }
    }

    const getTopShows = async ( page, cantidad ) => {
        try {
            let results = [];
            if( cantidad ){
                for ( let i = 1; i<= cantidad; i++ ){
                   const result = axios.get( `${ url }tv/top_rated?api_key=${ apikey }&language=en-US&page=${ i }`);
                   results.push( result );
                }
            }else{
                results.push( axios.get( `${ url }tv/top_rated?api_key=${ apikey }&language=en-US&page=${ page }` ));
            }
    
            results = await Promise.all( results );
            results = results.map( result => result.data.results ).flat(Infinity);
            
            dispatch({
                type: GET_TOP_SHOWS,
                payload: results
            })
        } catch (error) {
            console.log( error );
        }
        
    }
    const getGenres = async ( section ) => {
        const result = await axios.get(`${ url }genre/${ section }/list?api_key=${ apikey }&language=en-US` );
        dispatch({
            type: GET_GENRES,
            payload: result.data.genres
        })
    }
    
    const setGenre = async ( genreId ) => {
        dispatch({
            type: SET_GENRE,
            payload: genreId
        })
    }

    const searchItem = async ( text, page ) => {
        const result = await axios.get(`${ url }search/multi?api_key=${ apikey }&language=en-US&page=${ page }&include_adult=false&query=${ text }`);
        
        dispatch({
            type: SEARCH_ITEM,
            payload: result.data
        })
    } 

    /* CLEAN STATE*/ 
    const clean = () => {
        dispatch({
            type: CLEAN
        })
    }

    const resetState = async () => {
        dispatch({
            type: RESET_STATE
        })
    }

    return ( 
        <ApiContext.Provider
            value = {{
                movies: state.movies,
                shows: state.shows,
                page: state.page,
                totalpages: state.totalpages,
                genres: state.genres,
                genreselected: state.genreselected,
                itemselected: state.itemselected,
                loading: state.loading,
                setLoading,
                getMovie,
                getMoviePromise,
                getShow,
                getShowPromise,
                getMovies,
                getShowsInAiring,
                changePage,
                getTopMovies,
                getTopShows,
                getGenres,
                setGenre,
                searchItem,
                resetState,
                clean
            }}
        >
            { props.children }
        </ApiContext.Provider>
    );
}
 
export default ApiState;