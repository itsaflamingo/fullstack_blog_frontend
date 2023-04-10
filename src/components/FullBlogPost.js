import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BlogPost from './BlogPost';
import CommentsList from './CommentsList';
import { CommentContext } from './Contexts';
import CreateComment from './CreateComment';
import ViewPostPageMenu from './ViewPostPageMenu';

export default function FullBlogPost() {

    // Getting value passed via useNavigate from BlogPost component.
    const location = useLocation();
    const post = location.state;

    const {comments, setComments} = useContext(CommentContext);
    const [refreshComments, setRefreshComments] = useState(comments);
    const [viewCreateComment, setViewCreateComment] = useState(false);

    useEffect(() => {
        setRefreshComments(comments);
    }, [comments]);

    return (
        <div className='blog-post-pg'>
            <div className='blog-post-and-menu'>
                <BlogPost      post={post} />
                <ViewPostPageMenu viewCommentForm={viewCreateComment} setViewCommentForm={setViewCreateComment} />
            </div>
            {viewCreateComment && <CreateComment 
            post={post}
            viewCommentForm={viewCreateComment}
            setViewCommentForm={setViewCreateComment} />}
            <CommentsList  post={post} 
                           setRefreshComments={setRefreshComments} 
                           refreshComments={refreshComments} />
        </div>
    )
}