import React from 'react';
import Homepage from './components/Homepage/Homepage';
import ApiState from './context/API/apiState';
import PublicState from './context/Profile/profileState';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PremieresFilmsPage from './components/PremieresFilms/PremieresFilmsPage';
import Header from './components/Homepage/Header';
import AiringShows from './components/AiringShows/AiringShows';
import TopMovies from './components/TopRanked/TopMovies';
import TopShows from './components/TopRanked/TopShows';
import FilmPage from './components/FilmSeriePage/FilmPage';
import LoginState from './context/Login/loginState';
import ShowPage from './components/FilmSeriePage/ShowPage';
import Footer from './components/Homepage/Footer';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Search from './components/Search/Search';
import AuthState from './context/Auth/authState';
import tokenAuth from './config/token';
import Profile from './components/Profile/Profile';
import ModifyProfile from './components/ModifyProfile/ModifyProfile';
import FavoritesProvider from './components/ModifyProfile/context/FavoritesContext';

function App() {

  const token = localStorage.getItem('token');

  if ( token ){
    tokenAuth( token );
  }

  return (
    <AuthState>
      <PublicState>
        <ApiState>
          <LoginState>
            <FavoritesProvider>
              <Router>
                <Header/>
                <Switch>
                  <Route exact path = '/' component = { Homepage }/> 
                  <Route exact path = '/settings' component = { ModifyProfile }/> 
                  <Route exact path = '/profile/:username' component = { Profile }/>  
                  <Route exact path = '/profile/:username/:option' component = { Profile }/>  
                  <Route exact path = '/create-account' component = { CreateAccount } /> 
                  <Route exact path = '/premieres-films' component = { PremieresFilmsPage }/>  
                  <Route exact path = '/tv-air' component = { AiringShows }/>  
                  <Route exact path = '/top-movies' component = { TopMovies }/>  
                  <Route exact path = '/top-movies/:category/:id' component = { TopMovies }/>  
                  <Route exact path = '/top-shows'  component = { TopShows }/>  
                  <Route exact path = '/top-shows/:category/:id' component = { TopShows }/>  
                  <Route exact path = '/film/:name/:id' component = { FilmPage }/>  
                  <Route exact path = '/film/:name/:id/:option' component = { FilmPage }/>  
                  <Route exact path = '/show/:name/:id' component = { ShowPage }/>  
                  <Route exact path = '/show/:name/:id/:option' component = { ShowPage }/>  
                  <Route exact path = '/search/:name' component = { Search }/>  
                </Switch> 
              </Router>
            </FavoritesProvider>
            <Footer />
          </LoginState>
        </ApiState>
      </PublicState>
    </AuthState>
  );
}

export default App;
