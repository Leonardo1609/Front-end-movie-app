import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import ApiContext from '../../context/API/apiContext';
import { DescriptionBody, Tooltip, TabDetails } from './StyledComponents';
import slug from 'slug';


const DescriptionItem = ({ type, match }) => {
    
    slug.charmap['/'] = '-';
    const apiContext = useContext( ApiContext );
    const { itemselected } = apiContext;

    const active = {
        color: "#FFFFFF",   
    }
  
    return (  
        <DescriptionBody>
                <div className = "list-container">
                    <ul>
                        <li>
                            <Link 
                                style = { !match ? active : null }
                                to = {`/${type}/${slug( itemselected.title || itemselected.name )}/${itemselected.id}`}
                            >Cast</Link>
                        </li>
                        <li>
                            {
                                match !== 'crew' ? 
                                <Link 
                                    style = { ( match === 'crew' ) ? active : null }
                                    to = { `/${type}/${slug( itemselected.title || itemselected.name )}/${itemselected.id}/crew`}
                                >Crew</Link>
                                : <span>Crew</span>

                            }
                        </li>
                        <li>
                            {
                                match !== 'details' ?
                                <Link 
                                    style = { ( match === 'details' ) ? active : null }
                                    to = {`/${type}/${slug( itemselected.title || itemselected.name )}/${itemselected.id}/details`}
                                >Details</Link>
                                : <span>Details</span>
                            }
                        </li>
                        <li>
                            {
                                match !== 'genre' ?
                                <Link 
                                    style = { ( match === 'genre' ) ? active : null }
                                    to = {`/${type}/${slug( itemselected.title || itemselected.name )}/${itemselected.id}/genre`}
                                >Genre</Link>
                                : <span>Genre</span>
                            }
                        </li>
                    </ul>
                </div>
                <Tooltip>
                    { 
                    // CAST 
                    !match ? 
                        itemselected.cast.map( person => 
                        (<span
                            className = "tool-tip"
                            key = { person.credit_id } 
                        >{ person.name }</span>)    
                        )
                    // GENRE
                    : match === 'genre' ? 
                        itemselected.genres.map( genre => 
                        (<span 
                            className = "tool-tip"
                            key = { genre.id } 
                        >{ genre.name }</span>)    
                        )
                    // DETAILS
                    : match === 'details' ?
                        <TabDetails>
                         {
                            ( Object.keys( itemselected.production_companies ).length > 0 ) ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Studios</span></h3>
                                <p className = "detail">{ Object.values( itemselected.production_companies )
                                                            .map( company => <span 
                                                                                key = { company.id }
                                                                            >{company.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( itemselected.production_countries && Object.keys( itemselected.production_countries ).length > 0 ) ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Countries</span></h3>
                                <p className = "detail">{ Object.values( itemselected.production_countries )
                                                            .map( country => <span 
                                                                                key = { country.iso_3166_1 }
                                                                            >{ country.iso_3166_1 }</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( itemselected.spoken_languages && Object.keys( itemselected.spoken_languages ).length > 0 ) ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Languages</span></h3>
                                <p className = "detail">{ Object.values( itemselected.spoken_languages )
                                                            .map( language => <span 
                                                                                key = { language.iso_639_1 }
                                                                            >{ language.name }</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            itemselected.original_title || itemselected.original_name ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Original Title</span></h3>
                                <p className = "detail">{ itemselected.original_title || itemselected.original_name }</p>
                            </div>
                            : null
                        }  
                            <p className = "runtime">{ itemselected.runtime ? itemselected.runtime + ' mins' : '' } More details at 
                                <a 
                                    href = {`https://www.imdb.com/title/${itemselected.imdb_id}`}
                                    target = "_blank"
                                    rel="noopener noreferrer"
                                    >IMDB</a>
                                <a 
                                    href = {`https://www.themoviedb.org/movie/${itemselected.id}-${slug(itemselected.title || itemselected.name)}`}
                                    target = "_blank"
                                    rel="noopener noreferrer"
                                >TMDB</a>
                                <a 
                                    href = {`https://letterboxd.com/film/${slug(itemselected.title || itemselected.name)}`}
                                    target = "_blank"
                                    rel="noopener noreferrer"
                                >Letterbox</a>
                            </p>
                        
                        </TabDetails>
                    // CREW
                    : match === 'crew' ?
                        <TabDetails>
                        {
                            ( Object.keys(itemselected.crew.filter( person => person.job === 'Director' )).length > 0 ) ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Director</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job === 'Director' ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        }{
                            ( Object.keys(itemselected.crew.filter( person => person.job.indexOf('Producer') >= 0 && 
                                                                    person.department === 'Production' )).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Producer</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job.indexOf('Producer') >= 0 && 
                                                                     person.department === 'Production' ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                        }
                                </p>
                            </div>
                            : null
                        }{
                            ( Object.keys( itemselected.crew.filter( person => ( person.job.indexOf('Writer') >= 0 || 
                                                                                 person.job === 'Screenplay' || 
                                                                                 person.job === 'Author' ) &&
                                                                    person.department === 'Writing' ) ).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Writer</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => ( person.job.indexOf('Writer') >= 0 || 
                                                                                 person.job === 'Screenplay' || 
                                                                                 person.job === 'Author' ) && 
                                                                     person.department === 'Writing' ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( Object.keys(itemselected.crew.filter( person => person.job === "Editor" )).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Editor</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job === "Editor" ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( Object.keys(itemselected.crew.filter( person => person.job === "Director of Photography" || 
                                                                    person.job === 'Cinematography' )).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Cinemathography</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job === "Director of Photography" || 
                                                                     person.job === 'Cinematography'))
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( Object.keys(itemselected.crew.filter( person => person.job === "Production Design" )).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Production Design</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job === "Production Design" ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                            ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( Object.keys( itemselected.crew.filter(  person => person.job.indexOf("Direct") >=0 && 
                                                                      person.department === 'Art' )).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Art Direction</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job.indexOf("Direct") >=0 && 
                                                                     person.department === 'Art' ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                )  
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( Object.keys( person => person.job.indexOf("Set") >= 0 && person.department === 'Art' ).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Set Decoration</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job.indexOf("Set") >= 0 &&
                                                                    person.department === 'Art' ) )
                                                            .map( person => <span 
                                                                                style = {{ marginRight : "1rem" }}
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( Object.keys( itemselected.crew.filter( person => person.job.indexOf("Visual Effects") >= 0 && 
                                           person.department === 'Visual Effects' )).length > 0 )
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Visual Effects</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job.indexOf("Visual Effects") >= 0 && 
                                                                     person.department === 'Visual Effects' ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( Object.keys( itemselected.crew.filter( person => person.job === 'Original Music Composer' || 
                                                                     person.job === 'Music' )).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Composer</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job === 'Original Music Composer' || 
                                                                     person.job === 'Music' ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( Object.keys( itemselected.crew.filter( person => person.job.indexOf('Sound') >= 0 && 
                                                                     person.department === 'Sound' )).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Sound</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job.indexOf('Sound') >= 0 && 
                                                                     person.department === 'Sound' ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( Object.keys( itemselected.crew.filter( person => person.job.indexOf('Costume') >= 0 && 
                                                                     person.department === 'Costume & Make-Up' )).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Costumes</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job.indexOf('Costume') >= 0 && 
                                                                     person.department === 'Costume & Make-Up' ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        } {
                            ( Object.keys( itemselected.crew.filter( person => person.job.indexOf('Makeup') >= 0 && 
                                                                     person.department === 'Costume & Make-Up' )).length > 0 ) 
                            ?
                            <div className = "tab-details">
                                <h3 className = "tab"><span>Make up</span></h3>
                                <p className = "detail">{ Object.values( itemselected.crew
                                                            .filter( person => person.job.indexOf('Makeup') >= 0 && 
                                                                     person.department === 'Costume & Make-Up' ) )
                                                            .map( person => <span 
                                                                                key = { person.credit_id }
                                                                            >{person.name}</span> 
                                                                ) 
                                   }
                                </p>
                            </div>
                            : null
                        }
                        </TabDetails>
                    :null
                    } 
                </Tooltip>
            </DescriptionBody>
    );
}
 
export default DescriptionItem;