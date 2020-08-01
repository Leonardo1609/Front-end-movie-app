import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/Auth/authContext';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { FormSettings, AcountSettingsTitle } from './StyledComponents';
import arrayMove from 'array-move';
import DragCard from './DragItem';
import { FavoritesContext } from './context/FavoritesContext';

const SortableItem = SortableElement(({ value, sortIndex }) => 
    <li style = {{ listStyle : 'none' }}>
        {/* Styled Component */}
        <DragCard item = { value } index = { sortIndex } />
    </li>
);

const SortableList = SortableContainer(({ items }) => {
    return (
      <ul className = "list-favorites" >
        {items.map( ( item, i ) => (
          <SortableItem key={ i } index = { i } value={ item } sortIndex={ i } />
        ))}
      </ul>
    );
  });

const ModifyProfile = ( ) => {

    const [ userupdated, setUserUpdated ] = useState({
        username: '',
        email: '',
        biography: '',
        favorites: []
    });
    
    
    const favoritesContext = useContext( FavoritesContext );
    const { favoritesItems, setFavoritesItems } = favoritesContext;
    
    const authContext = useContext( AuthContext );
    const { userauth, updateUser } = authContext;
    
    /*Inicializo mi state con un arreglo, para que no me de un error en el map del sortableList,
    sin embargo, también se inicializará con 4 objetos, ya que en el useEffect el state se
    modifica con los favoritesItems y este ya contiene 4 objetos, que pueden ser los favoritos del 
    usuario u objetos vacíos */
    const[ favs, setFavs ]  = useState([]);

    let favsTemp = [ ...favs ];  
    
    const onSortEnd = ({ oldIndex, newIndex } ,e ) => {
        e.preventDefault();
        favsTemp = arrayMove( favsTemp, oldIndex, newIndex );
        // Actualizo mi state con el nuevo orden de los items favoritos
        setFavs( favsTemp );
        // Actualizo mi favorites context con el nuevo orden de los items favoritos
        setFavoritesItems( favsTemp );
    };
      
    const { username, email, biography } = userupdated;
    
    const onChange = e => {
        setUserUpdated({
            ...userupdated,
            [ e.target.name ] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        // In here I append the avatar image and then send this to the backend
        const formData = new FormData();
        // If input file have files
        if ( e.target.children[0].children[7].files[0] ){
            // 'image' for the multer config
            formData.set( "image", e.target.children[0].children[7].files[0] );
            updateUser( userupdated, formData );
        } else{
            updateUser( userupdated );
        }
    };

    useEffect(() => {
        if( userauth  ){
            // Inicializo mi state de usuario con los datos del usuario que obtengo del authContext
            // y los favs del state 
            setUserUpdated({ 
                ...userauth, 
                "favorites": favs 
            });
            
            // Inicializo mi state de favs con los items favoritos del usuario
            setFavs( favoritesItems );
        }

    }, [ userauth, favs, favoritesItems ] );

    return (
        <div className = "container">
                <AcountSettingsTitle>Account Settings</AcountSettingsTitle>
                <FormSettings onSubmit = { onSubmit } method = "POST">
                    <div className = "inputs-form">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id = "username"
                            name = "username"
                            value = { username }
                            onChange = { onChange }
                        />
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            id = "email"
                            name = "email"
                            value = { email } 
                            onChange = { onChange }
                        />
                        <label htmlFor="biography">Bio</label>
                        <textarea 
                            name="biography" 
                            id="biography" 
                            value = { biography } 
                            onChange = { onChange }
                        ></textarea>
                        <label htmlFor = "avatar">Avatar</label>
                        <input 
                            type="file" 
                            name="avatar" 
                            id="avatar" 
                        />
                        {
                            userauth ? 
                                userauth.image
                                ? 
                                <img 
                                    alt = { userauth.username } 
                                    className = "avatar-image" 
                                    src= {require(`../../../../backend-movieapp/src/public/img/profiles/${ userauth.image }`)}/>
                                :
                                <p>No hay imagen actual</p> 
                            :null
                        }
                        
                    </div>
                    <aside className = "favorites">
                        <h4>Favorites</h4>
                        <SortableList    
                            distance={1} // para poder usar el evento onClick y hacer use del drag and drop
                            items={ favsTemp } 
                            onSortEnd={ onSortEnd } 
                            axis = "xy"
                        />
                    </aside>
                    <div className = "buttons">
                        <input type="submit" value="Save Changes"/>
                        <button>Change Password</button>
                    </div>
                </FormSettings>
        </div>
    );
}
 
export default ModifyProfile;