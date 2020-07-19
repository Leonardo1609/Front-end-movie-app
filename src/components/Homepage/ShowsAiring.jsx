import React, { useEffect, useContext } from 'react'
import ApiContext from '../../context/API/apiContext';
import SliderItems from '../SliderItems/SliderItems';

const ShowsAiring = () => {

    const apiContext = useContext( ApiContext );
    const{ shows,
           getShowsInAiring, resetState, setLoading } = apiContext;

    useEffect( () => {
        setLoading( true );
        getShowsInAiring(1);
        
        return () => resetState();
        // eslint-disable-next-line
    },[] ) 
    
    return (
        <div className = "container" >
            <SliderItems 
                items = { shows.slice(0,6) }
                title = { "Tv Shows on Air" }
                url = { "/tv-air" }
            />
        </div>
    );
}
 
export default ShowsAiring;