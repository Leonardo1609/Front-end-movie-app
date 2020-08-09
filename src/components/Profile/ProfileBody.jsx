import React, { useContext, Fragment } from 'react'
import SliderItems from '../SliderItems/SliderItems'
import ProfileContext from '../../context/Profile/profileContext';
import styles from './Profile.module.css';
import styled from '@emotion/styled';
import PaginationPublic from '../PaginationPublic';
import { Link } from 'react-router-dom';

const Percent = styled.div`
    display: none;
    width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap; 
    position: absolute;
    height: 26px;
    top: -35px;
    left: calc( -50% - 55px);
    text-align: center;
    font-size: .7rem;
    background-color: #456;
    border-radius: 4px;
    padding: 5px 10px;
    z-index: 1000;
    
    &::after{
        z-index: 2000;
        content:'';
        position: absolute;
        display: block;
        top: 24px;
        right: calc(50% - 10px);
        border-top:   8px solid #456;    
        border-right: 8px solid transparent;
        border-left:  8px solid transparent;
        border-bottom:8px solid transparent;
    }
`;

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
        margin-bottom: 3px;
        list-style: none;
        display:flex;
        align-items: flex-end;
        li{
            flex: 1;
            height: 100%;
            margin: 0 3px;
            position: relative;

            &:hover .percent{
                display: block;
            }

            a{
                display: block;
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
    const { userpublic, registerspublic, pagepublic } = profileContext;

    const porcentRatingSize = ( score ) => {
        if( registerspublic ){
            return 72 * ( ( registerspublic.filter( register => register.score === score ).length / registerspublic.length ) );
        } 
    }

    const porcentRating = ( score ) => {
        if( registerspublic ){
            let stars = [];

            for ( let i = 1; i <= score; i++ ){
                stars.push( <i key = { i } className="fa fa-star" aria-hidden="true"></i> )
            }
            return {
                long:  registerspublic.filter( register => register.score === score ).length + ' ',
                percent: ' (' + Math.round(( registerspublic.filter( register => register.score === score ).length / registerspublic.length ) * 100) + '%) ',
                stars
            };
        }
    }

    let totalpages;
    
    switch( option ){
        case 'activity': totalpages = Math.ceil(registerspublic.filter( regist => regist.watched ).length / 60); break;
        case 'watchlist': totalpages = Math.ceil(registerspublic.filter( regist => regist.watchlist ).length / 60); break;
        case 'films': totalpages = Math.ceil(registerspublic.filter( regist => regist.itemType === 'movie' ).length / 60); break;
        case 'tv-shows': totalpages = Math.ceil(registerspublic.filter( regist => regist.itemType === 'tv' ).length / 60); break;
        case 'likes': totalpages = Math.ceil(registerspublic.filter( regist => regist.liked ).length / 60); break;
        case 'reviews': totalpages = Math.ceil(registerspublic.filter( regist => regist.review ).length / 60); break;
        case 'stars-1': totalpages = Math.ceil(registerspublic.filter( regist => regist.score === 1 ).length / 60); break;
        case 'stars-2': totalpages = Math.ceil(registerspublic.filter( regist => regist.score === 2 ).length / 60); break;
        case 'stars-3': totalpages = Math.ceil(registerspublic.filter( regist => regist.score === 3 ).length / 60); break;
        case 'stars-4': totalpages = Math.ceil(registerspublic.filter( regist => regist.score === 4 ).length / 60); break;
        case 'stars-5': totalpages = Math.ceil(registerspublic.filter( regist => regist.score === 5 ).length / 60); break;
        default: totalpages = 0;
    }

    return ( 
        
        <div style = {{ minHeight: "50vh" }}>
            {
                !option ?
                <Fragment>
                    <div className= { styles['favs-ratings'] } >
                        <div className = { styles["favs"]} >
                            <SliderItems 
                                title = { 'Favorites' }
                                items = { userpublic ? userpublic.favorites ? userpublic.favorites.filter( item => item.id ) : [] : [] }
                            />
                        </div>
                        <div className = { styles["statistics"] }>
                            <h2>Ratings</h2>
                            <StatisticsRatings>
                                <span> <i className="fas fa-star b5"></i></span>
                                <ul>
                                    <li>
                                        <Percent className = "percent">
                                            { porcentRating( 1 ).long }
                                            { porcentRating( 1 ).stars }
                                            { porcentRating( 1 ).percent }
                                        </Percent>
                                        <Link 
                                            to={`/profile/${ userpublic ? userpublic.username : '' }/stars-1`} 
                                        >
                                            <i style ={{ height: `${ porcentRatingSize(1) ? porcentRatingSize(1): 2 }px`}} ></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Percent className = "percent">
                                            { porcentRating( 2 ).long }
                                            { porcentRating( 2 ).stars }
                                            { porcentRating( 2 ).percent }
                                        </Percent>
                                        <Link 
                                            to={`/profile/${ userpublic ? userpublic.username : '' }/stars-2`} 
                                        >
                                            <i style ={{ height: `${ porcentRatingSize(2) ? porcentRatingSize(2): 2 }px`}} ></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Percent className = "percent">
                                            { porcentRating( 3 ).long }
                                            { porcentRating( 3 ).stars }
                                            { porcentRating( 3 ).percent }
                                        </Percent>
                                        <Link 
                                            to={`/profile/${ userpublic ? userpublic.username : '' }/stars-3`} 
                                        >
                                            <i style ={{ height: `${ porcentRatingSize(3) ? porcentRatingSize(3): 2 }px`}} ></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Percent className = "percent">
                                            { porcentRating( 4 ).long }
                                            { porcentRating( 4 ).stars }
                                            { porcentRating( 4 ).percent }
                                        </Percent>
                                        <Link 
                                            to={`/profile/${ userpublic ? userpublic.username : '' }/stars-4`} 
                                        >
                                            <i style ={{ height: `${ porcentRatingSize(4) ? porcentRatingSize(4): 2 }px`}} ></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Percent className = "percent">
                                            { porcentRating( 5 ).long }
                                            { porcentRating( 5 ).stars }
                                            { porcentRating( 5 ).percent }
                                        </Percent>
                                        <Link 
                                            to={`/profile/${ userpublic ? userpublic.username : '' }/stars-5`} 
                                        >
                                            <i style ={{ height: `${ porcentRatingSize(5) ? porcentRatingSize(5): 2 }px`}} ></i>
                                        </Link>
                                    </li>
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
                        regist = { true }
                        items = { registerspublic.filter( regist => regist.watched ).slice( 0, 6 ) }
                        url = { userpublic ? `/profile/${ userpublic.username }/activity` : '' }
                        score = { true }
                    />
                    <SliderItems 
                        title = { 'Watchlist' }
                        items = { registerspublic.filter( regist => regist.watchlist ).slice( 0, 6 ) }
                        url = { userpublic ? `/profile/${ userpublic.username }/watchlist` : '' }
                        />
                </Fragment>
                : option === 'activity' ?
                <SliderItems 
                    title = { 'Activity' }
                    items = { registerspublic.filter( regist => regist.watched ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                    regist = { true }
                    score = { true }
                />
                : option === 'watchlist' ?
                    <SliderItems 
                        title = { 'Watchlist' }
                        items = { registerspublic.filter( register => register.watchlist ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                    />
                : option === 'films' ? 
                    <SliderItems 
                        title = { 'Films' }
                        items = { registerspublic.filter( register => register.itemType === 'movie' ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                    />
                : option === 'tv-shows' ?
                    <SliderItems 
                        title = { 'Tv Shows' }
                        items = { registerspublic.filter( register => register.itemType === 'tv' ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                    />
                : option === 'likes' ?
                    <SliderItems 
                        title = { 'Likes' }
                        items = { registerspublic.filter( register => register.liked ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                    />
                : option === 'reviews' ?
                    <SliderItems 
                        title = { 'Reviews' }
                        items = { registerspublic.filter( register => register.review ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                        regist = { true }
                        score = { true }
                    />
                : option === 'stars-1' ?
                    <SliderItems 
                        title = '1 Star'
                        items = { registerspublic.filter( register => register.score === 1 ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                        regist = { true }
                        score = { true }
                    />
                : option === 'stars-2' ?
                    <SliderItems
                        title = '2 Stars' 
                        items = { registerspublic.filter( register => register.score === 2 ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                        regist = { true }
                        score = { true }
                    />
                : option === 'stars-3' ?
                    <SliderItems 
                        title = '3 Stars' 
                        items = { registerspublic.filter( register => register.score === 3 ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                        regist = { true }
                        score = { true }
                    />
                : option === 'stars-4' ?
                    <SliderItems
                        title = '4 Stars'  
                        items = { registerspublic.filter( register => register.score === 4 ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                        regist = { true }
                        score = { true }
                    />
                : option === 'stars-5' ?
                    <SliderItems 
                        title = '5 Stars' 
                        items = { registerspublic.filter( register => register.score === 5 ).slice( 0 + ( (pagepublic - 1) * 60 ), 60 + ( (pagepublic - 1) * 60 )) }
                        regist = { true }
                        score = { true }
                    />
                : null
            }
            {
                option && totalpages ? <PaginationPublic totalpages = { totalpages }/> : null
            }
        </div>
    );
}
 
export default ProfileBody;