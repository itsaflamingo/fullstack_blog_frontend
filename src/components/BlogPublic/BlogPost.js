import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts";

export default function BlogPost({ post }) {

    const nav = useNavigate();
    const user = useContext(UserContext);

    const token = process.env.REACT_APP_BEARER_TOKEN;

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
        <div className='clickable blog-post' onClick={() => nav(`/post/${post.id}`, { state: post })}>
            <h2 className='public-title'>
            {post.title}</h2>
            <p className="public-body" dangerouslySetInnerHTML={{__html: post.body}}></p>
            <p className="public-date">{post.date_formatted}</p>
            <div className="edit-btns">
                {user.user.username && <button className='edit-post' onClick={visitEdit}>Edit</button>}
                {user.user.username && <button className='delete-post' onClick={deletePost}>Delete</button>}
            </div>
        </div>
    )
}

