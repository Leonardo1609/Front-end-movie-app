import React, { useContext } from 'react'
import AuthContext from '../../context/Auth/authContext';
import ProfileContext from '../../context/Profile/profileContext';
import { ModalDeleteCommentContainer } from './StyledComponents';

const ModalDeleteComment = () => {

    const authContext = useContext( AuthContext );
    const { deleteComment, commentselected } = authContext;

    const profileContext = useContext ( ProfileContext );
    const { registselected } = profileContext;

    return ( 
        <div className="modal fade" id="modalDeleteComment" tabIndex="-1" style={{zIndex:"100000"}} role="dialog" aria-labelledby="modalDeleteCommentLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <ModalDeleteCommentContainer className="modal-content">
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <div className="head-modal">
                                    <span className="title-modal">Please Confirm</span>
                                    <button 
                                        type="button" 
                                        className="close" 
                                        data-dismiss="modal" 
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <p className="text-modal">Are you sure you want to delete this comment?</p>
                                <div className="buttons">
                                    <button 
                                        className="cancel"
                                        data-dismiss="modal" 
                                    >Cancel</button>    
                                    <button 
                                        className="delete"
                                        data-dismiss="modal" 
                                        onClick = { () => deleteComment( registselected._id, commentselected.comment._id ) }
                                >Delete</button>    
                                </div> 
                            </div>
                        </div>
                    </div>
                </ModalDeleteCommentContainer>
            </div>
        </div>
    );
}
 
export default ModalDeleteComment;