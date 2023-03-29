import { useLocation } from 'react-router-dom';
import BlogPost from './BlogPost';
import CommentsList from './CommentsList';
import CreateComment from './CreateComment';

export default function FullBlogPost() {

    // Getting value passed via useNavigate from BlogPost component.
    const location = useLocation();
    const post = location.state;

    return (
        <div id='blog-post-pg'>
            <BlogPost      post={post} />
            <CreateComment post={post} />
            <CommentsList  post={post} />
        </div>
    )
}