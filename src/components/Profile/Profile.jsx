import React, { useContext, useEffect } from 'react'
import ProfileContext from '../../context/Profile/profileContext';
import ProfileHeader from './ProfileHeader';
import NavProfile from './NavProfile';
import ProfileBody from './ProfileBody';

const Profile = ({ match }) => {

    const profileContext = useContext( ProfileContext );
    const { getPublicUser, getRegisters } = profileContext;

    useEffect( () => {
        getPublicUser( match.params.username );
        getRegisters( match.params.username );
        // eslint-disable-next-line
    }, [ match ] );

    return ( 
        <div className = "container">
            <ProfileHeader />
            <NavProfile
                match = { match } 
            />
            <ProfileBody 
                match = { match } 
            />
        </div> 
    );
}
 
export default Profile;