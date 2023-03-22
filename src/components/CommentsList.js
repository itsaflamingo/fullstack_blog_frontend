import useFetch from './useFetch';
import Comment from './Comment';
import uniqid from "uniqid";

export default function CommentsList({ post }) {

    const {data, loading} = useFetch({
        api: `https://fs-blog-backend.fly.dev/blog/post/${post._id}/comments`,
        method: 'GET'
    })

    return (
        <div className='comments-list' id={uniqid()}>
            {!loading && data.map(comment => {
                return (
                    <div className='comment'>
                        <Comment comment={comment} />
                    </div>
                )
            })}
        </div>
    )
}