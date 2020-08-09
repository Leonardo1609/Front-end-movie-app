import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/Auth/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {

    const authContext = useContext( AuthContext );
    const { authenticated } = authContext;
    return (
        <Route { ...props } render = { props => !authenticated ? (
            <Redirect to = "/" />
        ) : (
            <Component { ...props } />
        )} />
    );
}

export default PrivateRoute;