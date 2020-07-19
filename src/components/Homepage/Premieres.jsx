import React, { useEffect, useContext } from 'react'
import ApiContext from '../../context/API/apiContext';
import SliderItems from '../SliderItems/SliderItems';

const Premieres = () => {

    const apiContext = useContext( ApiContext );
    const{ movies, 
           getMovies, resetState, setLoading } = apiContext;


    useEffect( () => {
        setLoading( true );
        getMovies(1);

        return () => resetState();
        // eslint-disable-next-line
    },[] ) 
    
    return (
        <div className = "container" style = {{ marginTop: "60px" }}>
            <SliderItems 
                title = { 'Premieres' }
                items = { movies.slice(0,6) }
                url = { "/premieres-films" }
            />
        </div>
    );
}
 
export default Premieres;