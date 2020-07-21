import React, { useContext, Fragment } from 'react'
import SliderItems from '../SliderItems/SliderItems'
import ProfileContext from '../../context/Profile/profileContext';
import styles from './Profile.module.css';
import styled from '@emotion/styled';

const StatisticsRatings = styled.div`
    height: 72px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 2rem;
    
    span{
        margin: 0 5px;
        font-size: .8rem;
        color: rgb(0, 224, 84);
    }

    ul{
        width: 140px;
        height: 100%;
        padding:0;
        margin:0;
        margin-bottom: 1px;
        list-style: none;
        display:flex;
        align-items: flex-end;
        li{
            flex: 1;
            height: 100%;
            margin: 0 3px;

            a{
                display:block;
                height: 100%; 
                display: flex;
                flex-direction: column;  
                justify-content: flex-end;

                i{
                    display:inline-block;
                    background: #445566;
                }
            }
        }
    }
`;



const ProfileBody = ({ match }) => {
    const { option } = match.params;

    const profileContext = useContext( ProfileContext );
    const { user, registers } = profileContext;

    const porcentRating = ( score ) => {
        if( registers ){
            return 72 * ( ( registers.filter( register => register.score === score ).length / registers.length ) );
        } 
    }

    console.log( porcentRating( 5 ));
    return ( 
        
        <div>
            {
                !option ?
                <Fragment>
                    <div className= { styles['favs-ratings'] } >
                        <div className = { styles["favs"]} >
                            <SliderItems 
                                title = { 'Favorites' }
                                items = { user ? user.favorites ? user.favorites.filter( item => item.id ) : [] : [] }
                            />
                        </div>
                        <div className = { styles["statistics"] }>
                            <h2>Ratings</h2>
                            <StatisticsRatings>
                                <span> <i className="fas fa-star b5"></i></span>
                                <ul>
                                    {/* eslint-disable-next-line */}
                                    <li><a href="#" ><i style ={{ height: `${ porcentRating(1) ? porcentRating(1): 2 }px`}} ></i></a></li>
                                    {/* eslint-disable-next-line */}
                                    <li><a href="#" ><i style ={{ height: `${ porcentRating(2) ? porcentRating(2): 2 }px`}} ></i></a></li>
                                    {/* eslint-disable-next-line */}
                                    <li><a href="#" ><i style ={{ height: `${ porcentRating(3) ? porcentRating(3): 2 }px`}} ></i></a></li>
                                    {/* eslint-disable-next-line */}
                                    <li><a href="#" ><i style ={{ height: `${ porcentRating(4) ? porcentRating(4): 2 }px`}} ></i></a></li>
                                    {/* eslint-disable-next-line */}
                                    <li><a href="#" ><i style ={{ height: `${ porcentRating(5) ? porcentRating(5): 2 }px`}} ></i></a></li>
                                    {/* eslint-disable-next-line */}
                                </ul>
                                <span>
                                    <i className="fas fa-star b5"></i>
                                    <i className="fas fa-star b5"></i>
                                    <i className="fas fa-star b5"></i>
                                    <i className="fas fa-star b5"></i>
                                    <i className="fas fa-star b5"></i>
                                </span>
                            </StatisticsRatings>
                        </div>
                    </div>

                    <SliderItems 
                        title = { 'Recent Activity' }
                        items = { registers.filter( regist => regist.watched ).slice( 0, 6 ) }
                        url = { user ? `/profile/${ user.username }/activity` : '' }
                        score = { true }
                    />
                    <SliderItems 
                        title = { 'Watchlist' }
                        items = { registers.filter( regist => regist.watchlist ).slice( 0, 6 ) }
                        url = { user ? `/profile/${ user.username }/watchlist` : '' }
                    />
                </Fragment>
                : option === 'activity' ?
                <SliderItems 
                    title = { 'Recent Activity' }
                    items = { registers.filter( regist => regist.watched ) }
                    url = "#"
                />
                : option === 'watchlist' ?
                    <SliderItems 
                    title = { 'Watchlist' }
                    items = { registers.filter( register => register.watchlist ) }
                    url = "#"
                    />
                : option === 'films' ? 
                    <SliderItems 
                        title = { 'Films' }
                        items = { registers.filter( register => register.type === 'movie' ) }
                        url = "#"
                    />
                : option === 'tv-shows' ?
                    <SliderItems 
                        title = { 'Tv Shows' }
                        items = { registers.filter( register => register.type === 'tv' ) }
                        url = "#"
                    />
                : option === 'likes' ?
                    <SliderItems 
                        title = { 'Likes' }
                        items = { registers.filter( register => register.liked ) }
                        url = "#"
                    />
                : null
            }
        </div>
    );
}
 
export default ProfileBody;