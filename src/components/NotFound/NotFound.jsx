import React from 'react';
import  { NotFoundContainer } from './StyledComponents';
import { Link } from 'react-router-dom';

const NotFoundComponent = () => {
    return (
        <NotFoundContainer>
            <section>
                <Link to="/">MOVIE APP</Link>
                <p>Sorry, we can’t find the page you’ve requested.</p>
            </section>
        </NotFoundContainer>
    );
}

export default NotFoundComponent;