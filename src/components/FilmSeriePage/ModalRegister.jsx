import React, { useState, useContext } from 'react'
import ApiContext from '../../context/API/apiContext';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const ModalContainer = styled.div`
    width: 800px;
    margin: calc(50% - 100px) calc(-50% + 100px);

    textarea{
        min-height: 200px;
        max-height: 280px;
        background: #CCDDEE;
    }

    .button{
        padding: .4rem 1rem;
        border-radius: 4px;
        font-size: .8rem;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
        outline: none;
        border: none;
        color: white;
    }

    .save-button{
        background-color: #00b020;
    }
    
    .delete-button{
        background-color: #89a;
    }
`;

const ModalRegister = ({ registReview, item }) => {
    
    const [ review, setReview ] = useState('');

    const apiContext = useContext( ApiContext );
    const { itemselected } = apiContext;

    const path_image = 'http://image.tmdb.org/t/p/w500';

    const onChange = e => {
        setReview( e.target.value );
    }

    const onSubmit = e => {
        e.preventDefault();
        if( review.length > 0 ){
            registReview( review );
        }
    }

    useEffect( () => {

        if( item && item.review !== null ){
            setReview( item.review );
        }
        
    }, [ item ]);
    return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" style={{zIndex:"100000"}} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <ModalContainer className="modal-content"  style={{backgroundColor:"#456"}}>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-4">
                            <img 
                                className="img-fluid"
                                src={(itemselected.poster_path) ? 
                                        `${ path_image }${ itemselected.poster_path }`
                                        : null} 
                            />
                        </div>
                        <div className="col-8">
                            <p className="mb-3">I WATCHED...</p>
                            <h6 className="font-weight-bold">{ itemselected ? itemselected.title || itemselected.name : null }</h6>
                            <form action="" onSubmit={ onSubmit }>
                                <textarea 
                                    onChange={ onChange }
                                    value={ review }
                                    name="review" 
                                    className="form-control"
                                    placeholder="Add a review..."
                                ></textarea>
                                <div className="d-flex justify-content-end mt-3">
                                    {
                                        item && item.review ?
                                        <button type="button" className="button delete-button" onClick = { () => registReview('') }>Delete</button>
                                        : null
                                    }
                                    <button type="submit" className="button save-button ml-3">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ModalContainer>
        </div>
    </div>
    );
}
 
export default ModalRegister;