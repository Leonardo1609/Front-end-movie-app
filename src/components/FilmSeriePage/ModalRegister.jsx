import React, { useState, useContext } from 'react'
import ApiContext from '../../context/API/apiContext';
import { useEffect } from 'react';
import { ModalContainer } from './StyledComponents';
import AuthContext from '../../context/Auth/authContext';

const ModalRegister = ({ registReview }) => {
    const [ review, setReview ] = useState('');

    const apiContext = useContext( ApiContext );
    const { itemselected } = apiContext;

    const authContext = useContext( AuthContext );
    const { registerselectedauth } = authContext;

    const selected = registerselectedauth || itemselected;
    console.log( selected );
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
        if( selected && selected.review ){
            setReview( selected.review );
        } else{
            setReview('');
        }
    }, [ selected ]);

    if( !selected ) return null;
    return (
    <div className="modal fade p-0" id="modalRegister" tabIndex="-1" style={{zIndex:"100000"}} role="dialog" aria-labelledby="modalRegisterLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <ModalContainer className="modal-content">
                <div className="modal-body">
                    <div className="row">
                        <div className="col-5 col-md-4 d-flex align-items-center">
                            <img 
                                className="img-fluid posther"
                                src={(selected.poster_path) ? 
                                    `${ path_image }${ selected.poster_path }`
                                    : null
                                }
                                alt={ selected.title || selected.name }
                                // eslint-disable-next-line
                            />
                        </div>
                        <div className="col-7 col-md-8">
                            <div>
                                <span className="d-inline-block mb-3">I WATCHED...</span>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <h6 className="font-weight-bold">{ selected ? selected.title || selected.name : null }</h6>
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
                                        selected && selected.review ?
                                        <button 
                                            type="button"
                                            className="button delete-button"
                                            data-dismiss="modal"  
                                            onClick = { () => registReview('') }
                                        >Delete</button>
                                        : null
                                    }
                                    <button 
                                        type="submit"
                                        className="button save-button ml-3"
                                    ><span>Save</span></button>
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