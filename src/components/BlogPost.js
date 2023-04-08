import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Contexts";

export default function BlogPost({ post }) {

    const nav = useNavigate();
    const user = useContext(UserContext);

    const token = process.env.REACT_APP_BEARER_TOKEN;

    const visitBlogPage = () => nav(`/post/${post.id}`, { state: post });
    const visitEdit = () => nav(`/blog-secure/post/${post.id}/edit`, { state: post });
    const deletePost = () => {
        fetch(`https://fs-blog-backend.fly.dev/blog-secure/post/${post.id}/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })
            .catch(err => console.log(err));
    }
    
    return (
        <div className='blog-post'>
            <h2 className='clickable public-title' 
            onClick={() => visitBlogPage()}>
            {post.title}</h2>
            <p className="public-body">{post.body}</p>
            <p className="public-date">{post.date_formatted}</p>
            <div className="edit-btns">
                {user.user.username && <button className='edit-post' onClick={visitEdit}>Edit</button>}
                {user.user.username && <button className='delete-post' onClick={deletePost}>Delete</button>}
            </div>
        </div>
    )
}

