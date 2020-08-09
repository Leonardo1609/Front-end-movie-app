import React, { useState, useContext, useEffect, createContext } from 'react';
import AuthContext from '../../../context/Auth/authContext';

export const FavoritesContext = createContext();

const FavoritesProvider = props => {
    const [ favoritesItems, setFavoritesItems ] = useState([ {},{},{},{} ]);
    const authContext = useContext( AuthContext );
    const { userauth } = authContext;

    // Clean the state only with the favorites saved in the db
    const refreshFavorites = () => {
        if( userauth ){
            if( userauth.favorites.length > 0 ){
                setFavoritesItems( userauth.favorites );
            } else{
                setFavoritesItems([ {}, {}, {}, {} ]);
            }
        }
    }

    useEffect( ()=> {
        if( userauth ){
            if( userauth.favorites.length > 0 ){
                setFavoritesItems( userauth.favorites );
            }
        }
    }, [ userauth ]);


    return ( 
        <FavoritesContext.Provider
            value ={{
                favoritesItems,
                setFavoritesItems,
                refreshFavorites
            }}
        >
            { props.children }
        </FavoritesContext.Provider>
    );
}
 
export default FavoritesProvider;
