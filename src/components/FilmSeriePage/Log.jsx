import React, { useContext, useState } from 'react';
import ApiContext from '../../context/API/apiContext';
import AuthContext from '../../context/Auth/authContext';
import { useHistory } from 'react-router-dom';
import { LogContainer } from './StyledComponents';
import ModalRegister from './ModalRegister';
import { useEffect } from 'react';
import NoAuthenticatedLog from './NoAunthenticatedLog';

const Log = ({ itemType, name, match }) => {
    const [ item, setItem ] = useState({});
    const authContext = useContext( AuthContext );
    const { authenticated, registersauth, registerselectedauth,
            postRegister, modifyRegister, removeRegister } = authContext;

    const apiContext = useContext( ApiContext );
    const { itemselected } = apiContext;

    const history = useHistory();

    const registItemWatch = () => {
        if( item ){
            if ( item.watched && item.watchlist ){
                modifyRegister( item._id, {
                    ...item,
                    watched: false,
                    score: null,
                    liked: false,
                    review: null
                })
            } else if( !item.watchlist ) {
                removeRegister( item._id );
                if( match ){
                    // I use replace and not push, because if I back to the prev page I'll have an error because the register doesn't exist
                    history.replace(`/profile/${ match.params.username }`);
                }
            } else {
                modifyRegister( item._id, {
                    ...item,
                    watched: true
                });
            }
        } else {
            postRegister({
                name,
                itemType,
                id: itemselected.id,
                poster_path: itemselected.poster_path,
                watched: true
            });
        }
    }

    const registItemLike = () => {
            
        if( item ){
            if ( item.liked ){
                modifyRegister( item._id, {
                    ...item,
                    liked: false
                })
            } else {
                modifyRegister( item._id, {
                    ...item,
                    liked: true,
                    watched: true
                });
            }
        } else {
            postRegister({
                name,
                itemType,
                id: itemselected.id,
                poster_path: itemselected.poster_path,
                liked: true,
                watched: true
            });
        }
    }

    const registWatchlist = () => {
            
        if( item ){
            if ( item.watchlist && item.watched ){
                modifyRegister( item._id, {
                    ...item,
                    watchlist: false
                })
            } else if ( !item.watched && item.watchlist ) {
                removeRegister( item._id );
                if( match ){
                    history.replace(`/profile/${ match.params.username }`);
                }
            } else {
                modifyRegister( item._id, {
                    ...item,
                    watchlist: true
                });
            }
        } else {
            postRegister({
                name,
                itemType,
                id: itemselected.id,
                poster_path: itemselected.poster_path,
                watchlist: true
            });
        }
    }

    const rateItem = e => {
        if( item ){
            if ( item.score ){
                modifyRegister( item._id, {
                    ...item,
                    watched: true,
                    score: Number( e.target.classList[2].split('b')[1] )
                })
            } else {
                modifyRegister( item._id, {
                    ...item,
                    watched: true,
                    score: Number( e.target.classList[2].split('b')[1] )
                });
            }
        } else {
            postRegister({
                name,
                itemType,
                id: itemselected.id,
                poster_path: itemselected.poster_path,
                watched: true,
                score: Number( e.target.classList[2].split('b')[1] )
            });
        }
    }
    
    const removeScore = () => {        
        if( item ){
            if ( item.score ){
                modifyRegister( item._id, {
                    ...item,
                    watched: true,
                    score: null
                });
            }
        }
    };

    const registReview = ( review ) => {
        if( item ){
            if ( item.watched ){
                modifyRegister( item._id, {
                    ...item,
                    watched: true,
                    review
                })
            } else {
                modifyRegister( item._id, {
                    ...item,
                    watched: true,
                    review
                });
            }
        } else {
            postRegister({
                name,
                itemType,
                id: itemselected.id,
                poster_path: itemselected.poster_path,
                watched: true,
                review
            });
        }
    };

    let activeWatched;
    let activeLiked;
    let activeWatchlist;
    let activeScore;
    let score;

    if ( item ){
        if( item.watched ){
            activeWatched = {
                color: "#00E054"
            };
        }

        if( item.liked ){
            activeLiked = {
                color: "#ff304f"
            }
        }

        if( item.watchlist ){
            activeWatchlist = {
                color: "#3d5af1"
            }
        }

        if( item.score > 0 ){
            score = item.score;
            activeScore = {
                color: "#00E054"
            };
        }
    }

    useEffect( ()=> {
        if( registersauth ){
            // if registerselectedauth is null item will be null too
            setItem( registerselectedauth );
        }
        // eslint-disable-next-line
    }, [ registersauth, name, registerselectedauth ]);

    if( !authenticated ) return (<NoAuthenticatedLog />);
    return ( 
        <LogContainer>
            <div className = "icons">
                <div className = "icon watched">
                    <i 
                        style = { activeWatched ? activeWatched : null }
                        className="fas fa-eye"
                        onClick = { registItemWatch }
                    ></i>
                    <span>Watched</span>
                </div>
                <div className = "icon like">
                    <i 
                        style = { activeLiked ? activeLiked : null }
                        className="fas fa-heart"
                        onClick = { registItemLike }
                    ></i>
                    <span>Liked</span>
                </div>
                <div className = "icon watchlist">
                    <i 
                        style = { activeWatchlist ? activeWatchlist : null }
                        className="fas fa-clock"
                        onClick = { registWatchlist }
                    ></i>
                    <span>Watchlist</span>
                </div>
            </div>
            <div className = "rate">
                <span className = "rated" >Rated</span>

                <div className = "stars">
                    <i 
                        className ="fas fa-times remove-score"
                        onClick = { removeScore }    
                    ></i>
                    <i 
                        className="fas fa-star b5" 
                        onClick = { rateItem }
                        style = { score === 5 ? activeScore ? activeScore : null : null }
                    ></i>
                    <i 
                        className="fas fa-star b4" 
                        onClick = { rateItem }
                        style = { ( score === 5 || score === 4 ) ? 
                                    activeScore ? activeScore : null 
                                    : null 
                                }
                    ></i>
                    <i 
                        className="fas fa-star b3" 
                        onClick = { rateItem }
                        style = { ( score === 5 || score === 4 || score === 3 ) ? 
                                    activeScore ? activeScore : null 
                                    : null 
                                }
                    ></i>
                    <i 
                        className="fas fa-star b2" 
                        onClick = { rateItem }
                        style = { ( score === 5 || score === 4 || score === 3 || score === 2 ) ? 
                                    activeScore ? activeScore : null 
                                    : null 
                                }
                    ></i>
                    <i 
                        className="fas fa-star b1" 
                        onClick = { rateItem }
                        style = { ( score === 5 || score === 4 || score === 3 || score === 2 || score === 1 ) ? 
                                    activeScore ? activeScore : null 
                                    : null 
                                }
                    ></i>
                </div>

            </div>
            <div className = "review">
                <span 
                    className = "add-delete-review" 
                    data-toggle="modal" 
                    data-target="#modalRegister"
                >{ item && item.review ? 'Edit or delete review' : 'Add a review'  }</span>
            </div>
            <ModalRegister 
                registReview = { registReview }
            />
        </LogContainer>
    );
}
 
export default Log;