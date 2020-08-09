import React, { useContext, useEffect } from 'react'
import ProfileContext from '../../context/Profile/profileContext';
import ProfileHeader from './ProfileHeader';
import NavProfile from './NavProfile';
import ProfileBody from './ProfileBody';
import NotfoundContext from '../../context/NotFound/notfoundContext';
import NotFoundComponent from '../NotFound/NotFound';

const Profile = ({ match }) => {

    const profileContext = useContext( ProfileContext );
    const { getPublicUser, getRegisters } = profileContext;

    const notfoundContext = useContext( NotfoundContext );
    const { notfounditem, setNotFound } = notfoundContext;

    useEffect( () => {
        return () => setNotFound( false );
        // eslint-disable-next-line
    }, []);

    useEffect( () => {
        getPublicUser( match.params.username );
        getRegisters( match.params.username );
        // eslint-disable-next-line
    }, [ match ] );

    if ( notfounditem ) return <NotFoundComponent />;

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