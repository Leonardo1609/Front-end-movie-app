import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/Auth/authContext';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { FormSettings } from './StyledComponents';
import arrayMove from 'array-move';
import DragCard from './DragItem';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const SortableItem = SortableElement(({value}) => <li  style = {{ listStyle : 'none' }}>{value}</li>);

const SortableList = SortableContainer(({items}) => {
    return (
      <ul className = "list-favorites" >
        {items.map( ( item, i ) => (
          <SortableItem key={ i } index={ i } value={ item } />
        ))}
      </ul>
    );
  });

const ModifyProfile = () => {
    
    const history = useHistory();

    const[ state, setState ]  = useState({
        items: [<DragCard/>, <DragCard/>, <DragCard/>, <DragCard/>],
      });

    const onSortEnd = ({oldIndex, newIndex}) => {
        setState(({items}) => ({
          items: arrayMove(items, oldIndex, newIndex),
        }));
    };
      

    const authContext = useContext( AuthContext );
    const { user, updateUser } = authContext;

    const [ userupdated, setUserUpdated ] = useState({
        username: '',
        email: '',
        biography: ''
    });
    

    const { username, email, biography } = userupdated;
    
    const onChange = e => {
        setUserUpdated({
            ...userupdated,
            [ e.target.name ] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        if ( e.target.children[0].children[7].files[0] ){
            formData.append( "image", e.target.children[0].children[7].files[0] );
            updateUser( userupdated, formData );
        }
        updateUser( userupdated );

        history.push( `/profile/${ user.username }` );
    };

    useEffect(() => {
        if( user ){
            setUserUpdated( user )
        }
    }, [ user ] );

    return (
        <div className = "container">
            <h2 style = {{ marginTop: "3rem" }}>Account Settings</h2>
                <FormSettings onSubmit = { onSubmit }>
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
                            user ? 
                                user.image
                                ? 
                                <img alt = { user.username } className = "avatar-image" src= {require(`../../../../backend-movieapp/src/public/img/profiles/${ user.image }`)}/>
                                :
                                <p>No hay imagen actual</p> 
                            :null
                        }
                        <div className = "buttons">
                            <input type="submit" value="Save Changes"/>
                            <button>Change Password</button>
                        </div>
                    </div>
                    <aside className = "favorites">
                        <h4>Favorites</h4>
                        <SortableList    
                            distance={1} // para poder usar el evento onClick y hacer use del drag and drop
                            items={ state.items } 
                            onSortEnd={ onSortEnd } 
                            axis = "x"
                        />
                    </aside>
                </FormSettings>
        </div>
    );
}
 
export default ModifyProfile;