import React, { useState, useContext, Fragment, useRef } from 'react';
import { FavoriteItem, ModalContainer } from './StyledComponents';
import ApiContext from '../../context/API/apiContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { FavoritesContext } from './context/FavoritesContext';
import { useEffect } from 'react';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 350,
      backgroundColor: "#2c3440",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const DragCard = ({ item, index }) => {
    // Configuración del modal de material ui
    const [ modalStyle ]    = useState( getModalStyle );
    const [ open, setOpen ] = useState ( false );
    const classes = useStyles();

    const itemref = useRef();

    const path_image = 'http://image.tmdb.org/t/p/w500';

    const handleOpen = (e) => {
        if( e.target.nodeName !== "BUTTON" ){
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const apiContext = useContext( ApiContext );
    const { searchItem, clean, movies, shows } = apiContext;

    const favoritesContext = useContext( FavoritesContext );
    const { favoritesItems, setFavoritesItems } = favoritesContext;
    
    let favoritesItemsTemp = [ ...favoritesItems ];

    const putFavorite = ( item ) => {
        // changing the item in favoriteContext index position for a movie or serie selected
        favoritesItemsTemp[ index ] = {
            ...item,
            "name": item.name || item.title
        };

        setFavoritesItems( favoritesItemsTemp );
        
        // clean the context of reducer and close the modal
        clean();
        handleClose();
    }

    const cleanItem = () => {
        item = {};
        favoritesItemsTemp[ index ] = item;
        setFavoritesItems( favoritesItemsTemp );
    }
    const onInput = e => {
        // si  hay texto en el input va a buscar
        if( e.target.value ){
            searchItem( e.target.value , 1 )
        } else {
            clean();
        }
    }

    useEffect( () => {
        // Uso esta condición, ya que cuando hacía drag and drop el backgroundImage se mantenía
        if( item.poster_path ){
            itemref.current.style.backgroundImage = `url(${ path_image }/${ item.poster_path })`;
            itemref.current.style.backgroundSize = "100% 100%";
        }else {
            itemref.current.style.backgroundImage = "none"
        }
    }, [ item ]);

    return(
        <Fragment>
            <FavoriteItem
                onClick ={ handleOpen }
                ref = { itemref }
            >
                <button type = "button" onClick = { cleanItem }>x</button>
            </FavoriteItem>
            <Modal
                open = { open }
                onClose = { () => {
                    handleClose();
                }}
            >
                <ModalContainer style = { modalStyle } className = { classes.paper }>
                    <h4>Pick a favorite Film or Serie</h4>  
                    <div>
                        <label>Name of Film or Serie</label>
                        <input type = "text"
                            onInput = { onInput }
                        />
                        <ul>
                            {
                                movies ?
                                movies.map( movie => (
                                    <li 
                                        onClick = { () => putFavorite({ ...movie, "itemType": "movie" }) }
                                        key = { movie.id }
                                    >{ movie.title } ({ movie.release_date ? movie.release_date.slice(0,4) : null }) <span className = "item-category">Film</span>
                                    </li>
                                ))
                                :null
                            }{
                                shows ? 
                                shows.map( show => (
                                <li 
                                    onClick = { () => putFavorite({ ...show, "itemType": "show" }) }
                                    key = { show.id }
                                >
                                    { show.name } ({ show.first_air_date ? show.first_air_date.slice(0,4) : null }) <span className = "item-category">Tv Show</span>
                                </li>
                                ))
                                :null
                            }
                        </ul>
                    </div>
                </ModalContainer>
            </Modal>
        </Fragment>
    )
}

export default DragCard;