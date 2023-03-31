import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Contexts";

export default function BlogPost(props) {

    const { post } = props;
    const nav = useNavigate();
    const user = useContext(UserContext);

    const visitBlogPage = () => nav(`/post/${post.id}`, { state: post });
    
    return (
        <div className='blog-post'>
            <h2 onClick={() => visitBlogPage()}>
                {post.title}         </h2>
            <p> {post.body}          </p>
            <p> {post.date_formatted}</p>

            {user.user && <button>Edit</button>}
        </div>
    )
}

