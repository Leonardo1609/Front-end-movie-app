import React, { useState, useContext, useEffect } from 'react'
import { ModalModifyCommentContainer } from './StyledComponents';
import AuthContext from '../../context/Auth/authContext';

const ModalModifyComment = () => {

    const [ newcomment, setNewComment ] = useState('');
    const authContext = useContext( AuthContext );
    const { commentselected, modifyComment } = authContext;
    
    const onChange = e => {
        setNewComment( e.target.value );
    }

    useEffect(() => {
        if( commentselected ) {
            setNewComment( commentselected.comment.text );
        }
    },[ commentselected ]);
    
    return ( 
        <div className="modal fade p-0" id="modalModifyComment" tabIndex="-1" style={{zIndex:"100000"}} role="dialog" aria-labelledby="modalModifyCommentLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <ModalModifyCommentContainer className="modal-content">
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <div className="head-modal">
                                    <span className="title-modal">Edit your comment</span>
                                    <button 
                                        type="button" 
                                        className="close" 
                                        data-dismiss="modal" 
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <textarea 
                                    className="w-100 textarea-comment" 
                                    name="comment" 
                                    value={ newcomment }
                                    onChange = { onChange }
                                ></textarea>
                                <div className="buttons">
                                    <button 
                                        data-dismiss="modal" 
                                        className="cancel"
                                    >Cancel</button>    
                                    <button 
                                        className="update"
                                        data-dismiss="modal"
                                        onClick = { () => modifyComment( commentselected.comment._id, newcomment ) }
                                    >Update</button>    
                                </div> 
                            </div>
                        </div>
                    </div>
                </ModalModifyCommentContainer>
            </div>
        </div>
    );
}
 
export default ModalModifyComment;