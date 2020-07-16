import React, { useContext } from 'react';
import styled from '@emotion/styled';
import ProfileContext from '../../context/Profile/profileContext';
import { Link } from 'react-router-dom';

const NavProfile = ({ match }) => {

    const { option } = match.params;

    const profileContext = useContext( ProfileContext );
    const { user } = profileContext;

    const NavbarProfile = styled.div`
        display: flex;
        justify-content: center;
        margin: 0 auto;
        border:2px solid #24303c;
        border-radius: 3px;
        margin-bottom: 3rem;
        
        &:hover{
            background: #2c3440;
        }

        ul{
            margin: 0;
            display: flex;
            list-style: none;
            li{
                border-right: 2px solid #24303c;
                font-size: .9rem;

                &:last-child{
                    border-right: unset;
                }

                a{
                    display: inline-block;
                    padding: 12px 15px;
                    cursor: pointer;
                    text-decoration: none;
                    color: inherit;

                    &:hover{
                        color: #46c3db;
                    }
                }
            }
        }
    `;

    const activeStyle = {
        backgroundColor: "#667788"
    }


    return (
        <NavbarProfile>
            <ul>
                <li><Link to = { user ? `/profile/${ user.username }` : '/' } style = { !option ? activeStyle : null }>Profile</Link></li>
                <li><Link to = { user ? `/profile/${ user.username }/activity` : '/' } style = { option === 'activity' ? activeStyle : null }>Activity</Link></li>
                <li><Link to = { user ? `/profile/${ user.username }/films` : '/' } style = { option === 'films' ? activeStyle : null }>Films</Link></li>
                <li><Link to = { user ? `/profile/${ user.username }/tv-shows` : '/' } style = { option === 'tv-shows' ? activeStyle : null }>Series</Link></li>
                <li><Link to = { user ? `/profile/${ user.username }/reviews` : '/' } style = { option === 'reviews' ? activeStyle : null }>Reviews</Link></li>
                <li><Link to = { user ? `/profile/${ user.username }/watchlist` : '/' } style = { option === 'watchlist' ? activeStyle : null }>Watchlist</Link></li>
                <li><Link to = { user ? `/profile/${ user.username }/lists` : '/' } style = { option === 'lists' ? activeStyle : null }>Lists</Link></li>
                <li><Link to = { user ? `/profile/${ user.username }/likes` : '/' } style = { option === 'likes' ? activeStyle : null }>Likes</Link></li>
            </ul>
        </NavbarProfile>
    );
}
 
export default NavProfile;