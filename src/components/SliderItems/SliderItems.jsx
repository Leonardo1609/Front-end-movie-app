import React, { useContext, Fragment } from 'react'
import Card from '../CardItem/Card';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import ApiContext from '../../context/API/apiContext';
import { SectionHeading, Slider } from './StyledComponents';

const SliderItems = ({ items, title, url, score, index, regist }) => {
    const apiContext = useContext( ApiContext );
    const{ loading } = apiContext;

    return (
        <Fragment>
            { title ?
                <SectionHeading>
                    <span>
                        { title }
                    </span>
                    {
                        url 
                        ? <Link to = { url }>View All</Link>
                        : null
                    }
                </SectionHeading> 
            : null
            }
            <Slider>
                { 
                    loading ? <Loading /> :
                    ( items.length > 0 )
                    ? 

                    items.map( ( item, i ) => (
                        <Card
                            key = { item.id }
                            item = { item }
                            score = { item.score && score ? item.score : null }
                            index = { index ? i + 1 : null }
                            regist = { regist }
                        />
                    ))
                    : 
                    <p>No results</p>
                }
            </Slider>
        </Fragment>
    );
}
 
export default SliderItems;