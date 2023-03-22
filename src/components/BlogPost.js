import { useNavigate } from "react-router-dom";

export default function BlogPost(props) {

    const { post } = props;
    const nav = useNavigate();

    const visitBlogPage = () => {
        nav(`/post/${post.id}`, { state: post });
    }

    return (
        <div className='blog-post'
        onClick={() => visitBlogPage()}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>{post.date_formatted}</p>
        </div>
    )
}

