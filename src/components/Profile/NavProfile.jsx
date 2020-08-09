import React, { useContext } from 'react';
import styled from '@emotion/styled';
import ProfileContext from '../../context/Profile/profileContext';
import { Link } from 'react-router-dom';

const NavProfile = ({ match }) => {

    const { option } = match.params;

    const profileContext = useContext( ProfileContext );
    const { userpublic, changePagePublic } = profileContext;

    const NavbarProfile = styled.div`
        display: flex;
        justify-content: center;
        margin: 0 auto;
        border:2px solid #24303c;
        border-radius: 3px;
        margin-bottom: 1.5rem;
        &:hover{
            background: #2c3440;
        }
        
        ul{
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            list-style: none;
            li{
                border: 1px solid #24303c;
                font-size: .9rem;

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

    const  changePage = (e) => {
        if ( e.target.tagName === 'A' ){
            changePagePublic( 1 );
        }
    }
    return (
        <NavbarProfile>
            <ul onClick = { changePage }>
                <li>
                    <Link 
                        to = { userpublic ? `/profile/${ userpublic.username }` : '/' } 
                        style = { !option ? activeStyle : null }
                    >Profile</Link>
                </li>
                <li>
                    <Link 
                        to = { userpublic ? `/profile/${ userpublic.username }/activity` : '/' } 
                        style = { option === 'activity' ? activeStyle : null }
                    >Activity</Link>
                </li>
                <li>
                    <Link 
                        to = { userpublic ? `/profile/${ userpublic.username }/films` : '/' } 
                        style = { option === 'films' ? activeStyle : null }
                    >Films</Link>
                </li>
                <li>
                    <Link 
                        to = { userpublic ? `/profile/${ userpublic.username }/tv-shows` : '/' } 
                        style = { option === 'tv-shows' ? activeStyle : null }
                    >Series</Link>
                </li>
                <li>
                    <Link 
                        to = { userpublic ? `/profile/${ userpublic.username }/reviews` : '/' } 
                        style = { option === 'reviews' ? activeStyle : null }
                    >Reviews</Link>
                </li>
                <li>
                    <Link 
                        to = { userpublic ? `/profile/${ userpublic.username }/watchlist` : '/' } 
                        style = { option === 'watchlist' ? activeStyle : null }
                    >Watchlist</Link>
                </li>
                <li>
                    <Link 
                        to = { userpublic ? `/profile/${ userpublic.username }/likes` : '/' } 
                        style = { option === 'likes' ? activeStyle : null }
                    >Likes</Link>
                </li>
            </ul>
        </NavbarProfile>
    );
}
 
export default NavProfile;