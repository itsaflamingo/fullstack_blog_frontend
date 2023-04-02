import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Contexts";

export default function BlogPost({ post }) {

    const nav = useNavigate();
    const user = useContext(UserContext);

    const visitBlogPage = () => nav(`/post/${post.id}`, { state: post });

    const visitEdit = () => nav(`/post/${post.id}/edit`, { state: post });
    
    return (
        <div className='blog-post'>
            <h2 onClick={() => visitBlogPage()}>
                {post.title}         </h2>
            <p> {post.body}          </p>
            <p> {post.date_formatted}</p>

            {user.user && <button onClick={() => visitEdit()}>Edit</button>}
        </div>
    )
}

