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
            <h2 onClick={() => visitBlogPage()}>
                {post.title}         </h2>
            <p> {post.body}          </p>
            <p> {post.date_formatted}</p>

            {user.user.username && <button onClick={visitEdit}>Edit</button>}
            {user.user.username && <button onClick={deletePost}>Delete</button>}
        </div>
    )
}

