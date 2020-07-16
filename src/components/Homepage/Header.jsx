import React, { useContext, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import styles from './Header.module.css';
import { Link, useHistory } from 'react-router-dom';
import Login from '../Login/Login';

import LoginContext from '../../context/Login/loginContext';
import ApiContext from '../../context/API/apiContext';
import AuthContext from '../../context/Auth/authContext';


const Linksform = styled.div`
    display: flex;
    align-items: center;
    ul{
        list-style: none;
        position: relative;
        height: 72px;
        display: flex;
        align-items: center;
        padding-left: 0;
        li{
            a,button{
                cursor: pointer;
                text-decoration: none;
                color: inherit;
                margin-right: 20px;
                text-transform: uppercase;
                font-size: .81rem; 
                padding: 5px 10px;
                font-weight: bold;
                background: none;
                border: none;
                outline: none;
                cursor: pointer;

                &:hover{
                    color: white;
                }
            }
        }
    }
    
    .movies li,
    .series li {
        position: relative;
        cursor: pointer;

        .drop-menu{
            list-style: none;
            position: absolute; 
            top: 23px;
            left: 0px;
            width: 220px;
            display: none;
            flex-direction: column;
            justify-content: start;

            li{

                &:hover .drop-menu{
                    background-color:#2c3440;
                }

                a{
                    display: block;
                    background-color: #89a;
                    text-transform: unset;
                    padding: 10px;  
                    width: 91%;
                    text-align: start;
                    &:hover{
                        background-color:#2c3440;
                    }
                }

                button{
                    display: block;
                    background-color: #89a;
                    text-transform: unset;
                    padding: 10px;  
                    width: 100%;
                    text-align: start;
                    &:hover{
                        background-color:#2c3440;
                    }
                }
            }
        
        }
    }

    .movies li:hover .drop-menu-movies{
        display: block;    
    }
    .series li:hover .drop-menu-series{
        display: block;    
    }
    
    .movies > li:hover > a{
        background-color: #89a;
        border-radius: 4px 4px 0 0;
        color: white;
    }
    .series > li:hover > a{
        background-color: #89a;
        border-radius: 4px 4px 0 0;
        color: white;
    }

    .search{
        input[ type ="text" ]
        {
            width: 130px;
            height: 20px;
            border-radius: 10px;
            border: none;
            outline: none;
            padding: 5px 10px;
            font-size: .81rem;
        }
    }
`;
 

const Header = () => {

    const loginContext = useContext( LoginContext );
    const { showLogin } = loginContext;

    const apiContext = useContext( ApiContext );
    const { changePage } = apiContext;

    const authContext = useContext( AuthContext );
    const { authenticated, user,
            getUser, getRegistersAuth, signOut } = authContext;

    const [ search, setSearch ] = useState({
        item: ''
    });

    const history = useHistory();

    const { item } = search;

    const obtainInfo =  e => {        
        setSearch({
            ...search,
            [ e.target.name ] : e.target.value
        });
    }

    const searching = e => {
        e.preventDefault();
        if( item ){
            history.push(`/search/${ item }`);
        }
        setSearch({
            item: ''
        })
        changePage( 1 );
    }

    const closeSesion = () => {
        signOut();
        history.push('/');
    }

    useEffect( () => {
        if( localStorage.getItem('token') ){
            getUser();
            getRegistersAuth();
        }
        // eslint-disable-next-line
    }, []);

    return ( 
        <header>
            <nav className = "navbar container">
                <div className = "logo">
                    <Link 
                        to = "/" 
                        className = "logo" 
                    >MovieApp</Link>
                </div>
                <Linksform>
                    <ul>        
                        <Login />
                        {!authenticated || !user    
                        ?   
                        <li>
                            <button 
                                onClick = { () => showLogin( true, true ) }
                            >Sign In</button>
                        </li>
                        :<li>
                            <ul className = "series">
                                <li>
                                    <button
                                        className = { styles['link-header'] }
                                    >{ user.username }</button>
                                    <ul className = 'drop-menu drop-menu-series'>
                                        <li>
                                            <Link
                                                to = {`/profile/${ user.username }`}
                                            >Profile</Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick = { closeSesion }
                                            >Sign Out</button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        }
                        {!authenticated || !user    
                        ?  
                        <li>
                            <Link
                                to = '/create-account'
                            >Create Account
                            </Link>
                        </li>
                        : null
                        }
                        <li>
                            <ul className = "movies">
                                <li>
                                    <button 
                                        className = { styles['link-header'] }
                                    >Movies</button>
                                    <ul className = 'drop-menu drop-menu-movies'>
                                        <li>
                                            <Link
                                                to = "/top-movies"
                                            >Top IMDB Ranked Movies</Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick = { () => changePage( 1 ) } 
                                                to = "/premieres-films" 
                                            >Premieres</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <ul className = "series">
                                <li>
                                    <button
                                        className = { styles['link-header'] }
                                    >Series</button>
                                    <ul className = 'drop-menu drop-menu-series'>
                                        <li>
                                            <Link
                                                to = "/top-shows"
                                            >Top IMDB Ranked TV Shows</Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick = { () => changePage( 1 ) } 
                                                to = "/tv-air" 
                                            >Airing</Link>
                                        </li> 
                                    </ul>
                                </li>
                            </ul>
                        </li>

                    </ul>

                    {/* BUSCADOR */}
                    <form className = "search" method = "GET" onSubmit = { searching }>
                        <input 
                            value = { item }
                            type="text" 
                            name = "item" 
                            placeholder = 'search' 
                            onChange = { obtainInfo } 
                        />
                    </form>

                </Linksform>
            </nav>
        </header>   
    );
}
 
export default Header;