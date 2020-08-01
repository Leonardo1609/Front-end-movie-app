import React, { useEffect, useContext, Fragment } from 'react';
import ProfileContext from '../../context/Profile/profileContext';
import Card from '../CardItem/Card';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Log from './Log';
import { RegistPageContainer } from './StyledComponents';
import AuthContext from '../../context/Auth/authContext';
import CommentReview from './CommentReview';

const RegistPage = ({ match }) => {

    const profileContext = useContext( ProfileContext );
    const { userpublic, registselected, registerspublic, 
            getRegister, updateLikes, getPublicUser } = profileContext;

    const authContext = useContext( AuthContext );
    const { authenticated, userauth, registersauth } = authContext;

    useEffect( () => {
        getPublicUser( match.params.username ).then(
            user => getRegister( match.params.id, user._id )
        );
        // eslint-disable-next-line
    }, [ match, registerspublic, registersauth ]);
    if ( !registselected ) return null;

    return ( 
        <RegistPageContainer className="container mt-5">
            <div className="card-section">
                <Card
                    item = { registselected }
                />
            </div>
            <div className = "body-section">
                <p className="regist-user">
                    <Link
                        to = {`/profile/${ userpublic.username }`}                    
                    >
                        <img className = "avatar" src= { 
                            userpublic 
                            ? 
                                userpublic.image 
                                ? require(`../../../../backend-movieapp/src/public/img/profiles/${ userpublic.image }`) 
                                : 'https://s.ltrbxd.com/static/img/avatar1000.71ae0671.png'
                            : 'https://s.ltrbxd.com/static/img/avatar1000.71ae0671.png' } 
                        />
                    </Link>
                    { registselected.review ? 'Reviewed ': 'Watched' } by 
                    <Link 
                        className="username" 
                        to = {`/profile/${ userpublic.username }`}
                    >   
                        { userpublic.username }
                    </Link>
                </p>
                <h3 className="regist-name">
                    { registselected.name }
                    { registselected.score ?
                        <span className="stars">
                            {
                                Array.from( Array(registselected.score), ( e, i ) => (
                                    <i 
                                        className="fas fa-star" 
                                        key = { i }
                                    ></i> 
                                ))
                            }
                        </span>
                        : null
                    }        
                </h3>
                <span className="regist-date">Watched { moment( registselected.registeredAt ).format('ll') }</span>
            </div>
            <div className="review-section">
                    <p className="regist-review mt-3">{ registselected.review }</p>
                    {
                        registselected.review && authenticated ?
                        <Fragment>
                            {
                                registselected.user.toString() !== userauth._id.toString() ?
                                <button 
                                    style = {{ color: registselected.usersLikes.indexOf( userauth._id ) >= 0 
                                        ? '#ff304f' 
                                        : ''
                                    }}
                                    className="button-like p-0 mr-2" 
                                    onClick={ () => updateLikes( registselected._id ) }
                                >
                                    <i className="fas fa-heart"></i> 
                                    { registselected.usersLikes.indexOf( userauth._id ) >= 0 
                                        ? <span>Liked</span> 
                                        : <span>Like review</span>   
                                    }
                                </button>
                                : null
                            }
                            {
                                registselected.usersLikes.length > 0 ?
                            <span 
                                className="num-likes"
                            >{ registselected.usersLikes.length } like{'(s)'}</span>
                                : <span className="num-likes">No likes</span>   
                            }
                        </Fragment>
                        : null
                    }
                </div>
            <div className="comment-section">
                {
                    registselected.review && authenticated
                    ? <CommentReview/>
                    : null
                }
            </div>
            <div className="log-section">
                <Log 
                    itemType = { registselected.itemType }
                    name = { registselected.name }
                />
            </div>
        </RegistPageContainer>
    );
}
 
export default RegistPage;