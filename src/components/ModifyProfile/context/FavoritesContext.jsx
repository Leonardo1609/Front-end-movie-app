import React, { useState, useContext, useEffect, createContext } from 'react';
import AuthContext from '../../../context/Auth/authContext';

export const FavoritesContext = createContext();

const FavoritesProvider = props => {
    const [ favoritesItems, setFavoritesItems ] = useState([ {},{},{},{} ]);
    const authContext = useContext( AuthContext );
    const { userauth } = authContext;

    const cleanFavorites = () => {
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
                cleanFavorites
            }}
        >
            { props.children }
        </FavoritesContext.Provider>
    );
}
 
export default FavoritesProvider;
