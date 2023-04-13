import useFetch from '../useFetch';
import Comment from './Comment';
import uniqid from "uniqid";
import { useContext, useEffect } from 'react';
import { CommentContext } from '../Contexts';

export default function CommentsList(props) {

    const { post, setRefreshComments, refreshComments} = props;
    // Fetch data and loading state from database 
    const {data, loading} = useFetch({
        api: `https://fs-blog-backend.fly.dev/blog/post/${post._id}/comments`,
        method: 'GET'
    })
    // Get comments context
    const {comments, setComments} = useContext(CommentContext);
    
    // Once fetch is not loading, set comments to fetch result
    useEffect(() => {
        if(loading === true) return;
        setComments(data);
    }, [loading])

    // Subscribe to change in comments context
    useEffect(() => {
        setRefreshComments(comments);
    }, [comments])

    // map over most recent comments state
    return (
        <div className='comments-list'>
            {refreshComments.length > 0 && 
             refreshComments.map(comment => {
                return (
                    <div className='comment' key={uniqid()}>
                        <Comment comment={comment} post={post} />
                    </div>
                )
            })}
        </div>
    )
}