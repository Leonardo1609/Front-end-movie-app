import React, { useState, useContext, useEffect, createContext } from 'react';
import AuthContext from '../../../context/Auth/authContext';

export const FavoritesContext = createContext();

const FavoritesProvider = props => {
    const [ favoritesItems, setFavoritesItems ] = useState([ {},{},{},{} ]);
    const authContext = useContext( AuthContext );
    const { user } = authContext;

    const cleanFavorites = () => {
        if( user ){
            if( user.favorites.length > 0 ){
                setFavoritesItems( user.favorites );
            } else{
                setFavoritesItems([ {}, {}, {}, {} ]);
            }
        }
    }

    useEffect( ()=> {
        if( user ){
            if( user.favorites.length > 0 ){
                setFavoritesItems( user.favorites );
            }
        }
    }, [ user ]);


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
