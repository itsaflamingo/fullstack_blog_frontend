import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BlogPost from './BlogPost';
import CommentsList from './CommentsList';
import { CommentContext } from './Contexts';
import CreateComment from './CreateComment';

export default function FullBlogPost() {

    // Getting value passed via useNavigate from BlogPost component.
    const location = useLocation();
    const post = location.state;

    const {comments, setComments} = useContext(CommentContext);
    const [refreshComments, setRefreshComments] = useState(comments)

    useEffect(() => {
        setRefreshComments(comments);
    }, [comments]);

    return (
        <div className='blog-post-pg'>
            <BlogPost      post={post} />
            <CreateComment post={post} />
            <CommentsList  post={post} 
                           setRefreshComments={setRefreshComments} 
                           refreshComments={refreshComments}/>
        </div>
    )
}