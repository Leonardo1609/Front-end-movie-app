import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Login from '../Login/Login';
import LoginContext from '../../context/Login/loginContext';
import ApiContext from '../../context/API/apiContext';
import AuthContext from '../../context/Auth/authContext';
import { FavoritesContext } from '../ModifyProfile/context/FavoritesContext';

const Header = () => {

    const loginContext = useContext( LoginContext );
    const { showLogin } = loginContext;

    const apiContext = useContext( ApiContext );
    const { changePage } = apiContext;

    const authContext = useContext( AuthContext );
    const { authenticated, userauth,
            getUser, getRegistersAuth, signOut } = authContext;

    const favoritesContext = useContext( FavoritesContext );
    const { cleanFavorites } = favoritesContext;
    
    // const profileContext = useContext( ProfileContext );
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
        // Every where a search is done it will stars from page 1
        changePage( 1 );
    }

    const closeSesion = () => {
        // window.location.reload();
        signOut();
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
            <nav className = "navbar navbar-expand-lg navbar-dark container">
                <div className = "logo">
                    <Link 
                        to = "/" 
                        className = "navbar-brand" 
                        onClick = { cleanFavorites }
                    >MovieApp</Link>
                </div>
                <button onClick = { () => showLogin( false, false ) } className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto"> 
                        {/* Formulario dropdown de Login */}
                        <Login />
                        {!authenticated || !userauth   
                        ?   
                            <button 
                                style = {{ paddingTop: '10.5px' }}
                                className = "nav-link button-link text-left mt-0"
                                onClick = { () => showLogin( true, true ) }
                            >Sign In</button>
                        :
                        <li className="nav-item dropdown">
                            <button  className = 'nav-link dropdown-toggle button-link' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img 
                                    style = {{ width: "26px", height: "26px", borderRadius: '50%', marginRight: '10px' }}
                                    src={
                                    userauth.image 
                                    ?
                                        require(`../../../../backend-movieapp/src/public/img/profiles/${ userauth.image }`)
                                    :
                                        'https://s.ltrbxd.com/static/img/avatar1000.71ae0671.png'
                                    } alt={ userauth.username }/>
                                <span>{ userauth.username }</span> 
                            </button>
                            <div className = "dropdown-menu dark-link">
                                <Link
                                    className = "dropdown-item"
                                    to = {`/profile/${ userauth.username }`}
                                    onClick = { cleanFavorites }
                                    >Profile</Link>
                                <Link
                                    className = "dropdown-item"                                    
                                    to = '/'
                                    onClick = { closeSesion }
                                >Sign Out</Link>
                            </div>
                        </li>
                        }
                        {!authenticated || !userauth    
                        ?  
                        <li 
                            className = "nav-item"
                        >
                            <Link
                                style = {{ paddingTop: '10.5px' }}
                                className = "nav-link inline-block"
                                to = '/create-account'
                            >Create Account
                            </Link>
                        </li>
                        : null
                        }
                        <li className="nav-item dropdown" style = {{ paddingTop: '2.5px' }}>
                            <button className="nav-link dropdown-toggle button-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Movies
                            </button>
                            <div className="dropdown-menu dark-link">
                                <Link
                                    className = "dropdown-item"
                                    to = "/top-movies"
                                    onClick = { cleanFavorites }
                                >Top IMDB Ranked Movies</Link>
                                <Link
                                    className = "dropdown-item"
                                    onClick = { () => {
                                        changePage( 1 );
                                        cleanFavorites();
                                    } } 
                                    to = "/premieres-films" 
                                >Premieres</Link>
                            </div>
                        </li>

                        <li className="nav-item dropdown" style = {{ paddingTop: '2.5px' }}>
                            <button className="nav-link dropdown-toggle button-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Series
                            </button>
                            <div className="dropdown-menu dark-link">
                                    <Link
                                        className = "dropdown-item"
                                        to = "/top-shows"
                                        onClick = { cleanFavorites }
                                    >Top IMDB Ranked TV Shows</Link>
                                    <Link
                                        className = "dropdown-item"                                        
                                        onClick = {() => { 
                                            changePage( 1 );
                                            cleanFavorites();
                                        }} 
                                        to = "/tv-air" 
                                    >Airing</Link>
                            </div>
                        </li>
                    </ul>

                    <form className = "form-inline my-2 my-lg-0" method = "GET" onSubmit = { searching }>
                        <input 
                            className = "form-control mr-sm-2"
                            autoFocus
                            value = { item }
                            type="search" 
                            name = "item" 
                            placeholder = 'search' 
                            onChange = { obtainInfo } 
                        />
                    </form>
                </div>
            </nav>
        </header> 
    );
}
 
export default Header;