import React, { useContext } from 'react'
import styled from '@emotion/styled';
import ApiContext from '../../context/API/apiContext';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import slug from 'slug';
import { Name } from './StyledComponents';

const Card = ({ item, width, index, score }) => {

    const path_image = 'http://image.tmdb.org/t/p/w300';
    
    const apiContext = useContext( ApiContext );
    const { getMovie, getShow }  = apiContext;
    
    const CardContainer = styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-right: 4px;
        background-color: #2c3440;
        border-radius: 10px;
        border: 3px solid transparent; 
    
        &:hover > .name{
            display: block;
        }
        
        &:hover {
            border: 3px solid #00e054;
        }
        
        a{
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            text-decoration: none;
            width: 100%;
            height: 100%;
           
            span{
                max-width: 150px;
                padding: 0 10px;
                overflow: hidden;
            }

            img{
                height: 100%;
                width: 100%;
                color: #fff;
                text-align: center;
                border-radius: 10px;

                span{
                    margin-top: 8px;
                }
            }
        }
    `;

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
                <div style = {{ marginBottom: "30px" }}>
                    <CardContainer
                        style = {{
                            height: width === 'super-small' ? '130px' : width === 'small' ? '193px' : '231px',
                            width: width === 'super-small' ? '80px' : width === 'small' ? '131px' : '150px'
                        }}
                    >
                        <Name className = "name">
                            { item.title || item.name } { item.release_date ? '(' + item.release_date.slice(0,4) + ')' : null }
                        </Name>
                            <Link 
                                /*si item.type es 'movie' el url será film, sino se fijará si item.name existe y el url será
                                show, ya que los tv shows son los únicos que tienen esta propiedad y los films tienen
                                .title. Los registros también tienen .name, por eso es que la primera condición es obtener
                                .type que solo los registros son los que tienen esta propiedad*/
                                /* Resumen: si type es movie, url será film, si item tiene name, url será show, si no es ninguna
                                url será film */
                                to = {`/${ item.type === 'movie' ? 'film' : item.title ? 'film' : 'show' }/${ slug( item.title || item.name ) }/${ item.id }`} 
                                style = {{ fontSize: width === 'super-small' ? '.8rem' : width === 'small' ? '.9rem' : '1rem' }}
                                onClick = { () => { item.type === 'movie' ? getMovie( item.id ) : item.title ? getMovie( item.id ) : getShow( item.id ) } }
                            >
                                { item.poster_path ?
                                    <img 
                                        src= { `${ path_image }${ item.poster_path }` } 
                                        alt= { `${ item.title || item.name }` } 
                                    />      
                                    : <span>{ item.title || item.name }</span>
                                } 
                            </Link>
                    </CardContainer>
                    { index >= 0 
                        ? ( 
                            <span 
                                style = {{ display: "block", textAlign: "center", marginTop: "5px" }}
                            >{ index + 1 }</span>
                          ) 
                        : score
                    ? <div style = {{ color: "#778899", display: "flex", marginTop: "5px" }}>{ stars }</div> 
                        : null }
                </div>

                :null
            }
        </Fade>
    );
}
 
export default Card;