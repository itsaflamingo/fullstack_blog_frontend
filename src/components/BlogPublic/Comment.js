import { useContext } from "react";
import { CommentContext, UserContext } from "../Contexts";

export default function Comment({ comment, post }) {
    const user = useContext(UserContext);
    const token = process.env.REACT_APP_BEARER_TOKEN;
    const {comments, setComments} = useContext(CommentContext);

    const deleteComment = () => {
        fetch(`https://fs-blog-backend.fly.dev/blog-secure/post/${post.id}/${comment.id}/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })
            .then(() => setComments(comments.filter(comm => comm.id !== comment.id)))
            .catch(err => console.log(err))
    }

    return (
        <div className="comment-wrapper">
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
            <p>{comment.date_formatted}</p>
            {user.user.username && <button 
            className="delete-comment"
            onClick={deleteComment}>Delete</button>}
        </div>
    )
}