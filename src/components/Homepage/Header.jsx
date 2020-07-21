import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Login from '../Login/Login';
import { Linksform } from './StyledComponents';
import LoginContext from '../../context/Login/loginContext';
import ApiContext from '../../context/API/apiContext';
import AuthContext from '../../context/Auth/authContext';
import { FavoritesContext } from '../ModifyProfile/context/FavoritesContext';

const Header = () => {

    const loginContext = useContext( LoginContext );
    const { login, showLogin } = loginContext;

    const apiContext = useContext( ApiContext );
    const { changePage } = apiContext;

    const authContext = useContext( AuthContext );
    const { authenticated, user,
            getUser, getRegistersAuth, signOut } = authContext;

    const favoritesContext = useContext( FavoritesContext );
    const { cleanFavorites } = favoritesContext;

    const [ search, setSearch ] = useState({
        item: ''
    });
    
    const [ showSearch, setShowSearch ] = useState( false );

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
        setShowSearch( !showSearch );
        // Every where a search is done it will stars from page 1
        changePage( 1 );
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
            <nav className = "navbar container" style = {{ padding: "0 1rem" }}>
                <div className = "logo">
                    <Link 
                        to = "/" 
                        className = "logo" 
                        onClick = { cleanFavorites }
                    >MovieApp</Link>
                </div>

                <Linksform>
                    <ul> 
                        {/* Formulario dropdown de Login */}
                        <Login />
                        {!authenticated || !user    
                        ?   
                        <li>
                        {
                            !login ?
                            <i 
                                className="fas fa-user"
                                onClick = { () => showLogin( true, true ) }
                            ></i>
                            :
                            <i 
                                className="fas fa-times"
                                onClick = { () => showLogin( false, true ) }
                            ></i>
                        }
                            <button 
                                className = "signing"
                                onClick = { () => showLogin( true, true ) }
                            >Sign In</button>
                        </li>
                        :<li>
                            <ul className = "profile">
                                <li>
                                    <div className = 'avatar-profile'>
                                        <img 
                                            src={
                                            user.image 
                                            ?
                                                require(`../../../../backend-movieapp/src/public/img/profiles/${ user.image }`)
                                            :
                                                'https://s.ltrbxd.com/static/img/avatar1000.71ae0671.png'
                                            } alt={ user.username }/>
                                        <div
                                            className = "not-container"
                                        >{ user.username } <i 
                                            className ="fas fa-chevron-down"
                                            ></i>
                                        </div>
                                    </div>
                                    <ul className = 'drop-menu drop-menu-profile'>
                                        <li>
                                            <Link
                                                to = {`/profile/${ user.username }`}
                                                onClick = { cleanFavorites }
                                            >Profile</Link>
                                        </li>
                                        <li>
                                            <Link
                                                to = '/'
                                                onClick = { signOut }
                                            >Sign Out</Link>
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
                                className = "not-hover"
                                to = '/create-account'
                            >
                                <i className="fas fa-user-plus"></i>
                            </Link>
                            <Link
                                className = "create-account"
                                to = '/create-account'
                            >Create Account
                            </Link>
                        </li>
                        : null
                        }
                        <i className="fas fa-bars"></i>

                        <li>
                            <ul className = "movies">
                                <li>
                                    <div >Movies</div>
                                    <ul className = 'drop-menu drop-menu-movies'>
                                        <li>
                                            <Link
                                                to = "/top-movies"
                                                onClick = { cleanFavorites }
                                            >Top IMDB Ranked Movies</Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick = { () => {
                                                    changePage( 1 );
                                                    cleanFavorites();
                                                } } 
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
                                    <div>Series</div>
                                    <ul className = 'drop-menu drop-menu-series'>
                                        <li>
                                            <Link
                                                to = "/top-shows"
                                                onClick = { cleanFavorites }
                                            >Top IMDB Ranked TV Shows</Link>
                                        </li>
                                        <li>
                                            <Link
                                                onClick = {() => { 
                                                    changePage( 1 );
                                                    cleanFavorites();
                                                }} 
                                                to = "/tv-air" 
                                            >Airing</Link>
                                        </li> 
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    {/* BUSCADOR */}
                    
                        <i 
                            style = {{ cursor : "pointer" }}
                            className= { `fas ${!showSearch ? 'fa-search' : 'fa-times'}` }
                            onClick = { () => {
                                setShowSearch( !showSearch );
                                if ( login ){
                                    showLogin( false, true );
                                }
                            }} 
                        ></i>
                    {
                        showSearch ?
                        <form className = "search" method = "GET" onSubmit = { searching }>
                            <input 
                                autoFocus
                                value = { item }
                                type="text" 
                                name = "item" 
                                placeholder = 'search' 
                                onChange = { obtainInfo } 
                            />
                        </form>
                        : null
                    }

                </Linksform>
            </nav>
        </header>   
    );
}
 
export default Header;