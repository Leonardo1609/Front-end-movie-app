import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Auth/authContext';
import { CommentContainer } from './StyledComponents';
import ProfileContext from '../../context/Profile/profileContext';
import ModalDeleteComment from './ModalDeleteComment';
import ModalModifyComment from './ModalModifyComment';

const Comment = ({ commentary }) => {
    const authContext = useContext( AuthContext );
    const { userauth, setCommentSelected } = authContext;

    const profileContext = useContext ( ProfileContext );
    const { registselected } = profileContext;

    return ( 
        <CommentContainer>
            <div className="user-flex">
                <Link
                    to = {`/profile/${ commentary.user.username }`}                   
                >
                    <img 
                        src={
                            commentary.user.image 
                        ?
                            require(`../../../../backend-movieapp/src/public/img/profiles/${ commentary.user.image }`)
                        :
                            'https://s.ltrbxd.com/static/img/avatar1000.71ae0671.png'
                        } alt={ commentary.user.username }
                    />                
                    <span>{ commentary.user.username }</span>
                </Link>
                    <div className="actions">
                            {
                                userauth._id === commentary.user._id
                                ? 
                                <i 
                                    className="fas fa-pencil-alt"
                                    data-toggle="modal" 
                                    data-target="#modalModifyComment"
                                    onClick = { () => setCommentSelected( commentary ) }
                                    ></i>
                                : null
                            }
                            {
                                userauth._id === commentary.user._id || userauth._id === registselected.user
                                ?
                                <i 
                                    className="fas fa-trash-alt" 
                                    data-toggle="modal" 
                                    data-target="#modalDeleteComment"
                                    onClick = { () => setCommentSelected( commentary ) }
                                ></i>
                                : null
                            }
                        </div>
            </div>
            <div className="comment-flex">
                <p>{ commentary.comment ? commentary.comment.text : '' }</p>
            </div>
            <ModalDeleteComment/>
            <ModalModifyComment/>
        </CommentContainer>
    );
}
 
export default Comment;