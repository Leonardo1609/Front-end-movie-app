import React, { useContext, Fragment } from 'react'
import SliderItems from '../SliderItems/SliderItems'
import ProfileContext from '../../context/Profile/profileContext';
import styles from './Profile.module.css';

const ProfileBody = ({ match }) => {
    const { option } = match.params;

    const profileContext = useContext( ProfileContext );
    const { user, registers } = profileContext;

    return ( 
        
        <div className="container">
            {
                !option ?
                <Fragment>
                    <div className= { styles['favs-ratings'] } >
                        <div className = "favs">
                            <SliderItems 
                            title = { 'Favorites' }
                            items = { user ? user.favorites ? user.favorites.filter( item => item.id ) : [] : [] }
                            score = { true }
                            />
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