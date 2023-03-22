
export default function BlogPost(props) {

    const { post } = props;

    return (
        <div className='blog-post'>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    )
}

