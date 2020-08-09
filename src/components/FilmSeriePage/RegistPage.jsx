import React, { useEffect, useContext, Fragment } from 'react';
import ProfileContext from '../../context/Profile/profileContext';
import Card from '../CardItem/Card';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Log from './Log';
import { RegistPageContainer } from './StyledComponents';
import AuthContext from '../../context/Auth/authContext';
import CommentReview from './CommentReview';
import NotFoundComponent from '../NotFound/NotFound';
import Loading from '../Loading/Loading';
import NotfoundContext from '../../context/NotFound/notfoundContext';

const RegistPage = ({ match }) => {
    const profileContext = useContext( ProfileContext );
    const { userpublic, registselected, registerspublic, loadingregist, 
            getRegister, updateLikes, getPublicUser, cleanState } = profileContext;

    const authContext = useContext( AuthContext );
    const { authenticated, userauth, registersauth, 
            setItemAuth } = authContext;

    const notfoundContext = useContext( NotfoundContext );
    const { setNotFound } = notfoundContext;

    useEffect( () => {
        return () => { 
            setNotFound( false ); 
            cleanState() 
        };
        // eslint-disable-next-line
    }, []);

    useEffect( () => {
        getPublicUser( match.params.username )
        .then( user => getRegister( match.params.id, match.params.type, user._id ))
        .then(
            result => {
                if( registersauth ){
                    setItemAuth( registersauth.find( regist => regist.id === result.id  && regist.name === result.name ) );
                }
            }
        ).catch( error => setNotFound( true ) );
        // eslint-disable-next-line
    }, [ match, registerspublic, registersauth ]);

    if ( !registselected && !loadingregist ) return <NotFoundComponent />;

    return (
        loadingregist ? <Loading /> :
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
                        <img alt = "avatar" className = "avatar" src= { 
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
                </p>
                <h3 className="regist-name">
                    { registselected.name.length > 40 ? registselected.name.slice( 0, 40 ) + '...' : registselected.name }     
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
                    match = { match }
                    itemType = { registselected.itemType }
                    name = { registselected.name }
                />
            </div>
        </RegistPageContainer>
    );
}
 
export default RegistPage;