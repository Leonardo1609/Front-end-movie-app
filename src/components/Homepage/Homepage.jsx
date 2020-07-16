import React, { Fragment } from 'react'
import Premieres from './Premieres';
import ShowsAiring from './ShowsAiring';

const Homepage = () => {

    return (
        <Fragment>
            <Premieres />
            <ShowsAiring / >
        </Fragment>
    );
}
 
export default Homepage;