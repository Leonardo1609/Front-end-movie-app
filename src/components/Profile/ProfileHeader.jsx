import React, { useContext } from 'react'
import ProfileContext from '../../context/Profile/profileContext';
import styled from '@emotion/styled';
import AuthContext from '../../context/Auth/authContext';
import { Link } from 'react-router-dom';

const ProfileHeader = () => {
    
    const ProfileContainer = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 0;
        flex-direction: column;

        @media( min-width: 768px ){
            flex-direction: row;
        }

        .avatar-username{
            display: flex;

            img{
                width: 110px;
                height: 110px;
                border-radius: 50%;
                border: 1px solid #89a;
            }

            .username-edit{
                padding: 10px 15px;

                h2{
                    margin:0;
                    margin-bottom: 20px;
                }

                a{
                    padding: 7px 10px 6px;  
                    text-transform: uppercase;
                    border-radius: 3px;
                    background: #456;
                    border: none;
                    outline: none;
                    color: #D8E0E8;
                    font-weight: bold;
                    font-size: .8rem;
                    text-decoration: none;
                    cursor: pointer;

                    &:hover{
                        color: white;
                    }
                }
            }
        }

        .registers{
            ul{
                display: flex;
                list-style: none;
                padding-left: 0;
                li{
                    display:flex;
                    flex-direction: column;
                    padding: 0 1rem;
                    border-left: 1px solid #24303c;
                    font-size: 2rem;
                    font-weight: 300;
                    strong{
                        margin-bottom: 10px;
                    }
                    span{
                        font-size: .7rem;
                    }
                }
            }
        }
    `;
    
    const authContext = useContext( AuthContext );
    const { userauth } = authContext;
    const profileContext = useContext( ProfileContext );
    const { userpublic, registerspublic } = profileContext;
    
    return ( 
        <ProfileContainer className = "container">
            <div className = "avatar-username">
                <img src= { userpublic ? 
                                userpublic.image 
                                ? require(`../../../../backend-movieapp/src/public/img/profiles/${ userpublic.image }`) 
                                : 'https://s.ltrbxd.com/static/img/avatar1000.71ae0671.png'
                            : 'https://s.ltrbxd.com/static/img/avatar1000.71ae0671.png' } 
                    alt="avatar"
                />
                <div className = "username-edit">
                    <h2 className = "username">{ userpublic ? userpublic.username : null }</h2>
                    {   userauth && userpublic 
                            ? userauth._id === userpublic._id 
                                ? 
                                    <Link to = "/settings">Edit Profile</Link>
                                : null 
                            : null
                    }
                </div>
            </div>
            <div className = "registers">
                <ul>
                    <li>
                        <strong>{ registerspublic ? registerspublic.length : null }</strong>
                        <span >Registers</span>
                    </li>
                    <li>
                        <strong >
                            { 
                                registerspublic ? 
                                registerspublic.filter( register => register.itemType === 'movie' ).length 
                                    : null 
                            }
                        </strong>
                        <span >Films</span>
                    </li>
                    <li>
                        <strong >
                            { 
                                registerspublic ? 
                                    registerspublic.filter( register => register.itemType === 'tv' ).length 
                                : null 
                            }
                        </strong>
                        <span >TV Shows</span>
                    </li>
                    <li>
                        <strong >
                            { 
                                registerspublic ? 
                                    // length of the registers this year
                                    registerspublic.filter( register => 
                                        register.registeredAt.slice(0,4) === new Date().getFullYear().toString() 
                                    ).length 
                                    : null 
                            }
                        </strong>
                        <span >This year</span>
                    </li>
                </ul>
            </div>
        </ProfileContainer>    
    );
}
 
export default ProfileHeader;