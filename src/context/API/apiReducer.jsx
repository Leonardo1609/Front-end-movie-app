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
} from "../../types"

export const ApiReducer = (state, action) => {
    switch (action.type) {
        case GET_MOVIES_THEATRE:
            return {
                ...state,
                movies: action.payload.results,
                totalpages: action.payload.total_pages,
                loading: false
            }
        case GET_TOP_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false
            }
        case GET_TV_SHOWS_AIRING:   
            return {
                ...state,
                shows: action.payload.results,
                totalpages: action.payload.total_pages,
                loading: false
            }
        case GET_TOP_SHOWS:
            return {
                ...state,
                shows: action.payload,
                loading: false
            }    
        case CHANGE_PAGE:
            return{
                ...state,
                page: action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case SET_GENRE:
            return{
                ...state,
                genreselected: action.payload,
            }
        case GET_MOVIE:
            return{
                ...state,
                itemselected: action.payload,
                loading: false
            }
        case GET_SHOW:
            return{
                ...state,
                itemselected: action.payload,
                loading: false
            }
        case SEARCH_ITEM:
            return{
                ...state,
                movies: action.payload.results.filter( item => item.media_type === 'movie' ),
                shows: action.payload.results.filter( item => item.media_type === 'tv'),
                totalpages: action.payload.total_pages,
                loading: false
            }
        case CLEAN:
            return{
                ...state,
                movies: [],
                shows: []
            }
        case LOADING:
            return{
                ...state,
                loading: action.payload
            }
        case RESET_STATE:
            return{
                ...state,
                movies: [],
                shows: [],
                page: 1,
                totalpages  : null,
                genres: [],
                genreselected: null,
                itemselected: null
            }
        default:
            return state
    }
}