import React, { useContext } from 'react'
import ApiContext from '../../context/API/apiContext';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import slug from 'slug';
import { Name, CardContainer } from './StyledComponents';
import ProfileContext from '../../context/Profile/profileContext';

const Card = ({ item, index, score, regist }) => {
    const path_image = 'http://image.tmdb.org/t/p/w300';
    
    const apiContext = useContext( ApiContext );
    const { getMovie, getShow }  = apiContext;

    const profileContext = useContext( ProfileContext );
    const { userpublic } = profileContext;

    const stars = [];
    if( score ){
        for( let i = 1; i <= score; i++ ){
            stars.push( <i key = { i } className="fas fa-star"></i> )
        } 
    }
    
    return (
        <Fade>
            {
                item ?
                <div
                    style = {{ height: "100%", minHeight: "231px" }}
                >
                    <CardContainer>
                        <Name className = "name">
                            { item.title  
                                ? item.title.length > 50 
                                    ? item.title.slice( 0, 50 ) + '...' 
                                    : item.title 
                                : item.name.length > 50
                                    ? item.name.slice( 0, 50 ) + '...'
                                    : item.name
                            } { item.release_date ? '(' + item.release_date.slice(0,4) + ')' : null }
                        </Name>
                        <Link 
                            /*si item.type es 'movie' el url será film, sino se fijará si item.name existe y el url será
                            show, ya que los tv shows son los únicos que tienen esta propiedad y los films tienen
                            .title. Los registros también tienen .name, por eso es que la primera condición es obtener
                            .type que solo los registros son los que tienen esta propiedad*/
                            /* Resumen: si type es movie, url será film, si item tiene name, url será show, si no es ninguna
                            url será film */
                            to = {
                                regist && userpublic ?
                                `/profile/${ userpublic.username }/${ item.itemType }/${ slug( item.name ) }/${ item.id }`
                                : `/${ item.itemType === 'movie' ? 'film' : item.title ? 'film' : 'show' }/${ slug( item.title || item.name ) }/${ item.id }`
                            } 
                            onClick = { () => { item.itemType === 'movie' ? getMovie( item.id ) : ( item.title ? getMovie( item.id ) : getShow( item.id ) ) } }
                        >
                            { item.poster_path ?
                                <img 
                                    src= { `${ path_image }${ item.poster_path }` } 
                                    alt= { `${ item.title || item.name }` } 
                                />      
                                : item.title ? <span>{ item.title.length > 30 ? item.title.slice( 0, 30 ) + '...' : item.title  }</span> 
                                : <span>{ item.name.length > 30 ? item.name.slice( 0, 30 ) + '...' : item.name  }</span>
                            } 
                        </Link>
                    </CardContainer>
                    { index
                        ? ( 
                            <span 
                                style = {{ display: "block", textAlign: "center", marginTop: "5px" }}
                            >{ index }</span>
                          ) 
                        : score
                    ? <span 
                        style = {{ color: "#778899", marginTop: "5px", marginRight: "10px" }}
                    >{ stars }</span> 
                        : null 
                    }
                    {
                        item.review && regist ? 
                            <i style= {{ color: "#778899" }}
                            className="fas fa-align-left"
                            ></i> : null
                    }
                </div>

                :null
            }
        </Fade>
    );
}
 
export default Card;