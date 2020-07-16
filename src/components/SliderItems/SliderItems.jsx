import React, { useContext } from 'react'
import Card from '../CardItem/Card';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import ApiContext from '../../context/API/apiContext';
import { SectionHeading, Slider } from './StyledComponents';

const SliderItems = ({ items, title, url }) => {

    const apiContext = useContext( ApiContext );
    const{ loading } = apiContext;

    return (
        <div className = "container" >
            <SectionHeading>
                <span>
                    { title }
                </span>
                <Link to = { url }>View All</Link>
            </SectionHeading>
            <Slider>
                { 
                    loading ? <Loading /> :
                    (items.length > 0 )
                    ? 

                    items.map( item => (
                        <Card
                            key = { item.id }
                            item = { item }
                            score = { item.score ? item.score : null }
                        />
                    ))
                    : 
                    <p>No results</p>
                }
            </Slider>
        </div>
    );
}
 
export default SliderItems;