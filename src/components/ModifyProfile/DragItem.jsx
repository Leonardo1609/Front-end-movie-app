import React, { useState, useContext, Fragment } from 'react';
import { FavoriteItem } from './StyledComponents';
import ApiContext from '../../context/API/apiContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

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
      width: 450,
      backgroundColor: "#2c3440",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const DragCard = () => {

    // Configuración del modal de material ui
    const [ modalStyle ]    = useState( getModalStyle );
    const [ open, setOpen ] = useState ( false );
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const apiContext = useContext( ApiContext );
    const { searchItem, clean, movies, shows } = apiContext;

    const onInput = e => {
        if( e.target.value ){
            searchItem( e.target.value , 1 )
        } else {
            clean();
        }
    }

    return(
        <Fragment>
            <FavoriteItem
                onClick ={ handleOpen }
            >
            </FavoriteItem>
            <Modal
                open = { open }
                onClose = { () => {
                    handleClose();
                }}
            >
                <div style = { modalStyle } className = { classes.paper }>
                    <form>
                        <label>Name of Film or Serie</label>
                        <input type = "text"
                            onInput = { onInput }
                        />
                    </form>
                </div>
            </Modal>
        </Fragment>
    )
}

export default DragCard;