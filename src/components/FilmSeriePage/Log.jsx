import React, { useContext } from 'react';
import ProfileContext from '../../context/Profile/profileContext';
import ApiContext from '../../context/API/apiContext';
import AuthContext from '../../context/Auth/authContext';
import { LogContainer } from './StyledComponents';

const Log = ({ itemType, name }) => {
    

    const profileContext = useContext( ProfileContext );
    const { postRegister, modifyRegister, removeRegister } = profileContext;
    
    const apiContext = useContext( ApiContext );
    const { itemselected } = apiContext;

    const authContext = useContext( AuthContext );
    const { registers } = authContext;

    const registItemWatch = () => {

        const item = registers.find( regist => regist.id === itemselected.id && regist.name === name );

        if( item ){
            if ( item.watched && item.watchlist ){
                modifyRegister( item._id, {
                    ...item,
                    name,
                    itemType,
                    id: itemselected.id,
                    poster_path: itemselected.poster_path,
                    watched: false,
                    score: null,
                    liked: false
                })
            } else if( !item.watchlist ) {
                removeRegister( item._id );
            } else {
                modifyRegister( item._id, {
                    ...item,
                    name,
                    itemType,
                    id: itemselected.id,
                    poster_path: itemselected.poster_path,
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
            
        const item = registers.find( regist => regist.id === itemselected.id && regist.name === name );

        if( item ){
            if ( item.liked ){
                modifyRegister( item._id, {
                    ...item,
                    name,
                    itemType,
                    id: itemselected.id,
                    poster_path: itemselected.poster_path,
                    liked: false
                })
            } else {
                modifyRegister( item._id, {
                    ...item,
                    name,
                    itemType,
                    id: itemselected.id,
                    poster_path: itemselected.poster_path,
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
            
        const item = registers.find( regist => regist.id === itemselected.id && regist.name === name );

        if( item ){
            if ( item.watchlist && item.watched ){
                modifyRegister( item._id, {
                    ...item,
                    name,
                    itemType,
                    id: itemselected.id,
                    poster_path: itemselected.poster_path,
                    watchlist: false
                })
            } else if ( !item.watched && item.watchlist ) {
                removeRegister( item._id );
            } else {
                modifyRegister( item._id, {
                    ...item,
                    name,
                    itemType,
                    id: itemselected.id,
                    poster_path: itemselected.poster_path,
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
        const item = registers.find( regist => regist.id === itemselected.id && regist.name === name );

        if( item ){
            if ( item.score ){
                modifyRegister( item._id, {
                    ...item,
                    name,
                    itemType,
                    id: itemselected.id,
                    poster_path: itemselected.poster_path,
                    watched: true,
                    score: Number( e.target.classList[2].split('b')[1] )
                })
            } else {
                modifyRegister( item._id, {
                    ...item,
                    name,
                    itemType,
                    id: itemselected.id,
                    poster_path: itemselected.poster_path,
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
        const item = registers.find( regist => regist.id === itemselected.id && regist.name === name );
        if( item ){
            if ( item.score ){
                modifyRegister( item._id, {
                    ...item,
                    name,
                    itemType,
                    id: itemselected.id,
                    poster_path: itemselected.poster_path,
                    watched: true,
                    score: null
                })
            }
        }

    }

    let activeWatched;
    let activeLiked;
    let activeWatchlist;
    let activeScore;
    let score;

    if( registers && registers.find( regist => regist.id === itemselected.id && regist.name === name ) ) {
        const item = registers.find( regist => regist.id === itemselected.id && regist.name === name );

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
    }


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
                <span className = "add-delete-review">Add a review</span>
            </div>
        </LogContainer>
    );
}
 
export default Log;