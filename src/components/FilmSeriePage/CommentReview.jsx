import React, { useState, useContext, useEffect } from 'react'
import { CommentForm } from './StyledComponents';
import AuthContext from '../../context/Auth/authContext';
import ProfileContext from '../../context/Profile/profileContext';
import Comment from './Comment';

const CommentReview = () => {
    const [ comment, setComment ] = useState('');
    const authContext = useContext( AuthContext );
    const { comments, postComment, getComments } = authContext;

    const profileContext = useContext( ProfileContext );
    const { registselected } = profileContext;
    
    const onChange = e => {
        setComment( e.target.value );
    }

    const onSubmit = e => {
        e.preventDefault();
        
        if( comment.trim() === '' ){
            return;
        }

        postComment( registselected._id, comment );

        setComment('');
    }

    useEffect( () => {
        if( registselected ){
            getComments( registselected._id );
        }
        // eslint-disable-next-line
    }, [ registselected ]);

    return ( 
        <CommentForm>
            <h2>{ comments.length === 0 ? 'Comment?' : comments.length + ' Comment(s)' }</h2>
            {
                comments ? 
                    comments.map( ( commentary, i ) => 
                        <Comment 
                            key = { commentary.comment ? commentary.comment._id : i + 1 }
                            commentary = { commentary }
                        />
                    )
                : null
            }
            <form onSubmit = { onSubmit }>
                <textarea
                    name = "comment"
                    value = { comment }
                    onChange = { onChange }
                ></textarea>
                <button type="submit">Post</button>
            </form>
        </CommentForm>
    );
}
 
export default CommentReview;