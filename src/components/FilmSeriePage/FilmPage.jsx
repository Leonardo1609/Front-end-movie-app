import React, { useContext, useEffect, useRef, Fragment } from 'react'
import ApiContext from '../../context/API/apiContext';
import Loading from '../Loading/Loading';
import FastAverageColor from 'fast-average-color';
import DescriptionItem from './DescriptionItem';
import { Image, ItemContainer } from './StyledComponents';
import Log from './Log';
import ProfileContext from '../../context/Profile/profileContext';
import AuthContext from '../../context/Auth/authContext';
import NotFoundComponent from '../NotFound/NotFound';
import NotfoundContext from '../../context/NotFound/notfoundContext';

const FilmPage = ({ match }) => {

    const fac = new FastAverageColor();

    const path_image = 'http://image.tmdb.org/t/p/w500';

    const profileContext = useContext ( ProfileContext );
    const { cleanState } = profileContext;

    const apiContext = useContext( ApiContext );
    const { itemselected, loading, 
            getMovie, getMoviePromise, resetState, setLoading } = apiContext;
    
    const authContext = useContext( AuthContext );
    const { registersauth, setItemAuth } = authContext;

    const notfoundContext = useContext( NotfoundContext );
    const { setNotFound } = notfoundContext;

    const containerBodyItem = useRef();
    const imageItem = useRef(); // para obtener el color promedio de la imagen con fast-average-color

    let background_path = {}
    let background_opacity  = {}; 
    
    if( itemselected ){
        background_path = {
            backgroundImage: itemselected.backdrop_path 
                             ? `url(${ `http://image.tmdb.org/t/p/w500${ itemselected.backdrop_path }`})` 
                             : "none",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition : "right -350px top",
            minHeight: "100vh"
        }
        
        background_opacity = {
            backgroundImage: `linear-gradient( to right,
                                rgba(5.00%, 5.00%, 5.00%, 1.00) 150px, 
                                rgba(6.06%, 6.06%, 6.06%, 0.84) 100% )
                              `,
            minHeight: "100vh"                              
        }

        setTimeout(
            () => {
                if( imageItem.current && itemselected.poster_path ){
                    fac.getColorAsync( imageItem.current )
                        .then( color => 
                            {   
                                containerBodyItem.current.style.backgroundImage = `
                                linear-gradient( to right, 
                                    rgba(${color.value[0] - 80},${color.value[1] - 80}, ${color.value[2] - 80} , 1) 150px, 
                                    rgba(${color.value[0] - 80},${color.value[1] - 80}, ${color.value[2] - 80} ,.75) 100% )`;
                            }    
                        );
                // solo los items con backdrop, pero sin poster, podrán tener un fondo con gradiente negro
                } else if( itemselected.backdrop_path && containerBodyItem.current ) {
                    containerBodyItem.current.style.backgroundImage = `
                    linear-gradient( to right,
                         rgba(5.00%, 5.00%, 5.00%, 1.00) 150px, 
                         rgba(6.06%, 6.06%, 6.06%, 0.84) 100% )`;
                }
            },1
        );
    }


    useEffect(()=>{
        setLoading( true );
        getMovie( match.params.id );
        // TODO
        return () => {
            cleanState(); // profileContext
            resetState(); // apiContext
            setNotFound( false );
        }
        // eslint-disable-next-line
    },[]); // I don't put match because refresh the page when i select cast, crew, details or genre

    useEffect(() => {
        // cleanState();
        getMoviePromise( match.params.id ).then(
            result => {
                if( registersauth ){
                    setItemAuth( registersauth.find( regist => regist.id === result.id && regist.name === result.title ) );
                }
            }
        ).catch( error => setNotFound( true ) );
        // eslint-disable-next-line
    }, [ registersauth ]);
    
    if ( !itemselected && !loading ) return <NotFoundComponent />

    return (
        <div style = { background_path }>
            <div style = { background_opacity } ref = { containerBodyItem }>
                <div className = "container">
                    <ItemContainer>
                        <div className = "body-item">
                            {
                                loading ? <Loading /> :
                                    <Fragment>
                                        <Image 
                                            // para evitar el error de CORS del canvas
                                            crossOrigin = "Anonymous"
                                            ref = { imageItem } // para obtener el color promedio de la imagen con fast-average-color
                                            src = { 
                                                    (itemselected.poster_path) ? 
                                                    `${ path_image }${ itemselected.poster_path }`
                                                    : null
                                                  } 
                                        />
                                        <div className = 'overview'>
                                            <h2>{ itemselected.title || itemselected.name } 
                                            {
                                                itemselected.release_date ? 
                                                    <span>  ({ itemselected.release_date.slice(0,4) })</span>
                                                : null
                                            }
                                            </h2>
                                            {itemselected.crew.find( item => item.job === 'Director' )?
                                                <p className = "directed" >
                                                    Directed by <span>{ itemselected.crew.find( item =>  item.job === 'Director' ).name }</span>
                                                </p>
                                            :null}
                                            <p className = "tagline">{ itemselected.tagline }</p>
                                            <p className = "overview-content">{ itemselected.overview }</p>
                                            
                                        </div>
                                            <DescriptionItem 
                                                type = "film"
                                                match = { match.params.option }
                                            />
                                        <Log 
                                            itemType = "movie"
                                            name = { itemselected.title } 
                                        />
                                    </Fragment>
                            }    
                        </div>
                    </ItemContainer>
                </div>
            </div>
        </div>  
    )
}
 
export default FilmPage;


